// 第三方
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin';

// 自定义
import config from './config.js';
import util from './util.js';

// 复制vendor文件
util.copyFile(`${config.path.base}/vendor/vendor.js`, 'dist/static/common/js/vendor.js');
util.copyFile(`${config.path.base}/vendor/vendor.min.js`, 'dist/static/common/js/vendor.min.js');

let json = merge(require('./webpack.base').default, {
  entry: {
    'static/common/js/app/client': `${config.path.project}/src/common/js/app/client.js`,
  },

  output: {
    path: `${config.path.project}/dist`,
    filename: `[name].[hash:5]${config.env.mini ? '.min' : ''}.js`,
    chunkFilename: `[name].[chunkhash:5]${config.env.mini ? '.min' : ''}.js`,
    publicPath: `${config.replacer['[[static]]']}/`,
  },

  plugins: function () {
    let arr = [];

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
    if (!config.env.ssr && config.env.env) {
      // 提取公共js
      arr.push(new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        filename: 'common/js/common.js',
        // minChunks: 5,
      }));
    }

    // 读取dll信息
    arr.push(new webpack.DllReferencePlugin({
      context: config.path.project,
      manifest: require(`${config.path.base}/vendor/vendor${config.env.env ? '.min' : ''}.json`),
    }));

    // js混淆
    if (config.env.mini) {
      arr.push(new webpack.optimize.UglifyJsPlugin());
    }

    // 开发模式热更新
    if (!config.env.env) {
      arr.push(new webpack.HotModuleReplacementPlugin({}));
    }

    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    arr.push(new VueSSRClientPlugin());

    return arr;
  }(),

  externals: {
    'babel-polyfill': 'window._babelPolyfill',
    // 'vconsole': 'window.VConsole',
    // 'ali-oss': 'window.OSS',
  },
});

export default json;
