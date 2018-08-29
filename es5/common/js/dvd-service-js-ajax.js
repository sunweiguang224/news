'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _dvdBaseJsType = require('dvd-base-js-type');

var _dvdBaseJsType2 = _interopRequireDefault(_dvdBaseJsType);

var _dvdBaseJsRuntime = require('dvd-base-js-runtime');

var _dvdBaseJsRuntime2 = _interopRequireDefault(_dvdBaseJsRuntime);

var _dvdServiceJsEncrypt = require('dvd-service-js-encrypt');

var _dvdServiceJsEncrypt2 = _interopRequireDefault(_dvdServiceJsEncrypt);

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _dvdServiceJsConsole = require('dvd-service-js-console');

var _dvdServiceJsConsole2 = _interopRequireDefault(_dvdServiceJsConsole);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 对象转cookie格式字符串
function objectToCookieStr(cookies) {
  var result = '';

  if (cookies) {
    var count = 0;

    // 拼接字符串
    for (var i in cookies) {
      result += i + '=' + cookies[i] + '; ';
      count++;
    }

    // 去掉末尾多余分隔符
    if (count > 0) {
      result = result.substr(0, result.length - 2);
    }
  }
  return result;
}

// 从response headers里取指定的cookie
function getCookieFromResponse(cookies, name) {
  for (var i = 0; cookies && i < cookies.length; i++) {
    var result = new RegExp(name + '=([^;]*)').exec(cookies[i]);
    if (result) {
      return result[1];
    }
  }
  return null;
}

/**
 * @module dvd-service-js-ajax
 * @author sunweiguang [源码地址](http://gitlab.rd.vyohui.com/FE-Service/dvd-service-js-ajax.git)
 * 兼容server端和client端的发送请求模块
 * @param options {Object} 给axios的参数，包含请求地址和发送数据等（api参照axios）
 * @param server {Object} 只有server端才用到的信息，包含req、res等
 * @param debug {Object} 只有server端才用到的信息，包含req、res等
 * @returns {String}
 */
exports.default = {
  send: function send() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        req = _ref.req,
        res = _ref.res,
        _ref$debug = _ref.debug,
        debug = _ref$debug === undefined ? false : _ref$debug;

    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var oldOptions, _arr, _i, key, value, url, response, start, simpleResponse, jump, forceUrl, forceDomain, _forceUrl, _arr2, _i2, _key, _value;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // 保留
              oldOptions = options;

              // 默认参数

              options = _extends({}, {
                dataType: 'json'
              }, options);

              // 如果是服务端，获取用户请求中的dvdsid来设置sess_key
              if (_dvdBaseJsRuntime2.default.isServer()) {
                options.data = options.data || {};
                if (req.cookies && req.cookies.dvdsid) {
                  options.data.sess_key = req.cookies.dvdsid;
                }
              }

              // 数据加密（如果options.data是字符串类型则不进行加密，兼容原有的client端代码）
              options.data = _dvdBaseJsType2.default.isString(options.data) ? options.data : _dvdServiceJsEncrypt2.default.ajax(options.data, { req: req, res: res });

              // 选项参数以axios为准，但也兼容以前jquery的参数
              options = {
                url: options.url,
                method: options.method && options.method.toLowerCase() || options.type && options.type.toLowerCase(),
                responseType: options.responseType || options.dataType,
                data: options.data,
                // 如果有req参数则表示是服务端，发送请求时带上用户的headers（模拟用户的身份发送请求）
                // headers: Object.assign({}, req && req.headers || {}, options.headers || {}),
                headers: {}
              };

              // 如果是服务端
              if (_dvdBaseJsRuntime2.default.isServer()) {
                // 发送请求时带上用户的headers（模拟用户的身份发送请求）
                _arr = ['Cookie', 'User-Agent'];
                for (_i = 0; _i < _arr.length; _i++) {
                  key = _arr[_i];
                  value = req.headers[key.toLowerCase()];

                  if (value) {
                    options.headers[key] = value;
                  }
                }

                // 使用用户终端当前域名请求接口
                url = (0, _urlParse2.default)(options.url);


                url.slashes = true;

                // 如果在服务器上
                if (_dvdBaseJsRuntime2.default.isLinux()) {
                  // if (runtime.isServer()) {

                  // 内网服务只提供http协议，外网必须用http，否则会405
                  url.protocol = 'http';

                  // 内网域名转换，mouth
                  if (url.pathname.indexOf('/api/mg') !== -1) {
                    // url.host = req.hostname.replace(/.*\.((:?bravetime\.net)|(:?vyohui\.cn)|(:?davdian\.com))/, 'smouth1.srv.$1');

                    // 内网域名
                    url.host = req.hostname.replace(/.*\.((:?bravetime\.net)|(:?vyohui\.cn)|(:?davdian\.com))/, 'mouth' + ('[[env]]'.toString() == 'gray' ? '[[env]]' : '') + '.priapi.$1');
                    // 内网路径
                    url.pathname = url.pathname.replace('/api/mg/sale/', '/sale/api/');
                    url.pathname = url.pathname.replace('/api/mg/user/', '/user/api/');

                    // mobile
                  } else if (url.pathname.indexOf('/api/m') !== -1) {
                    // 内网域名
                    url.host = req.hostname.replace(/.*\.((:?bravetime\.net)|(:?vyohui\.cn)|(:?davdian\.com))/, 'mobile' + ('[[env]]'.toString() == 'gray' ? '[[env]]' : '') + '.priapi.$1');
                    // 内网路径
                    url.pathname = url.pathname.replace(/\/api\/m\/([a-z0-9]+)\/([a-z0-9]+)?(.*)/, '/api.php?s=$1&m=$2&$3');
                  }
                } else {
                  url.protocol = 'https';
                  url.host = req.hostname;
                }

                // 转化成最终请求url
                options.url = url.toString();

                // 环境号
                if ('[[num]]') {
                  options.headers.rootflag = '[[num]]';
                }
              }

              // 防止出错时查不到请求参数
              _dvdServiceJsConsole2.default.log('\u63A5\u53E3\u8BF7\u6C42\u53C2\u6570(' + options.url + ')\uFF1A' + JSON.stringify(options, ' ', 2), { req: req });

              // 设置接口超时时间30s
              options.timeout = 30000;

              // 发送请求
              response = null;
              _context.prev = 9;
              start = Date.now();
              _context.next = 13;
              return _axios2.default.request(options);

            case 13:
              response = _context.sent;

              _dvdServiceJsConsole2.default.log('\u8BF7\u6C42\u53D1\u9001->\u8FD4\u56DE\u5171\u8017\u65F6\uFF1A' + (Date.now() - start) + 'ms (' + options.url + ')', { req: req });
              _context.next = 22;
              break;

            case 17:
              _context.prev = 17;
              _context.t0 = _context['catch'](9);

              _dvdServiceJsConsole2.default.error('\u8C03\u7528\u63A5\u53E3\u53D1\u751F\u9519\u8BEF\uFF1A(' + options.url + ')', { req: req });
              // 兼容jquery的回调写法
              if (oldOptions.error) {
                oldOptions.error(_context.t0);
              }
              throw new Error(_context.t0);

            case 22:

              // 接口信息，只有request属性没有打印（request内部多数属性都是对象和方法，信息类型的属性很少）
              simpleResponse = {
                // 请求信息
                config: response.config,
                // 返回信息
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
                data: response.data
              };

              // 如果是服务端

              if (_dvdBaseJsRuntime2.default.isServer()) {
                // 接口返回code不为0时，自动打出error log
                if (response.data && parseInt(response.data.code) !== 0) {
                  // console.log(`发现接口返回code码不为0：\n${JSON.stringify(simpleResponse, ' ', 2)}`, {req});
                  _dvdServiceJsConsole2.default.log('\u53D1\u73B0\u63A5\u53E3\u8FD4\u56DEcode\u7801\u4E0D\u4E3A0\uFF1A\u2193', { req: req });
                }

                // if (debug || '[[env]]'.toString() !== 'prod') {
                _dvdServiceJsConsole2.default.log('\u63A5\u53E3\u8BF7\u6C42\u4FE1\u606F\uFF08' + options.url + '\uFF09\uFF1A' + JSON.stringify(simpleResponse, ' ', 2), { req: req });
                // }
              }

              // 如果是服务端
              if (_dvdBaseJsRuntime2.default.isServer() && res) {
                jump = function jump(forceUrl) {
                  res.redirect(forceUrl);
                  _dvdServiceJsConsole2.default.log('\u5DF2\u7ECF\u8DF3\u8F6C\u81F3\u5F3A\u5236\u57DF\u540D -> ' + forceUrl, { req: req });
                  throw new Error('interrupt');
                };

                // 当店铺不存在且不存在强关系时，则302到首页


                if (response.data && parseInt(response.data.code) === 10010) {
                  forceUrl = req.protocol + '://bravetime.[[base_domain]]' + req.url;

                  jump(forceUrl);
                }

                // 如果有强制域名且与当前用户域名不同，则302到强制域名
                forceDomain = getCookieFromResponse(response.headers['set-cookie'], 'force_domain');

                if (forceDomain && forceDomain !== req.hostname && forceDomain !== 'deleted') {
                  _forceUrl = req.protocol + '://' + req.headers.host.replace(req.hostname, forceDomain) + req.url;

                  jump(_forceUrl);
                }

                // 返回请求时带上服务端种的cookie
                _arr2 = ['set-cookie'];
                for (_i2 = 0; _i2 < _arr2.length; _i2++) {
                  _key = _arr2[_i2];
                  _value = response.headers[_key];

                  if (_value) {
                    res.set(_key, _value);
                  }
                }
              }

              // 兼容jquery的回调写法
              if (oldOptions.success) {
                oldOptions.success(response.data);
              }

              return _context.abrupt('return', response.data);

            case 27:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this, [[9, 17]]);
    }))();
  }
};