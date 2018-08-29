'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _vuxLoader = require('vux-loader');

var _vuxLoader2 = _interopRequireDefault(_vuxLoader);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _webpackNodeExternals = require('webpack-node-externals');

var _webpackNodeExternals2 = _interopRequireDefault(_webpackNodeExternals);

var _serverPlugin = require('vue-server-renderer/server-plugin');

var _serverPlugin2 = _interopRequireDefault(_serverPlugin);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _build_page_router = require('./build_page_router.js');

var _build_page_router2 = _interopRequireDefault(_build_page_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 如果本地开发，启动express服务之前编译路由，确保路由能够注册上
// 如果发布代码，路由已经在npm run server中编译好，不需要启动服务前编译，这样可以快速重启


// 自定义
if (_config2.default.env.env) {
  (0, _build_page_router2.default)();
} // 第三方


var setting = {
  // 将 entry 指向应用程序的 server entry 文件
  entry: function () {
    return './src/page/app-server.js';
  }(),

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
    /^dvd-service-com/, /^dvd-service-js-popup$/, /^dvd-service-js-common$/, /^dvd-service-js-debug$/, /^dvd-service-js-img-lazyload$/, /^dvd-service-js-ajax$/]
  }),

  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2',
    path: _path2.default.resolve('dist/static'),
    filename: '[name].js'
  },

  // 这是将服务器的整个输出
  // 构建为单个 JSON 文件的插件。
  // 默认文件名为 `vue-ssr-server-bundle.json`
  plugins: function () {
    var arr = [];

    // 服务端代码
    arr.push(new _serverPlugin2.default());

    return arr;
  }()
};

// 对 bundle renderer 提供 source map 支持
if (_config2.default.env.env !== 'prod') {
  setting.devtool = 'source-map';
}

exports.default = (0, _webpackMerge2.default)(require('./webpack.base.config.js').default, setting);