import axios from 'axios';
// import type from 'type';
import runtime from 'runtime';
// import encrypt from 'dvd-service-js-encrypt';
import urlParse from 'url-parse';
import console from 'console1';

// // 对象转cookie格式字符串
// let objectToCookieStr = (cookies) => {
//   let result = '';
//
//   if (cookies) {
//     let count = 0;
//
//     // 拼接字符串
//     for (let i in cookies) {
//       result += `${i}=${cookies[i]}; `;
//       count++;
//     }
//
//     // 去掉末尾多余分隔符
//     if (count > 0) {
//       result = result.substr(0, result.length - 2);
//     }
//   }
//   return result;
// };

// 从response headers里取指定的cookie
let getCookieFromResponse = (cookies, name) => {
    if (cookies) {
      for (let i = 0; i < cookies.length; i++) {
        let result = new RegExp(`${name}=([^;]*)`, 'u').exec(cookies[i]);
        if (result) {
          return result[1];
        }
      }
    }
    return null;
  },

  /**
   * 对象 -> 表单字符串
   * @param obj
   * @return {string}
   */
  serialize = obj => {
    let str = '';
    for (let i in obj) {
      str = `${str}&${i}=${encodeURIComponent(obj[i])}`;
    }
    if (str.length) {
      str = str.substr('1');
    }
    // console.log(str);
    return str;
  };

/**
 * @module dvd-service-js-ajax
 * @author sunweiguang [源码地址](http://gitlab.rd.vyohui.com/FE-Service/dvd-service-js-ajax.git)
 * 兼容server端和client端的发送请求模块
 * @param options {Object} 给axios的参数，包含请求地址和发送数据等（api参照axios）
 * @param server {Object} 只有server端才用到的信息，包含req、res等
 * @param debug {Object} 只有server端才用到的信息，包含req、res等
 * @returns {String}
 */
export default {
  async send (options = {}, {req, res, debug = false} = {}) {
    // 保留
    let oldOptions = options;

    // 默认参数
    options = Object.assign({}, {
      dataType: 'json',
    }, options);

    // 如果是服务端，获取用户请求中的dvdsid来设置sess_key
    if (runtime.isServer()) {
      options.data = options.data || {};
      // if (req.cookies && req.cookies.dvdsid) {
      //   options.data.sess_key = req.cookies.dvdsid;
      // }
    }

    // 数据加密（如果options.data是字符串类型则不进行加密，兼容原有的client端代码）
    // options.data = type.isString(options.data) ? options.data : encrypt.ajax(options.data, {req, res});

    // 选项参数以axios为准，但也兼容以前jquery的参数
    options = {
      url: options.url,
      method: options.method && options.method.toLowerCase() || options.type && options.type.toLowerCase(),
      responseType: options.responseType || options.dataType,
      params: options.params,
      data: serialize(options.data),
      // 如果有req参数则表示是服务端，发送请求时带上用户的headers（模拟用户的身份发送请求）
      // headers: Object.assign({}, req && req.headers || {}, options.headers || {}),
      headers: {},

      // 接口代理
      proxy: {
        host: 'localhost',
        port: 8888,
      },
    };

    // 如果是服务端
    if (runtime.isServer()) {
      // 发送请求时带上用户的headers（模拟用户的身份发送请求）
      for (let key of [
        'Cookie',
        'User-Agent',
      ]) {
        let value = req.headers[key.toLowerCase()];
        if (value) {
          options.headers[key] = value;
        }
      }

      // 使用用户终端当前域名请求接口
      let url = urlParse(options.url);

      // 协议后面的//
      url.slashes = true;

      /* // 如果在服务器上
       if (runtime.isLinux()) {
       // if (runtime.isServer()) {

       // 内网服务只提供http协议，外网必须用http，否则会405
       url.protocol = 'http';

       // 内网域名转换，mouth
       if (url.pathname.indexOf('/api/mg') !== -1) {
       // url.host = req.hostname.replace(/.*\.((:?bravetime\.net)|(:?vyohui\.cn)|(:?davdian\.com))/, 'smouth1.srv.$1');

       // 内网域名
       url.host = req.hostname.replace(/.*\.((:?bravetime\.net)|(:?vyohui\.cn)|(:?davdian\.com))/, `mouth${'[[env]]'.toString() == 'gray' ? '[[env]]' : ''}.priapi.$1`);
       // 内网路径
       url.pathname = url.pathname.replace('/api/mg/sale/', '/sale/api/');
       url.pathname = url.pathname.replace('/api/mg/user/', '/user/api/');

       // mobile
       } else if (url.pathname.indexOf('/api/m') !== -1) {
       // 内网域名
       url.host = req.hostname.replace(/.*\.((:?bravetime\.net)|(:?vyohui\.cn)|(:?davdian\.com))/, `mobile${'[[env]]'.toString() == 'gray' ? '[[env]]' : ''}.priapi.$1`);
       // 内网路径
       url.pathname = url.pathname.replace(/\/api\/m\/([a-z0-9]+)\/([a-z0-9]+)?(.*)/, '/api.php?s=$1&m=$2&$3');
       }

       } else {
       url.protocol = 'https';
       url.host = req.hostname;
       } */

      url.protocol = 'http';
      url.host = req.hostname;

      // 转化成最终请求url
      options.url = url.toString();

      // 环境号
      if ('[[num]]') {
        options.headers.rootflag = '[[num]]';
      }
    }

    // // 测试微信分享文案使用
    // if(options.url.indexOf('/api/') !== -1) {
    //   url.host = `localhost:8100`;
    // }
    // if(options.url.indexOf('/wechatJsToken') !== -1) {
    //   url.host = `18686604386.davdian.com:6001`;
    // }

    // 防止出错时查不到请求参数
    console.log(`接口请求参数(${options.url})：${JSON.stringify(options, ' ', 2)}`, {req});

    // 设置接口超时时间30s
    options.timeout = 30000;

    // 发送请求
    let response = null;
    try {
      let start = Date.now();
      response = await axios.request(options);
      console.log(`请求发送->返回共耗时：${Date.now() - start}ms (${options.url})`, {req});
      console.log(console);
    } catch (err) {
      console.error(`调用接口发生错误：(${options.url})`, {req});
      // 兼容jquery的回调写法
      if (oldOptions.error) {
        oldOptions.error(err);
      }
      throw new Error(err);
    }

    // 接口信息，只有request属性没有打印（request内部多数属性都是对象和方法，信息类型的属性很少）
    let simpleResponse = {
      // 请求信息
      config: response.config,
      // 返回信息
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
    };

    // 如果是服务端
    if (runtime.isServer()) {
      // 接口返回code不为0时，自动打出error log
      /* if (response.data && parseInt(response.data.code) !== 0) {
       // console.log(`发现接口返回code码不为0：\n${JSON.stringify(simpleResponse, ' ', 2)}`, {req});
       console.log(`发现接口返回code码不为0：↓`, {req});
       }*/

      if (debug || '[[env]]'.toString() !== 'prod') {
        console.log(`接口请求信息（${options.url}）：${JSON.stringify(simpleResponse, ' ', 2)}`, {req});
      }
    }

    // 如果是服务端
    if (runtime.isServer() && res) {
      let jump = forceUrl => {
        res.redirect(forceUrl);
        console.log(`已经跳转至强制域名 -> ${forceUrl}`, {req});
        throw new Error('interrupt');
      };

      // 当店铺不存在且不存在强关系时，则302到首页
      if (response.data && parseInt(response.data.code) === 10010) {
        let forceUrl = `${req.protocol}://bravetime.[[base_domain]]${req.url}`;
        jump(forceUrl);
      }

      // 如果有强制域名且与当前用户域名不同，则302到强制域名
      let forceDomain = getCookieFromResponse(response.headers['set-cookie'], 'force_domain');
      if (forceDomain && forceDomain !== req.hostname && forceDomain !== 'deleted') {
        let forceUrl = `${req.protocol}://${req.headers.host.replace(req.hostname, forceDomain)}${req.url}`;
        jump(forceUrl);
      }

      // 返回请求时带上服务端种的cookie
      for (let key of ['set-cookie']) {
        let value = response.headers[key];
        if (value) {
          res.set(key, value);
        }
      }
    }

    // 兼容jquery的回调写法
    if (oldOptions.success) {
      oldOptions.success(response.data);
    }

    return response.data;
  },
};
