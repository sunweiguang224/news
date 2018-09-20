import Vue from 'vue';
import Router from 'vue-router';
import lazyload from 'vue-lazyload';
// import runtime from 'runtime';

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
        },
        {
          name: 'detail',
          path: '/detail.html',
          meta: {},
          component: () => import(/* webpackChunkName: "static/page/detail/js/detail" */'../../../page/detail/detail.vue'),
        },
        // all route above ..
      ],
    });

    return router;
  },
};
