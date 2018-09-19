import Vue from 'vue';
import store from './store.js';
import router from './router.js';

/**
 * 工厂对象
 */
export default {

  /* 工厂方法，创建vue实例 */
  create: ({req, res} = {}) => {
    let newStore = store.create({req, res});
    let newRouter = router.create({req, res, store: newStore});
    return new Vue({
      store: newStore,
      router: newRouter,
      render: createElement => createElement(
        // app应用容器
        'div',
        {
          class: {
            app: true,
          },
        },
        [
          // 缓存
          createElement(
            'keep-alive',
            {},
            [
              // 页面容器
              createElement(
                'router-view',
                {
                  class: {
                    page: true,
                  },
                  attrs: {
                    req,
                  },
                }
              ),
            ],
          ),
          // 全局弹窗容器
          createElement(
            'div',
            {
              class: {
                global: true,
              },
            },
          ),
        ]
      ),
    });
  },
};
