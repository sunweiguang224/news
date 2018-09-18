// 第三方
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';

// 自定义
import config from './config.js';
import util from './util.js';

let json = {
  entry: {
    vendor: [
      'vue',
      'vuex',
      'vue-router',
      'vue-lazyload',
      'swiper',
      'scriptjs',
      'js-cookie',
      // 'crypto-js/md5.js',
      // 'babel-polyfill',
    ],
  },
  output: {
    path: `${config.path.base}/vendor`,
    filename: '[name]' + (config.env.mini ? '.min' : '') + '.js',
    library: "[name]_factory",  // 暴露的工厂函数名称
  },
  plugins: function () {
    var plugins = [
      new webpack.DllPlugin({
        // context: __dirname,
        context: `${config.path.base}/vendor`,
        path:`${config.path.base}/vendor/[name]${config.env.mini ? '.min' : ''}.json`,  // 清单json文件的绝对路径
        name: "[name]_factory",   // 暴露的dll函数的名称
      }),
    ];
    if (config.env.mini) {
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        output: {
          comments: false  // remove all comments
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
      vue: config.env.mini ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js',
      swiper: config.env.mini ? 'swiper/dist/js/swiper.min.js' : 'swiper/dist/js/swiper.js',
    }
  },
};

export default json;
