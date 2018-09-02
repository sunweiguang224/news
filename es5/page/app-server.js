'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appFactory = require('./app-factory.js');

var _appFactory2 = _interopRequireDefault(_appFactory);

var _clientMocker = require('./client-mocker.js');

var _clientMocker2 = _interopRequireDefault(_clientMocker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import console from 'dvd-service-js-console';

exports.default = function (context) {
  return new Promise(function (resolve, reject) {
    // mock client端全局变量，避免报错
    _clientMocker2.default.mock();

    // console.log(`app-server.js收到请求`, {req: context.req});

    // 返创建vue对象
    var app = _appFactory2.default.create({
      req: context.req,
      res: context.res
    });

    // 设置当前路由
    app.$router.push(context.req.url);

    // 等到 router 将可能的异步组件和钩子函数解析完
    app.$router.onReady(function () {
      var Coms = app.$router.getMatchedComponents();

      // 匹配不到路由404
      if (!Coms.length) {
        return reject(new Error('404'));
      }

      // 调用所有匹配到的路由的asyncData方法保证渲染前已取到数据
      Promise.all(Coms.map(function (Com) {
        if (Com.asyncData) {
          return Com.asyncData({
            req: context.req,
            res: context.res,
            store: app.$store,
            route: app.$router.history.current
          });
        }
      })).then(function () {
        // 设置渲染变量
        context.state = app.$store.state;
        context.title = app.$router.currentRoute.meta.title;

        resolve(app);
      }).catch(reject);
    }, function () {
      reject(new Error('路由onReady失败'));
    });
  });
};