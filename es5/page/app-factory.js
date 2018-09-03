'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _store = require('./store.js');

var _store2 = _interopRequireDefault(_store);

var _router = require('./router.js');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 工厂对象
 */
exports.default = {

  /* 工厂方法，创建vue实例 */
  create: function create() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        req = _ref.req,
        res = _ref.res;

    return new _vue2.default({
      router: _router2.default.create({ req: req, res: res }),
      store: _store2.default.create({ req: req, res: res }),
      render: function render(createElement) {
        return createElement(
        // app应用容器
        'div', {
          class: {
            app: true
          }
        }, [
        // // 过度
        // createElement(
        //   'transition',
        //   {
        //     attrs: {
        //       name: 'show',
        //     },
        //   },
        //   [
        // 缓存
        createElement('keep-alive', {}, [
        // 页面容器
        createElement('router-view', {
          class: {
            page: true
          },
          attrs: {
            req: req
          }
        })]
        //   ),
        // ],
        ),
        // 全局弹窗容器
        createElement('div', {
          class: {
            global: true
          }
        })]);
      }
    });
  }
};