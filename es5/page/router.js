'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueLazyload = require('vue-lazyload');

var _vueLazyload2 = _interopRequireDefault(_vueLazyload);

var _runtime = require('runtime');

var _runtime2 = _interopRequireDefault(_runtime);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
_vue2.default.use(_vueLazyload2.default);

exports.default = {
  create: function create(_ref) {
    var req = _ref.req,
        res = _ref.res;

    var router = new _vueRouter2.default({
      mode: 'history',
      routes: [{
        name: 'index',
        path: '/index.html',
        alias: ['/'],
        meta: {
          title: '天天想看'
        },
        component: function component() {
          return import( /* webpackChunkName: "page/index/js/index" */'./index/index.vue');
        },
        beforeEnter: function beforeEnter(to, from, next) {
          next();
        }
      }, {
        name: 'detail',
        path: '/detail.html',
        meta: {
          title: '详情'
        },
        component: function component() {
          return import( /* webpackChunkName: "page/detail/js/detail" */'./detail/detail.vue');
        },
        beforeEnter: function beforeEnter(to, from, next) {
          next();
        }
      }]
    });

    // 全局前置钩子
    router.beforeEach(function (to, from, next) {
      next();
    });

    // 全局后置钩子
    router.afterEach(function (to, from, next) {
      if (_runtime2.default.isClient()) {
        // 设置页面title
        document.title = to.params && to.params.title || to.meta && to.meta.title;

        // 设置页面位置
        // const startPos = 0;
        // window.scrollTo(startPos, startPos + 1);
        // window.scrollTo(startPos, startPos);
      }
    });

    return router;
  }
};