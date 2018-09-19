'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _serverPlugin = require('vue-server-renderer/server-plugin');

var _serverPlugin2 = _interopRequireDefault(_serverPlugin);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 第三方
var setting = {
  // 将 entry 指向应用程序的 server entry 文件
  entry: _config2.default.path.project + '/src/common/js/app/server.js',

  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  // 外置的模块将不会被预处理
  externals: (0, _webpackNodeExternals2.default)({
    // 不要外置化 webpack 需要处理的依赖模块。
    // 你可以在、这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
    // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
    whitelist: [
      // /^dvd-/,
      // 以下模块都间接性的引用了.vue或.scss模块
      // /^dvd-service-com/,
      // /^dvd-service-js-popup$/,
      // /^dvd-service-js-common$/,
      // /^dvd-service-js-debug$/,
      // /^dvd-service-js-img-lazyload$/,
      // /^dvd-service-js-ajax$/,
    ]
  }),

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2',
    path: _config2.default.path.project + '/dist',
    filename: '[name].js'
  },

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: [new _serverPlugin2.default()]
};

// 对 bundle renderer 提供 source map 支持
// if (config.env.env !== 'prod') {


// 自定义
setting.devtool = 'source-map';
// }

exports.default = (0, _webpackMerge2.default)(require('./webpack.base.js').default, setting);