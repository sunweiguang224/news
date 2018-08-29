import Vue from 'vue';
import Router from 'vue-router';
import lazyload from 'vue-lazyload';
import runtime from 'dvd-base-js-runtime';

Vue.use(Router);
Vue.use(lazyload);

export default {
  create ({req, res}) {
    const router = new Router({
      mode: 'history',
      routes: [
        {
          path: '/index.html',
          alias: ['/'],
          meta: {
            title: '首页',
          },
          component: () => import(/* webpackChunkName: "page/index/js/index" */'./index/index.vue'),
          beforeEnter (to, from, next) {
            next();
          },
        },
      ],
    });

    // 全局前置钩子
    router.beforeEach((to, from, next) => {
      next();
    });

    // 全局后置钩子
    router.afterEach((to, from, next) => {
      if (runtime.isClient()) {
        if (to.meta && to.meta.title) {
          document.title = to.meta.title;
        }
        const startPos = 0;
        window.scrollTo(startPos, startPos + 1);
        window.scrollTo(startPos, startPos);
      }
    });

    return router;
  },
};
