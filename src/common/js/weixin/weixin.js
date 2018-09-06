import ajax from 'ajax';
import runtime from 'runtime';

let scriptjs = runtime.isClient() ? require('scriptjs') : {};

export default {
  // weixin-js-sdk 原始对象
  wx: null,

  // 下次可以获取token的时间
  nextCanGetTokenTime: null,

  async init () {
    await this.loadSdk();

    let token = await this.getToken();

    await this.checkToken(token);
  },

  // 加载 weixin-js-sdk.js
  async loadSdk () {
    return new Promise((resolve, reject) => {
      scriptjs('//res.wx.qq.com/open/js/jweixin-1.4.0.js', () => {
        this.wx = window.wx;
        resolve();
      }, reject);
    });
  },

  // 获取签名
  async getToken () {
    return new Promise((resolve, reject) => {
      ajax.send({
        type: 'get',
        url: `/wechatJsToken?url=${encodeURIComponent(encodeURIComponent(location.href))}&_=${Date.now()}`,
        dataType: 'json',
      }, {}).then(res => {
        resolve(res.data);
      }, reject);
    });
  },

  // 验证签名，获取接口权限
  async checkToken (token) {
    return new Promise((resolve, reject) => {

      // 验证成功回调
      this.wx.ready(() => {
        this.nextCanGetTokenTime = null;
        resolve();
      });

      // 验证失败回调
      this.wx.error(res => {
        reject(new Error(`微信验证失败：1分钟后可重新尝试，[${res.errMsg}]`));
      });

      // 通过config接口注入权限验证配置
      this.wx.config({
        debug: false,
        appId: token.appId,
        timestamp: token.timestamp,
        nonceStr: token.nonceStr,
        signature: token.signature,
        jsApiList: [
          // 1.4新接口
          'updateAppMessageShareData',
          'updateTimelineShareData',

          // 1.0接口，即将废弃
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone ',

          // 音频接口
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'downloadVoice',
          'translateVoice',

          // 图片接口
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',

          // 其他接口
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard',
        ],
      });
    });
  },

  // 设置分享信息
  setShareInfo (options = {}) {
    let shareInfo = {
      // 分享标题
      title: '分享标题',

      // 分享描述
      desc: '分享描述',

      // 页面地址，开头必须有协议
      link: window.location.href,

      // 分享图标，尺寸200 * 200
      imgUrl: 'http://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp',
    };

    // 自定义参数覆盖默认参数
    Object.assign(shareInfo, options);

    // 微信好友、QQ好友
    // this.wx.updateAppMessageShareData(shareInfo);

    // 微信朋友圈、QQ空间
    // this.wx.updateTimelineShareData(shareInfo);

    // 1.0.0
    this.wx.onMenuShareTimeline(shareInfo);
    this.wx.onMenuShareAppMessage(shareInfo);
    this.wx.onMenuShareWeibo(shareInfo);
    this.wx.onMenuShareQZone(shareInfo);
  },
};
