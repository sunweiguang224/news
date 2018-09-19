import factory from './factory.js';

// 创建vue实例
let app = factory.create();

function enteredInClient(){
  app.$router.getMatchedComponents().map(c => {
    if (c.enteredInClient) {
      return c.enteredInClient();
    }
  });
}

app.$router.onReady(() => {

  // 客户端状态与服务端同步
  if (window.__INITIAL_STATE__) {
    app.$store.replaceState(window.__INITIAL_STATE__);
  }

  // 预先调用下一个页面的asyncData方法
  app.$router.beforeResolve((to, from, next) => {
    Promise.all(app.$router.getMatchedComponents(to).map(c => {
      if (c.beforeLifeInClient) {
        return c.beforeLifeInClient({
          store: app.$store,
          route: to,
        });
      }
    })).then(() => {
      next();

      enteredInClient();
    }).catch(next);
  });

  // 挂载组件
  app.$mount('.app');

  // 触发
  enteredInClient();
});


// 从其他项目返回当前项目时，刷新页面（某些机型缓存的不是上次history方式访问的页面内容，而是上次refresh方式的内容）
// window.addEventListener('load', function () {
//   setTimeout(function () {
//     window.addEventListener('pageshow', function () {
//       location.reload();
//     });
//   }, 100);
// }, false);
