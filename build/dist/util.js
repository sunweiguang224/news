'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 时间格式化
// import through from 'through2';

exports.default = {
  /* 获取当前格式化时间 */
  getNow: function getNow() {
    return (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss ' + (0, _moment2.default)().millisecond());
  },

  /* 获取被格式化当前时间作为静态资源版本号 */
  getTimeFormatVersion: function getTimeFormatVersion() {
    return (0, _moment2.default)().format("YYYY-MM-DD_HH:mm:ss");
  },

  /* 获取工程路径。注意：服务器端编译时取的是编译时的目录名，和本地不一致 */
  getProjectPath: function getProjectPath() {
    return _path2.default.resolve(__dirname, '../../');
  },

  /* 获取工程名称。注意：服务器端编译时取的是编译时的目录名，和本地不一致 */
  getProjectName: function getProjectName() {
    return _path2.default.basename(this.getProjectPath());
  },

  // 对象格式化
  stringifyFormat: function stringifyFormat(obj) {
    return JSON.stringify(obj, ' ', 2);
  },

  /* gulp插件，什么也不做 */
  // gulpNothing() {
  //   return through.obj(function (file, enc, cb) {
  //     this.push(file);
  //     cb();
  //   });
  // },
  /**
   * 如果没有目标路径不存在，自动创建路径所需文件夹
   * @param dest
   */
  autoMkDir: function autoMkDir(dest) {
    // 计算dest每一级目录的路径
    var dirArr = dest.split('/');
    dirArr.forEach(function (item, i) {
      dirArr[i] = '' + (i > 0 ? dirArr[i - 1] + '/' : '') + item;
    });

    // 检查每级路径是否存在，不存在则创建文件夹
    for (var i = 0; i < dirArr.length - 1; i++) {
      var dirName = dirArr[i];
      if (!_fs2.default.existsSync(dirName)) {
        _fs2.default.mkdirSync(dirName);
      }
    }
  },
  copyFile: function copyFile(src, dest) {
    this.autoMkDir(dest);
    // 开始复制
    _fs2.default.copyFileSync(src, dest);
  }
};