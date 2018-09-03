'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dvdBaseJsDate = require('../dvd-base-js-date/dvd-base-js-date');

var _dvdBaseJsDate2 = _interopRequireDefault(_dvdBaseJsDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTime() {
  return _dvdBaseJsDate2.default.format(new Date(), 'yyyy-MM-dd hh:mm:ss:SSS');
}

/**
 * 获取log前缀（前缀包括时间、日志类型、用户信息等）
 * @param type
 * @returns {string}
 */
function getPrefix(type) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      req = _ref.req;

  // console.log(req)
  if (req && !req.logPrefix) {
    req.logPrefix = '[' + req.method + '] [' + req.protocol + '://' + req.headers.host + req.url + '] [force_domain=' + (req.cookies.force_domain || '') + '] [dvdsid=' + (req.cookies.dvdsid || '') + '] [UA=' + (req.headers['user-agent'] || '') + ']';
  }
  return '[' + getTime() + '] [' + type + ']' + (req && req.logPrefix ? ' ' + req.logPrefix : '') + ' => ';
}

/**
 * @module dvd-service-js-console
 * @author sunweiguang [源码地址](http://gitlab.rd.vyohui.com/FE-Service/dvd-service-js-console.git)
 */
exports.default = {
  /**
   * 打印日志
   * @param text {String|Object}  日志
   */
  log: function log(text) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        req = _ref2.req;

    console.log();
    console.log(getPrefix('log', { req: req }), text);
  },


  /**
   * 打印错误
   * @param text {String|Object}  错误
   */
  error: function error(text) {
    var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        req = _ref3.req;

    console.error();
    console.error(getPrefix('error', { req: req }), text);
  },


  /**
   * 打印信息
   * @param text {String|Object}  信息
   */
  info: function info(text) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        req = _ref4.req;

    console.info();
    console.info(getPrefix(), { req: req }, text);
  }
};