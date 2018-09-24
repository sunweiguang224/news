import runtime from 'runtime';
import type from 'type';
import ua from 'ua';

let native = {};

if (runtime.isClient() && ua.isNewsApp) {
  (function createProxy(original, proxy) {
    for (let i in original) {
      let methodName = i;
      if (type.isFunction(original[methodName])) {
        native[i] = function (options) {
          return JSON.parse(original[methodName](JSON.stringify(options)));
        };
      } else {
        // // 多级api
        // native[i] = {};
        // createProxy(original[i], native[i]);

        // 一级api，直接属性赋值
        native[i] = original[i];
      }
    }
  })(window.native, native);

  // 给native调用的js
  window.apiForNative = {
    test (msg) {
      return msg;
    },
  };
}

export default native;
