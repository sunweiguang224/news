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

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/************************************ 创建新模块(npm run create) ************************************/
// 第三方
_gulp2.default.task('task_create', function () {
  console.log('>>>>>>>>>>>>>>> \u5F00\u59CB\u521B\u5EFA\u65B0\u9875\u9762\u3002' + _util2.default.getNow());

  // 询问用户新页面信息
  _inquirer2.default.prompt([{
    type: 'list',
    name: 'type',
    message: 'please input page\'s type ?',
    choices: ['mpa', 'spa'],
    validate: function validate(input) {
      return input ? true : false;
    }
  }, {
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
    _gulp2.default.src('build/res/create/**/*.*')

    // 统一文件名称
    .pipe((0, _gulpRename2.default)({
      basename: answer.name
    }))

    // 替换变量
    .pipe((0, _gulpReplace2.default)('{{name}}', answer.name)).pipe((0, _gulpReplace2.default)('${{title}}', answer.title || ''))

    // 输出文件
    .pipe(_gulp2.default.dest(destFilePath))

    // 生成空目录
    .on('end', function () {
      setTimeout(function () {
        _fs2.default.mkdirSync('src/page/' + answer.name + '/img');
        _fs2.default.mkdirSync('src/page/' + answer.name + '/vue');
      }, 1000);
    });

    console.log('>>>>>>>>>>>>>>> ' + answer.type + ': ' + answer.name + '\u9875\u9762\u5DF2\u521B\u5EFA\u5B8C\u6BD5\u3002' + _util2.default.getNow());
  });
});

// 自定义