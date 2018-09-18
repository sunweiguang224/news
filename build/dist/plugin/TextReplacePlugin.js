'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * webpack文本替换插件
 */
var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: 'apply',
    value: function apply(compiler) {
      compiler.plugin("compilation", function (compilation) {
        compilation.plugin('optimize-modules', function (modules) {
          modules.forEach(function (module, i) {
            if (module._source && module._source._value) {
              // console.log(module._source._value);
              module._source._value = module._source._value.replace(_config2.default.replacer.regex, function (key) {
                return _config2.default.replacer[key];
              });
              // console.log(module._source._value);
            }
          });
        });
      });
    }
  }]);

  return _class;
}();

exports.default = _class;