'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // 第三方

// import glob from 'glob';
// import webpack from 'webpack';


// 自定义


var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _stylelintWebpackPlugin = require('stylelint-webpack-plugin');

var _stylelintWebpackPlugin2 = _interopRequireDefault(_stylelintWebpackPlugin);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import TextReplacePlugin from './plugin/TextReplacePlugin.js';

// 字符替换loader，替换全局环境变量
var replaceLoader = {
  loader: _path2.default.resolve(__dirname + '/loader/replace-loader.js'),
  options: {
    replacer: function () {
      var replacer = _extends({}, _config2.default.replacer);
      delete replacer.regex;
      return replacer;
    }()
  }
};

// 解决 vue-lazyload 编译报错问题
// var vuePackageJsonPath = `${__dirname}/../../vue-lazyload/.babelrc`;
var vuePackageJsonPath = _path2.default.resolve('node_modules/vue-lazyload/.babelrc');

var data = _fs2.default.readFileSync(vuePackageJsonPath, { encoding: 'utf-8' });
var vueLazyloadJson = JSON.parse(data);
// vueLazyloadJson.plugins = [];
vueLazyloadJson = {};
console.log(vueLazyloadJson);
_fs2.default.writeFileSync(vuePackageJsonPath, JSON.stringify(vueLazyloadJson, ' ', 2), { flag: 'w' });

var json = {
  entry: {},
  output: {},
  module: {
    // 每个rule内部的loader的执行顺序为倒序（后注册先执行）
    rules: [
    // js-loader
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: _config2.default.babel
      }, replaceLoader]
    },

    // vue-loader
    {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader',
        options: {
          // 处理vue中引用的css
          postcss: [(0, _autoprefixer2.default)(_config2.default.autoprefixer)],
          loaders: {
            js: [{
              loader: 'babel-loader',
              options: _config2.default.babel
            }]
          }
        }
      }, replaceLoader]
    },

    // json-loader
    {
      test: /\.json$/,
      use: [{ loader: 'json-loader' }, replaceLoader]
    },

    // scss-loader
    {
      test: /\.(scss|css)$/,
      use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, {
        loader: 'postcss-loader',
        options: {
          plugins: [(0, _autoprefixer2.default)(_config2.default.autoprefixer)]
        }
      }, { loader: 'sass-loader' }]
    },

    // img-loader
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [{ loader: 'url-loader' }]
    }]
  },

  // 监听文件变化
  watch: _config2.default.env.env ? false : true,
  watchOptions: {
    // poll: 1000,
  },

  plugins: [],
  externals: {},
  resolve: {
    alias: {
      // 本地开发使用开发版严格校验，发布到公共环境时使用压缩版避免严格校验产生的报错（严格校验促进更优秀的代码质量）
      vue: !_config2.default.env.env ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js',
      'runtime': _path2.default.resolve('src/common/js/dvd-base-js-runtime/dvd-base-js-runtime.js'),
      'ajax': _path2.default.resolve('src/common/js/dvd-service-js-ajax/dvd-service-js-ajax.js'),
      'date': _path2.default.resolve('src/common/js/dvd-base-js-date/dvd-base-js-date.js'),
      'number': _path2.default.resolve('src/common/js/dvd-base-js-number/dvd-base-js-number.js'),
      'type': _path2.default.resolve('src/common/js/dvd-base-js-type/dvd-base-js-type.js'),
      'console1': _path2.default.resolve('src/common/js/dvd-service-js-console/dvd-service-js-console.js'),
      'ua': _path2.default.resolve('src/common/js/dvd-base-js-ua/dvd-base-js-ua.js')
    }
  }
};

/* eslint loader creator */
function createEslintLoader() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      fix = _ref.fix;

  return {
    loader: 'eslint-loader',
    options: {
      // 出错停止编译
      // failOnError: true,

      // 是否自动修复文件（只能修复.js格式文件）
      fix: fix && _config2.default.env.repair ? true : false
    }
  };
}

/* 是否需要代码风格检测 */
if (_config2.default.env.lint) {
  // js代码格式校验
  json.module.rules[0].use.push(createEslintLoader());

  // vue代码格式校验
  json.module.rules[1].use.push({
    loader: 'htmllint-loader',
    query: {
      config: '.htmllintrc', // path to custom config file
      failOnError: false,
      failOnWarning: false
    }
  });
  json.module.rules[1].use[0].options.loaders.js.push(createEslintLoader({ fix: false }));

  // css代码格式校验
  json.plugins.push(new _stylelintWebpackPlugin2.default({
    syntax: 'scss',
    files: ['src/page/*/**/*.scss'],
    fix: _config2.default.env.repair ? true : false
  }));
}

exports.default = json;