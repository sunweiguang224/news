'use strict';

var _appFactory = require('./app-factory.js');

var _appFactory2 = _interopRequireDefault(_appFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 创建vue实例
var app = _appFactory2.default.create();

app.$router.onReady(function () {

  // 预先调用下一个页面的asyncData方法
  app.$router.beforeResolve(function (to, from, next) {
    Promise.all(app.$router.getMatchedComponents(to).map(function (c) {
      if (c.asyncData) {
        return c.asyncData({
          store: app.$store,
          route: to
        });
      }
    })).then(function () {
      next();
    }).catch(next);
  });

  // 客户端状态与服务端同步
  if (window.__INITIAL_STATE__) {
    app.$store.replaceState(window.__INITIAL_STATE__);
  }

  // 挂载组件
  app.$mount('.app');
});

// 从其他项目返回当前项目时，刷新页面（某些机型缓存的不是上次history方式访问的页面内容，而是上次refresh方式的内容）
window.addEventListener('load', function () {
  setTimeout(function () {
    window.addEventListener('pageshow', function () {
      location.reload();
    });
  }, 100);
}, false);