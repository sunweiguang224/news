'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _babelCore = require('babel-core');

var babel = _interopRequireWildcard(_babelCore);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _eslintrc = require('./eslintrc.js');

var _eslintrc2 = _interopRequireDefault(_eslintrc);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/************************************ 页面级express路由编译 ************************************/
exports.default = function () {
  console.log('>>>>>>>>>>>>>>> \u9875\u9762\u7EA7express\u8DEF\u7531\u7F16\u8BD1\u5F00\u59CB\u3002' + _util2.default.getNow());

  _glob2.default.sync(_config2.default.path.router).forEach(function (filePath) {
    // 读取并babel
    var result = babel.transform(_fs2.default.readFileSync(filePath, 'utf-8'), {
      extends: _path2.default.resolve('.babelrc')
    });

    // 常量替换
    for (var i in _config2.default.replacer) {
      // 只替换[[开头的
      if (i.indexOf('[[') === 0) {
        // [ 转 \[
        var regex = i.replace(/\[/g, '\\[');
        // 替换
        result.code = result.code.replace(new RegExp(regex, 'g'), _config2.default.replacer[i]);
      }
    }

    // 输出到dist
    var destFilePath = '' + filePath.replace('src', 'dist');
    _util2.default.autoMkDir(destFilePath);
    _fs2.default.writeFileSync(destFilePath, result.code);

    console.log('[' + _util2.default.getNow() + '] \u9875\u9762\u7EA7express\u8DEF\u7531\u7F16\u8BD1\u5B8C\u6210 ' + destFilePath + ': ' + Math.floor(result.code.length / 1024) + 'KB');
  });

  console.log('>>>>>>>>>>>>>>> \u9875\u9762\u7EA7express\u8DEF\u7531\u7F16\u8BD1\u7ED3\u675F\u3002' + _util2.default.getNow());
};

// 自定义
// 第三方