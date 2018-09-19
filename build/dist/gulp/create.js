'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _gulpReplace = require('gulp-replace');

var _gulpReplace2 = _interopRequireDefault(_gulpReplace);

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

var _util = require('../util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/************************************ 创建新模块(npm run create) ************************************/


// 自定义
_gulp2.default.task('default', function () {
  console.log('>>>>>>>>>>>>>>> \u5F00\u59CB\u521B\u5EFA\u65B0\u9875\u9762\u3002' + _util2.default.getNow());

  // 询问用户新页面信息
  _inquirer2.default.prompt([{
    type: 'input',
    name: 'name',
    message: 'please input page\'s name ?',
    validate: function validate(input) {
      return input ? true : false;
    }
  }, {
    type: 'input',
    name: 'title',
    message: 'please input page\'s title ?'
  }]).then(function (answer) {
    console.log(JSON.stringify(answer, ' ', 2));

    // 开始生成文件
    _gulp2.default.src(_config2.default.path.project + '/build/res/create/**/*')

    // 统一文件名称
    .pipe((0, _gulpRename2.default)(function (path) {
      if (path.basename.indexOf('.store') !== -1) {
        path.basename = answer.name + '.store';
      } else {
        path.basename = answer.name;
      }
    }))

    // 替换变量
    .pipe((0, _gulpReplace2.default)('{{name}}', answer.name)).pipe((0, _gulpReplace2.default)('{{title}}', answer.title || ''))

    // 输出文件
    .pipe(_gulp2.default.dest(_config2.default.path.project + '/src/page/' + answer.name)).on('end', function () {
      setTimeout(function () {

        // 生成空目录
        _fs2.default.mkdirSync(_config2.default.path.project + '/src/page/' + answer.name + '/icon');
        _fs2.default.mkdirSync(_config2.default.path.project + '/src/page/' + answer.name + '/vue');
        console.log('>>>>>>>>>>>>>>> [' + answer.name + '] \u9875\u9762\u5DF2\u521B\u5EFA\u5B8C\u6BD5\u3002' + _util2.default.getNow());

        // 注册router
        var routerPath = _config2.default.path.project + '/src/common/js/app/app-router.js';
        var routerTpl = '{\n          name: \'' + answer.name + '\',\n          path: \'/' + answer.name + '.html\',\n          meta: {\n            title: \'' + answer.title + '\',\n          },\n          component: () => import(/* webpackChunkName: "static/page/' + answer.name + '/js/' + answer.name + '" */\'../../../page/' + answer.name + '/' + answer.name + '.vue\'),\n        },\n        // all route above ..';
        var routerContent = _fs2.default.readFileSync(routerPath, 'utf8').replace('// all route above ..', routerTpl);
        _fs2.default.writeFileSync(routerPath, routerContent);
        console.log('>>>>>>>>>>>>>>> [' + answer.name + '] router\u6CE8\u518C\u5B8C\u6BD5\u3002' + _util2.default.getNow());

        // 注册store
        var storePath = _config2.default.path.project + '/src/common/js/app/app-store.js';
        var storeTpl = answer.name + ': createCommonSetting(require(\'../../../page/' + answer.name + '/js/' + answer.name + '.store.js\').default),\n        // all store above ..';
        var storeContent = _fs2.default.readFileSync(storePath, 'utf8').replace('// all store above ..', storeTpl);
        _fs2.default.writeFileSync(storePath, storeContent);
        console.log('>>>>>>>>>>>>>>> [' + answer.name + '] store\u6CE8\u518C\u5B8C\u6BD5\u3002' + _util2.default.getNow());
      }, 1000);
    });
  });
}); // 第三方