'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 自定义
var json = {
  entry: {
    vendor: ['vue', 'vuex', 'vue-router', 'vue-lazyload', 'swiper', 'scriptjs', 'js-cookie']
  },
  output: {
    path: _config2.default.path.base + '/vendor',
    filename: '[name]' + (_config2.default.env.mini ? '.min' : '') + '.js',
    library: "[name]_factory" // 暴露的工厂函数名称
  },
  plugins: function () {
    var plugins = [new _webpack2.default.DllPlugin({
      // context: __dirname,
      context: _config2.default.path.base + '/vendor',
      path: _config2.default.path.base + '/vendor/[name]' + (_config2.default.env.mini ? '.min' : '') + '.json', // 清单json文件的绝对路径
      name: "[name]_factory" // 暴露的dll函数的名称
    })];
    if (_config2.default.env.mini) {
      plugins.push(new _webpack2.default.optimize.UglifyJsPlugin({
        output: {
          comments: false // remove all comments
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }));
    }
    return plugins;
  }(),
  resolve: {
    alias: {
      vue: _config2.default.env.mini ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
      swiper: _config2.default.env.mini ? 'swiper/dist/js/swiper.min.js' : 'swiper/dist/js/swiper.js'
    }
  }
}; // 第三方
exports.default = json;