import Vue from 'vue';
import Router from 'vue-router';
import lazyload from 'vue-lazyload';
import runtime from 'runtime';

Vue.use(Router);
Vue.use(lazyload);

export default {
  create ({req, res, store}) {
    const router = new Router({
      mode: 'history',
      routes: [
        {
          name: 'index',
          path: '/index.html',
          alias: ['/'],
          meta: {
            title: '天天想看',
          },
          component: () => import(/* webpackChunkName: "static/page/index/js/index" */'../../../page/index/index.vue'),
          beforeEnter (to, from, next) {
            next();
          },
        },
        {
          name: 'detail',
          path: '/detail.html',
          meta: {},
          component: () => import(/* webpackChunkName: "static/page/detail/js/detail" */'../../../page/detail/detail.vue'),
          beforeEnter (to, from, next) {
            next();
          },
        },
      ],
    });

    // 全局前置钩子
    router.beforeEach((to, from, next) => {
      if (runtime.isClient()) {

        // 首次进入
        if (!from.name) {
          store.commit(`${to.name}/setPageSwitchClassPrefix`, `history`);

          // 路由之间切换
        } else {

          debugger
          // 返回
          if (to.path === router.history.list[router.history.list.length - 1]) {
            store.commit(`${from.name}/setPageSwitchClassPrefix`, `new`);
            store.commit(`${to.name}/setPageSwitchClassPrefix`, `history`);

            // 前进
          } else {
            store.commit(`${from.name}/setPageSwitchClassPrefix`, `history`);
            store.commit(`${to.name}/setPageSwitchClassPrefix`, `new`);
          }
        }

      }
      next();
    });

    // 全局后置钩子
    router.afterEach((to, from, next) => {
      if (runtime.isClient()) {

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

    if (runtime.isClient()) {

      // 用来记录历史位置
      router.history.list = [];

      // 每次使用编程式导航跳转新页面时，记录新的url
      let routerPush = router.push;
      router.push = (location, onComplete, onAbort) => {

        // 跳转之前添加历史记录
        router.history.list.push(router.history.current.path);
        debugger

        routerPush.call(router, location, () => {
          if (onComplete) {
            onComplete();
          }
        }, () => {
          debugger
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
          debugger
          router.history.list.pop();
        } else {

          // 前进
          debugger
          router.history.list.push(router.history.current.path);
        }


        debugger
      });

    }

    return router;
  },
};
