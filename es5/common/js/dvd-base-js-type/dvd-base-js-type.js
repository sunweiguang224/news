'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @module dvd-base-js-type
 * @author swg [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-type.git)
 */
exports.default = {
  isNumber: function isNumber(value) {
    return Object.prototype.toString.call(value) === '[object Number]';
  },
  isString: function isString(value) {
    return Object.prototype.toString.call(value) === '[object String]';
  },
  isBoolean: function isBoolean(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
  },
  isObject: function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  },
  isArray: function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  isFunction: function isFunction(value) {
    return Object.prototype.toString.call(value) === '[object Function]';
  }
};