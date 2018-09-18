'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * @module replace-loader
 * @author swg [源码地址]()
 */


exports.default = function (source) {
  // 不对node_modules目录下的文件进行替换
  if (this.resourcePath && this.resourcePath.indexOf('node_modules') === -1 || this.resourcePath.indexOf('dvd-service-js-ajax') !== -1) {
    // 获取参数
    var options = _loaderUtils2.default.getOptions(this);

    // options.replacer是map类型的，map转regex进行替换
    if (_typeof(options.replacer) == 'object') {
      // 生成正则字符串
      var regStr = '(';
      var replaceCount = 0;
      for (var i in options.replacer) {
        regStr += i.replace(/\[/g, '\\[') + '|';
        replaceCount++;
      }
      if (replaceCount > 0) {
        regStr = regStr.substr(0, regStr.length - 1);
      }
      regStr += ')';

      // 生成正则对象
      var regex = new RegExp(regStr, 'g');

      // 将key替换成value
      source = source.replace(regex, function (matcher) {
        return options.replacer[matcher];
      });
    }

    // console.log(this)
    // if (source.indexOf('scss') !== -1) {
    if (this.resourcePath.indexOf('index.scss') !== -1) {
      console.log(source);
    }
  }

  // 返回结果
  return source;
};

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }