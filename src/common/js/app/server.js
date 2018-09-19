import factory from './app-factory.js';
// import console from 'dvd-service-js-console';

// server端每次收到请求会重新初始化一个Vue实例
export default context => new Promise((resolve, reject) => {

  // 返创建vue对象
  let app = factory.create({
    req: context.req,
    res: context.res,
  });

  // 设置当前路由
  app.$router.push(context.req.url);

  // 等到 router 将可能的异步组件和钩子函数解析完
  app.$router.onReady(() => {

    console.log('onReady');

    // 获取匹配的页面
    let pages = app.$router.getMatchedComponents();


    // 找不到匹配页面向上层抛出404异常
    if (!pages.length) {
      return reject(new Error('404'));

      // // 可以考虑增加404页面
      // app.$router.push('/404.html');
      // pages = app.$router.getMatchedComponents();
    }

    // 保证所有的匹配到的页面准备就绪，比如数据
    Promise.all(pages.map(page => {
      if (page.beforeLifeInServer) {
        return page.beforeLifeInServer({
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

      // 返回已准备好的Vue实例
      resolve(app);
    }).catch(reject);
  }, () => {
    reject(new Error('路由onReady失败'));
  });

});
