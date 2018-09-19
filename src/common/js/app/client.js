import factory from './factory.js';

// 创建vue实例
let app = factory.create();
let router = app.$router;
let store = app.$store;

// 设置回调，路由解析完毕前触发
router.beforeResolve((to, from, next) => {

  // 当在C端页面之间切换时，设置切换动效
  if (from.name) {
    // 设置切换动效，返回
    if (to.path === router.history.list[router.history.list.length - 1]) {
      store.commit(`${from.name}/setPageSwitchClassPrefix`, `new`);
      store.commit(`${to.name}/setPageSwitchClassPrefix`, `history`);

      // 设置切换动效，前进
    } else {
      store.commit(`${from.name}/setPageSwitchClassPrefix`, `history`);
      store.commit(`${to.name}/setPageSwitchClassPrefix`, `new`);
    }
  }

  // 获取匹配的页面
  let pages = router.getMatchedComponents(to);

  // 保证所有的匹配到的页面准备就绪，比如数据
  Promise.all(pages.map(page => {
    if (page.beforeLifeInClient) {
      return page.beforeLifeInClient({
        store: store,
        route: to,
      });
    }
  })).then(next).catch(err => {
    throw err;
  });

});

// 设置回调，路由解析完毕后触发
router.afterEach((to, from, next) => {

  // 设置页面title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

});

// 为router增加history属性，记录历史位置
(function () {

  // 历史数组
  router.history.list = [];

  // 每次使用编程式导航跳转新页面时，记录新的url
  let routerPush = router.push;
  router.push = (location, onComplete, onAbort) => {

    // 跳转之前添加历史记录
    router.history.list.push(router.history.current.path);

    routerPush.call(router, location, () => {
      if (onComplete) {
        onComplete();
      }
    }, () => {
      if (onAbort) {
        onAbort();

        // 跳转失败了删除刚刚添加的历史记录
        router.history.list.pop();
      }
    });
  };

  // 每次后退时，删除历史记录中最后一条
  window.addEventListener('popstate', () => {
    // 后退
    if (router.history.list.length > 0) {
      router.history.list.pop();
    } else {

      // 前进
      router.history.list.push(router.history.current.path);
    }
  });

})();

router.onReady(() => {

  // 客户端状态与服务端同步
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }

  // 保证所有的匹配到的页面准备就绪，比如数据
  router.getMatchedComponents().map(page => {
    if (page.beforeLifeInClient) {
      return page.beforeLifeInClient({
        store: store,
        route: router.history.current,
      });
    }
  });

  // 挂载组件
  app.$mount('.app');
});


// 从其他项目返回当前项目时，刷新页面（某些机型缓存的不是上次history方式访问的页面内容，而是上次refresh方式的内容）
// window.addEventListener('load', function () {
//   setTimeout(function () {
//     window.addEventListener('pageshow', function () {
//       location.reload();
//     });
//   }, 100);
// }, false);
