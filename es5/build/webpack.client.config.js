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

var _clientPlugin = require('vue-server-renderer/client-plugin');

var _clientPlugin2 = _interopRequireDefault(_clientPlugin);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 复制文件


// 自定义
// 第三方
_util2.default.copyFile('node_modules/dvd-base-build-node-ssr/dist/dll/vendor.dll.js', 'dist/static/common/js/vendor.dll.js');
_util2.default.copyFile('node_modules/dvd-base-build-node-ssr/dist/dll/vendor.dll.min.js', 'dist/static/common/js/vendor.dll.min.js');

var json = (0, _webpackMerge2.default)(require('./webpack.base.config').default, {
  entry: {
    'page/app-client': './src/page/app-client.js'
  },

  output: function () {
    var fileName = '[name].[hash:5]' + (_config2.default.env.mini ? '.min' : '') + '.js';
    return {
      path: _path2.default.resolve('dist/static'),
      filename: fileName,
      chunkFilename: fileName.replace('hash:', 'chunkhash:'),
      publicPath: _config2.default.replacer['[[static]]'] + '/'
    };
  }(),

  plugins: function () {
    var arr = [];

    // 全局变量替换
    // arr.push(new webpack.DefinePlugin({
    //   PRODUCTION: JSON.stringify(true),
    //   sss: JSON.stringify(true),
    //   '[[sss]]': JSON.stringify(true),
    //   VERSION: JSON.stringify("5fa3b9"),
    //   BROWSER_SUPPORTS_HTML5: true,
    //   TWO: "1+1",
    //   "typeof window": JSON.stringify("object")
    // }));

    // arr.push(new webpack.ContextReplacementPlugin(
    //   'bbb': 'wefwefwef',
    //   // newContentResource?: string,
    //   // newContentRecursive?: boolean,
    //   // newContentRegExp?: RegExp
    // ));

    // arr.push(new TextReplacePlugin());

    // 公共js提取
    if (!_config2.default.env.ssr && _config2.default.env.env) {
      // 提取公共js
      arr.push(new _webpack2.default.optimize.CommonsChunkPlugin({
        name: "common",
        filename: 'common/js/common.js',
        minChunks: 5
      }));
    }

    // 读取dll信息
    var dllJsonPath = _config2.default.env.env ? './dll/vendor.dll.min.json' : './dll/vendor.dll.json';
    var dllJson = require(dllJsonPath);
    // console.log(`dllJson(${dllJsonPath})内容如下: `);
    // console.log(JSON.stringify(dllJson, ' ', 2));

    // 读取dll信息
    arr.push(new _webpack2.default.DllReferencePlugin({
      context: __dirname + '/../../',
      manifest: dllJson
    }));

    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    if (_config2.default.env.mini) {
      arr.push(new _webpack2.default.optimize.UglifyJsPlugin());
    }
    arr.push(new _clientPlugin2.default());

    // 开发模式热更新
    if (!_config2.default.env.env) {
      arr.push(new _webpack2.default.HotModuleReplacementPlugin({}));
    }

    return arr;
  }(),

  externals: {
    'vconsole': 'window.VConsole',
    'babel-polyfill': 'window._babelPolyfill',
    'ali-oss': 'window.OSS'
  }
});

exports.default = json;