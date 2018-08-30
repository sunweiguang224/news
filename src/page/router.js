import Vue from 'vue';
import Router from 'vue-router';
import lazyload from 'vue-lazyload';
import runtime from 'runtime';

Vue.use(Router);
Vue.use(lazyload);

export default {
  create ({req, res}) {
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
          component: () => import(/* webpackChunkName: "page/index/js/index" */'./index/index.vue'),
          beforeEnter (to, from, next) {
            next();
          },
        },
        {
          name: 'detail',
          path: '/detail.html',
          meta: {
            title: '详情',
          },
          component: () => import(/* webpackChunkName: "page/detail/js/detail" */'./detail/detail.vue'),
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
        // 设置页面title
        document.title = to.params && to.params.title || to.meta && to.meta.title;

        // 设置页面位置
        // const startPos = 0;
        // window.scrollTo(startPos, startPos + 1);
        // window.scrollTo(startPos, startPos);
      }
    });

    return router;
  },
};
