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
        res = _ref.res,
        store = _ref.store;

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
        // component: require('./index/index.vue').default,
        beforeEnter: function beforeEnter(to, from, next) {
          next();
        }
      }, {
        name: 'detail',
        path: '/detail.html',
        meta: {},
        component: function component() {
          return import( /* webpackChunkName: "page/detail/js/detail" */'./detail/detail.vue');
        },
        // component: require('./detail/detail.vue').default,
        beforeEnter: function beforeEnter(to, from, next) {
          next();
        }
      }]
    });

    // 全局前置钩子
    router.beforeEach(function (to, from, next) {
      if (_runtime2.default.isClient()) {

        // 首次进入
        if (!from.name) {
          store.commit(to.name + '/setTransitionName', 'old');

          // 路由之间切换
        } else {

            debugger;
            // 返回
            if (to.path === router.history.list[router.history.list.length - 1]) {
              store.commit(from.name + '/setTransitionName', 'new');
              store.commit(to.name + '/setTransitionName', 'old');

              // 前进
            } else {
              store.commit(from.name + '/setTransitionName', 'old');
              store.commit(to.name + '/setTransitionName', 'new');
            }
          }
      }
      next();
    });

    // 全局后置钩子
    router.afterEach(function (to, from, next) {
      if (_runtime2.default.isClient()) {

        // 设置页面title
        if (to.meta && to.meta.title) {
          document.title = to.meta.title;
        }

        // 设置页面位置
        // const startPos = 0;
        // window.scrollTo(startPos, startPos + 1);
        // window.scrollTo(startPos, startPos);
      }
    });

    if (_runtime2.default.isClient()) {

      // 用来记录历史位置
      router.history.list = [];

      // 每次使用编程式导航跳转新页面时，记录新的url
      var routerPush = router.push;
      router.push = function (location, onComplete, onAbort) {

        // 跳转之前添加历史记录
        router.history.list.push(router.history.current.path);
        debugger;

        routerPush.call(router, location, function () {
          if (onComplete) {
            onComplete();
          }
        }, function () {
          debugger;
          if (onAbort) {
            onAbort();

            // 跳转失败了删除刚刚添加的历史记录
            router.history.list.pop();
          }
        });
      };

      // 每次后退时，删除历史记录中最后一条
      window.addEventListener('popstate', function () {
        // 后退
        if (router.history.list.length > 0) {
          debugger;
          router.history.list.pop();
        } else {

          // 前进
          debugger;
          router.history.list.push(router.history.current.path);
        }

        debugger;
      });
    }

    return router;
  }
};