'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ajax = require('ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _runtime = require('runtime');

var _runtime2 = _interopRequireDefault(_runtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var scriptjs = _runtime2.default.isClient() ? require('scriptjs') : {};

exports.default = {
  // weixin-js-sdk 原始对象
  wx: null,

  // 下次可以获取token的时间
  nextCanGetTokenTime: null,

  init: function init() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var token;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.loadSdk();

            case 2:
              _context.next = 4;
              return _this.getToken();

            case 4:
              token = _context.sent;
              _context.next = 7;
              return _this.checkToken(token);

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },


  // 加载 weixin-js-sdk.js
  loadSdk: function loadSdk() {
    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new Promise(function (resolve, reject) {
                scriptjs('//res.wx.qq.com/open/js/jweixin-1.4.0.js', function () {
                  _this2.wx = window.wx;
                  resolve();
                }, reject);
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },


  // 获取签名
  getToken: function getToken() {
    var _this3 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', new Promise(function (resolve, reject) {
                _ajax2.default.send({
                  type: 'get',
                  url: '/wechatJsToken?url=' + encodeURIComponent(encodeURIComponent(location.href)) + '&_=' + Date.now(),
                  dataType: 'json'
                }, {}).then(function (res) {
                  resolve(res.data);
                }, reject);
              }));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, _this3);
    }))();
  },


  // 验证签名，获取接口权限
  checkToken: function checkToken(token) {
    var _this4 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt('return', new Promise(function (resolve, reject) {

                // 验证成功回调
                _this4.wx.ready(function () {
                  _this4.nextCanGetTokenTime = null;
                  resolve();
                });

                // 验证失败回调
                _this4.wx.error(function (res) {
                  reject(new Error('\u5FAE\u4FE1\u9A8C\u8BC1\u5931\u8D25\uFF1A1\u5206\u949F\u540E\u53EF\u91CD\u65B0\u5C1D\u8BD5\uFF0C[' + res.errMsg + ']'));
                });

                // 通过config接口注入权限验证配置
                _this4.wx.config({
                  debug: false,
                  appId: token.appId,
                  timestamp: token.timestamp,
                  nonceStr: token.nonceStr,
                  signature: token.signature,
                  jsApiList: [
                  // 1.4新接口
                  'updateAppMessageShareData', 'updateTimelineShareData',

                  // 1.0接口，即将废弃
                  'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone ',

                  // 音频接口
                  'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'translateVoice',

                  // 图片接口
                  'chooseImage', 'previewImage', 'uploadImage', 'downloadImage',

                  // 其他接口
                  'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard']
                });
              }));

            case 1:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, _this4);
    }))();
  },


  // 设置分享信息
  setShareInfo: function setShareInfo() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var shareInfo = {
      // 分享标题
      title: '分享标题',

      // 分享描述
      desc: '分享描述',

      // 页面地址，开头必须有协议
      link: window.location.href,

      // 分享图标，尺寸200 * 200
      imgUrl: 'http://9i.dvmama.com/shop_logo/2017/10/14/80_80_cea51d9e9b4708afa9c82e2ad4bc1bef.jpeg?x-oss-process=image/resize,m_fill,w_100,h_100/format,webp'
    };

    // 自定义参数覆盖默认参数
    _extends(shareInfo, options);

    // 微信好友、QQ好友
    // this.wx.updateAppMessageShareData(shareInfo);

    // 微信朋友圈、QQ空间
    // this.wx.updateTimelineShareData(shareInfo);

    // 1.0.0
    this.wx.onMenuShareTimeline(shareInfo);
    this.wx.onMenuShareAppMessage(shareInfo);
    this.wx.onMenuShareWeibo(shareInfo);
    this.wx.onMenuShareQZone(shareInfo);
  }
};