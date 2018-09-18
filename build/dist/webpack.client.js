'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _clientPlugin = require('vue-server-renderer/client-plugin');

var _clientPlugin2 = _interopRequireDefault(_clientPlugin);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 复制vendor文件


// 自定义
// 第三方
_util2.default.copyFile(_config2.default.path.base + '/vendor/vendor.js', 'dist/static/common/js/vendor.js');
_util2.default.copyFile(_config2.default.path.base + '/vendor/vendor.min.js', 'dist/static/common/js/vendor.min.js');

var json = (0, _webpackMerge2.default)(require('./webpack.base').default, {
  entry: {
    'static/page/app-client': _config2.default.path.project + '/src/page/app-client.js'
  },

  output: {
    path: _config2.default.path.project + '/dist',
    filename: '[name].[hash:5]' + (_config2.default.env.mini ? '.min' : '') + '.js',
    chunkFilename: '[name].[chunkhash:5]' + (_config2.default.env.mini ? '.min' : '') + '.js',
    publicPath: _config2.default.replacer['[[static]]'] + '/'
  },

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
        filename: 'common/js/common.js'
        // minChunks: 5,
      }));
    }

    // 读取dll信息
    arr.push(new _webpack2.default.DllReferencePlugin({
      context: _config2.default.path.project,
      manifest: require(_config2.default.path.base + '/vendor/vendor' + (_config2.default.env.env ? '.min' : '') + '.json')
    }));

    // js混淆
    if (_config2.default.env.mini) {
      arr.push(new _webpack2.default.optimize.UglifyJsPlugin());
    }

    // 开发模式热更新
    if (!_config2.default.env.env) {
      arr.push(new _webpack2.default.HotModuleReplacementPlugin({}));
    }

    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    arr.push(new _clientPlugin2.default());

    return arr;
  }(),

  externals: {
    'babel-polyfill': 'window._babelPolyfill'
    // 'vconsole': 'window.VConsole',
    // 'ali-oss': 'window.OSS',
  }
});

exports.default = json;