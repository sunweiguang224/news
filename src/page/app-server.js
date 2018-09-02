import factory from './app-factory.js';
import clientMocker from './client-mocker.js';
// import console from 'dvd-service-js-console';

export default context => new Promise((resolve, reject) => {
  // mock client端全局变量，避免报错
  clientMocker.mock();

  // console.log(`app-server.js收到请求`, {req: context.req});

  // 返创建vue对象
  let app = factory.create({
    req: context.req,
    res: context.res,
  });

  // 设置当前路由
  app.$router.push(context.req.url);

  // 等到 router 将可能的异步组件和钩子函数解析完
  app.$router.onReady(() => {
    const Coms = app.$router.getMatchedComponents();

    // 匹配不到路由404
    if (!Coms.length) {
      return reject(new Error('404'));
    }

    // 调用所有匹配到的路由的asyncData方法保证渲染前已取到数据
    Promise.all(Coms.map(Com => {
      if (Com.asyncData) {
        return Com.asyncData({
          req: context.req,
          res: context.res,
          store: app.$store,
          route: app.$router.history.current,
        });
      }
    })).then(() => {
      // 设置渲染变量
      context.state = app.$store.state;
      context.title = app.$router.currentRoute.meta.title;

      resolve(app);
    }).catch(reject);
  }, () => {
    reject(new Error('路由onReady失败'));
  });
});
