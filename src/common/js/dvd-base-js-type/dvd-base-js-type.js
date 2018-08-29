/**
 * @module dvd-base-js-type
 * @author swg [源码地址](http://gitlab.rd.vyohui.com/FE-Base/dvd-base-js-type.git)
 */
export default {
  isNumber(value){
    return Object.prototype.toString.call(value) === '[object Number]';
  },
  isString(value){
    return Object.prototype.toString.call(value) === '[object String]';
  },
  isBoolean(value){
    return Object.prototype.toString.call(value) === '[object Boolean]';
  },
  isObject(value){
    return Object.prototype.toString.call(value) === '[object Object]';
  },
  isArray(value){
    return Object.prototype.toString.call(value) === '[object Array]';
  },
  isFunction(value){
    return Object.prototype.toString.call(value) === '[object Function]';
  },
}

