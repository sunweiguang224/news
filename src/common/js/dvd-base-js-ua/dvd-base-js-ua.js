import runtime from 'runtime';

/**
 * @module dvd-base-js-ua
 * @author swg [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-ua.git)
 */
export default {
  // 当前页面ua
  ua: runtime.isClient() ? navigator.userAgent : '',
  // 缓存，
  cache: {},
  /**
   * 当前ua是否匹配入参正则
   * @param regex 正则
   * @returns {boolean}
   */
  match({regex, ua}) {
    if (Object.prototype.toString.call(regex) === '[object String]') {
      regex = new RegExp(regex, 'g');
    }
    return regex ? regex.test(ua || this.ua) : false;
  },
  /**
   * 从缓存取匹配结果，如果未命中重新通过正则判断
   * @param cacheName {String}
   * @param regexArray {Regex}
   * @returns {boolean}
   */
  getFromCache(cacheName, regexArray, ua) {
    /*// 如果未缓存过cache[cacheName]，则缓存对正则数组regStrArray匹配的结果
     if (this.cache[cacheName] === undefined) {
     // 正则数组regStrArray匹配的结果
     var cacheValue;
     for (var i in regexArray) {
     cacheValue = this.match(regexArray[i]);
     if (cacheValue) {
     break;
     }
     }
     // 缓存
     this.cache[cacheName] = cacheValue;
     }
     // 返回缓存中的值
     return this.cache[cacheName];*/

    // 正则数组regStrArray匹配的结果
    for (var i in regexArray) {
      if (this.match({regex: regexArray[i], ua})) {
        return true
      }
    }
    return false;
  },
  /**
   * chrome浏览器
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.108 Mobile Safari/537.36
  // * ios    Mozilla/5.0 (iPod; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/51.0.2704.64 Mobile/13F69 Safari/601.1.46
  isChrome(ua) {
    return this.getFromCache('isChrome', ['Chrome', 'CriOS'], ua);
  },
  /**
   * uc浏览器
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; U; Android 6.0; zh-CN; MI 5 Build/MRA58K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/10.10.3.810 U3/0.8.0 Mobile Safari/534.30
  // * ios    Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X; zh-CN) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/13F69 UCBrowser/10.9.16.802 Mobile
  isUc(ua) {
    return this.getFromCache('isUc', ['UCBrowser'], ua);
  },
  /**
   * QQ浏览器
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; U; Android 6.0; zh-cn; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko)Version/4.0 Chrome/37.0.0.0 MQQBrowser/6.7 Mobile Safari/537.36
  // * ios    Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/6.0 MQQBrowser/6.7.2 Mobile/13F69 Safari/8536.25 MttCustomUA/2
  isQqBrowser(ua) {
    return this.getFromCache('isQqBrowser', ['MQQBrowser'], ua);
  },
  /**
   * 小米系统浏览器
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; U; Android 6.0; zh-cn; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.85 Mobile Safari/537.36 XiaoMi/MiuiBrowser/2.1.1
  isXiaoMiBrowser(ua) {
    return this.getFromCache('isXiaoMiBrowser', ['XiaoMi/MiuiBrowser'], ua);
  },
  /**
   * safari浏览器
   * @returns {Boolean}
   */
  // * ios    Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1
  isSafari(ua) {
    return this.getFromCache('isSafari', ['Version/\\d?[.]\\d Mobile/.* Safari/.*'], ua);
  },
  /**
   * 百度浏览器
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/48.0.2564.116 Mobile Safari/537.36 baidubrowser/7.8.12.0 (Baidu; P1 6.0)
  // * ios
  isBaiduBrowser(ua) {
    return this.getFromCache('isBaiduBrowser', ['baidubrowser'], ua);
  },
  /**
   * 搜狗浏览器
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5; Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.92 SDK/1.2.2.675 Mobile Safari/537.36 SogouMSE,SogouMobileBrowser/5.5.0
  // * ios
  isSougouBrowser(ua) {
    return this.getFromCache('isSougouBrowser', ['SogouMobileBrowser'], ua);
  },
  /**
   * 新浪微博
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36 Weibo (Xiaomi-MI 5__weibo__6.6.0__android__android6.0)
  // * ios    Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 Weibo (iPod5,1__weibo__5.4.0__iphone__os9.3.2)
  isSinaWeiBo(ua) {
    return this.getFromCache('isSinaWeiBo', ['Weibo'], ua);
  },
  /**
   * QQ+QQ空间（QQ和QQ空间ua相同）
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036522 Safari/537.36 V1_AND_SQ_6.3.7_374_YYB_D QQ/6.3.7.2795 NetType/WIFI WebP/0.3.0 Pixel/1080
  // * ios    Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 QQ/6.3.5.437 V1_IPH_SQ_6.3.5_1_APP_A Pixel/640 Core/UIWebView NetType/WIFI Mem/12
  isQq(ua) {
    return this.getFromCache('isQq', [/QQ\/[0-9]?/]);
  },
  /**
   * 微信+朋友圈（微信和朋友圈ua相同）
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/37.0.0.0 Mobile MQQBrowser/6.2 TBS/036523 Safari/537.36 MicroMessenger/6.3.18.800 NetType/WIFI Language/zh_CN
  // * ios    Mozilla/5.0 (iPod touch; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 MicroMessenger/6.3.19 NetType/WIFI Language/zh_CN
  // * ios    Mozilla/5.0 (iPhone; CPU iPhone OS 8_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12D508 MicroMessenger/6.5.14 NetType/WIFI Language/zh_CN
  isWeiXin(ua) {
    return this.getFromCache('isWeiXin', ['MicroMessenger'], ua);
  },
  /**
   * 支付宝
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; U; Android 6.0; zh-cn; MI 5 Build/MRA58K) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 UCBrowser/1.0.0.100 U3/0.8.0 Mobile Safari/534.30 AlipayDefined(nt:WIFI,ws:360|640|3.0) AliApp(AP/9.6.8.053103) AlipayClient/9.6.8.053103 Language/zh-Hans
  // * ios    Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 ChannelId(12) Nebula PSDType(1) AlipayDefined(nt:WIFI,ws:320|504|2.0) AliApp(AP/9.6.6.05070802) AlipayClient/9.6.6.05070802 Language/zh-Hans
  isAlipay(ua) {
    return this.getFromCache('isAlipay', ['AlipayClient'], ua);
  },
  /**
   * 搜狐新闻客户端
   * @returns {Boolean}
   */
  // * android  Mozilla/5.0 (Linux; Android 6.0; MI 5 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/46.0.2490.76 Mobile Safari/537.36 SohuNews/5.6.0 BuildCode/106 JsKit/1.0 (Android)
  // * ios    Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 JsKit/1.0 (iOS)
  isSohuNewsClient(ua) {
    return this.getFromCache('isSohuNewsClient', ['SohuNews', 'JsKit'], ua);
  },
  /**
   * android
   * @returns {Boolean}
   */
  isAndroid(ua) {
    return this.getFromCache('isAndroid', ['Android'], ua);
  },
  /**
   * ios
   * @returns {Boolean}
   */
  isIos(ua) {
    return this.getFromCache('isIos', ['iPhone'], ua);
  },
  /**
   * 手机端
   * @returns {Boolean}
   */
  isMobile(ua) {
    return this.getFromCache('isMobile', ['Mobile'], ua);
  },
  /**
   * 大V店客户端
   * @returns {Boolean}
   */
  // * android(正式环境):  Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 android.davdian.com/3.6.2
  // * android(beta环境):  Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 android.vyohui.cn/3.7.0/dvddomain=1
  // * ios(正式环境):  Mozilla/5.0 (iPhone; CPU iPhone OS 8_2 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Mobile/12D508 ios.davdian.com/5.0.0 /WebView=WKWeb
  isDvdApp(ua) {
    return this.getFromCache('isDvdApp', ['davdian', 'vyohui', 'bravetime'], ua);
  },
  /**
   * 获取大V店客户端版本号
   * @returns {String}
   */
  getDvdAppVersion(ua) {
    let result = /(ios|android)(?:\.box)?\.(davdian\.com|vyohui\.cn|bravetime\.net)\/([\d\.]+)/.exec(ua || this.ua);
    if (result) {
      return result[3];
    }
  },
  /**
   * 获取大V店app当前环境
   * @returns {String}
   */
  getDvdAppEnv(ua) {
    let result = /(ios|android)\.(davdian\.com|vyohui\.cn|bravetime\.net)\/([\d\.]+)\/(dev|beta|gray)/.exec(ua || this.ua);
    if (result) {
      return result[4];
    } else if (this.isDvdApp()) {
      return 'prod';
    } else {
      return '';
    }
    return /(iPhone OS ([\d_]+))|(Android ([\d\.]+))/ig.exec(ua || this.ua)
  },
  /**
   * 获取大V店app当前环境分支
   * @returns {String}
   */
  // Mozilla/5.0 (Linux; Android 7.0; MI 5 Build/NRD90M; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 android.davdian.com/5.2.0/gray/dvddomain=1
  getDvdAppNum(ua) {
    let result = /(ios|android)\.(davdian\.com|vyohui\.cn|bravetime\.net)\/([\d\.]+)\/(dev|beta|gray)\/dvddomain=(\d+)/.exec(ua || this.ua);
    if (result) {
      return result[5] || '';
    }
  },
  /**
   * 获取ios系统版本
   * @returns {String}
   */
  getIosVersion(ua) {
    let result = /iPhone[ ]OS[ ](\d*_*\d*_*\d*)/.exec(ua || this.ua);
    if (result) {
      return result[1] ? result[1].replace(/_/g, '.') : '';
    }
  },
  /**
   * 获取android系统版本
   * @returns {String}
   */
  getAndroidVersion(ua) {
    let result = /android [\d._]+/.exec((ua || this.ua).toLowerCase());
    if (result) {
      return result[0] ? result[0].replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".").split(".")[0] : '';
    }
  },
  /**
   * 比较版本号
   * @param v1  版本号1
   * @param v2  版本号2
   * @returns {Number} 如果 > 0， 说明v1 > v2
   */
  compareVersion(v1, v2) {
    // 用.分割版本号
    let subV1Arr = v1.split('.');
    let subV2Arr = v2.split('.');

    // 取.最多的数组长度
    let length = subV1Arr.length >= subV2Arr.length ? subV1Arr.length : subV2Arr.length;

    // 比较每个相对应的子版本号
    for (let i = 0; i < length; i++) {
      let subV1 = (subV1Arr[i] || 0) * 1;
      let subV2 = (subV2Arr[i] || 0) * 1;
      if (subV1 > subV2) {
        return 1;
      } else if (subV1 < subV2) {
        return -1;
      }
    }
    return 0;
  },
  /**
   * 获取手机系统版本号
   */
  getSysVersion(ua){
    let result = /(?:iPhone OS ([\d_]+))|(?:Android ([\d\.]+))/ig.exec(ua || this.ua);
    return result[1] ? result[1].replace(/_/ig, '.') : result[2];
  },
  /**
   * 获取大V店app设备号
   */
  getDvdAppDeviceId(ua){
    let result = /\/deviceId=([^/ =]+)/.exec(ua || this.ua);
    return result ? result[1] : '';
  },

  /**
   * 获取大V店app设备号
   */
  getStatusBarHeight(ua){
    let result = /StatusBarHeight\/([^ ]+)/.exec(ua || this.ua);
    return result ? result[1] : '';
  },
};
