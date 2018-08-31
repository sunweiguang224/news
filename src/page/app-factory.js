import Vue from 'vue';
import store from './store.js';
import router from './router.js';

/**
 * 工厂对象
 */
export default {

  /* 工厂方法，创建vue实例 */
  create: ({req, res} = {}) => new Vue({
    router: router.create({req, res}),
    store: store.create({req, res}),
    render: createElement => createElement(
      // 应用容器
      'div',
      {
        class: {
          app: true,
        },
      },
      [
        // 页面容器
        createElement(
          'keep-alive',
          {},
          [
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
          ]
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
  }),
};
