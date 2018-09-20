'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/************************* 环境变量 ***************************/
var developer = _fs2.default.existsSync('./developer.config.js') ? require('../../developer.config.js').default : null;
var env = {
  env: process.env.env !== '[object Object]' && process.env.env || '',
  num: process.env.num || '',
  mini: process.env.mini == 'true',
  zip: process.env.zip == 'true',
  gzip: process.env.gzip == 'true',
  check: process.env.check == 'true',
  repair: process.env.repair == 'true',
  ssr: _package2.default.type == 'ssr',
  page: function () {
    // 如果是SPA应用，则编译入口为项目package.json中main指定的字段或router
    if (_package2.default.type == 'spa') {
      return _package2.default.main || 'router';
    } else {
      // 编译入口数组
      var entry = [];

      // 如果是工单发布||没有developer.config.js||developer.config.js中没有指定page字段||developer.config.js中page.length字段长度为0，则编译所有页面
      if (process.env.env || !developer || !developer.page || !developer.page.length) {
        entry = _fs2.default.readdirSync(__dirname + '/../../src/page');
      } else {
        entry = developer.page;
      }

      // 过滤掉不存在和废弃的入口
      entry = entry.filter(function (item) {
        var path = __dirname + '/../../src/page/' + item + '/config.json';
        return !_fs2.default.existsSync(path) || !require(path).deprecated;
      });

      console.log('\u5373\u5C06\u7F16\u8BD1\u5165\u53E3\u4E3A\uFF1A\uFF08\u5DF2\u8FC7\u6EE4\u6389\u4E0D\u5B58\u5728\u548C\u5E9F\u5F03\u7684\u5165\u53E3\uFF09');
      console.log(entry);

      // 如果是多个，返回{a,b,c,..}格式
      if (entry.length > 1) {
        return '{' + entry.join(',') + '}';
        // 如果是单个，返回字符串形式单个入口名
      } else if (entry.length === 1) {
        return developer.page[0];
      } else {
        throw new Error('编译入口数量为0，请检查developer.config.js配置目录名是否正确或src/page/目录下页面数量是否为0。');
      }
    }
  }()
};

/************************* 文件glob路径 ***************************/
var path = {
  project: _util2.default.getProjectPath(),
  base: '' + __dirname,
  html: ['node_modules/dvd-base-build-node-ssr/html/template.html'],
  css: ['src/*page/' + env.page + '/css/*.scss', 'src/*common/css/common.scss'],
  js: 'src/page/' + env.page + '/js/*.js',
  router: 'src/*page/' + env.page + '/js/router.js',
  // dll: `node_modules/dvd-base-build-node-ssr/dist/dll/*.dll${env.env && '.min'}.js`,
  dll: 'node_modules/dvd-base-build-node-ssr/dist/dll/*.js',
  moveJs: 'src/*common/js/autoRootSize.js',
  img: ['src/*page/' + env.page + '/img/*', 'src/*common/img/*'],
  iconDir: 'src/page/' + env.page + '/img/icon*',
  temp: '.temp',
  dist: 'dist',
  static: 'dist/static',
  include: __dirname + '/../../'
};

/************************* 环境参数替换表 ***************************/
var replacer = {
  '[[env]]': env.env,
  '[[num]]': env.num,
  '[[base_domain]]': function () {
    if (env.env == 'dev') {
      return 'bravetime.net';
    } else if (env.env == 'beta') {
      return 'vyohui.cn';
    } else {
      return 'davdian.com';
    }
  }(),
  '[[static]]': function () {
    // if (env.env == 'dev') {
    //   return `//fe.bravetime.net/${pkg.name}/static${env.num}/dist/static`;
    // } else if (env.env == 'beta' || env.env == 'pt') {
    //   return `//fe.vyohui.cn/${pkg.name}/static${env.num}/dist/static`;
    // } else {
    //   return `//5e.dvmama.com/${pkg.name}/static${env.num}/dist/static`;
    // }
    // return `/static`;
    return '';
  }(),
  '[[vendor]]': '//3n.dvmama.com',
  '[[v]]': env.mini ? '' : '?v=' + _util2.default.getTimeFormatVersion(),
  '[[project]]': _package2.default.name,
  regex: /\[\[(env|num|base_domain|static|vendor|v|project)]]/g
};
// replacer.regex = function () {
//   let arr = [];
//   for (let i in replacer) {
//     let key = i.replace(/\[/g, '\\[');
//     arr.push(key);
//   }
//   console.log(arr);
//   return new RegExp(arr.join('|'), 'g');
// }();

/************************* css前缀 ***************************/
var autoprefixer = {
  browsers: ["last 4 versions", "Android >= 4", "iOS >= 4", "IE >= 8", "> 0.1%", "Firefox >= 20"]
};

/************************* babel配置 ***************************/
var babel = {
  presets: ["es2015", "stage-0", "stage-1", "stage-2", "stage-3"],
  plugins: ["transform-vue-jsx", "transform-object-assign", ["transform-runtime", {
    "helpers": false,
    "polyfill": false,
    "regenerator": true,
    "moduleName": "babel-runtime"
  }]]
};

var config = {
  env: env,
  path: path,
  replacer: replacer,
  pkg: _package2.default,
  autoprefixer: autoprefixer,
  babel: babel
};

console.log('/************************* \u8FD0\u884C\u53C2\u6570 ***************************/');
console.log('config: ' + _util2.default.stringifyFormat(config));

exports.default = config;