import ua from 'ua';
import Vue from 'vue';
import Vuex from 'vuex';
import runtime from 'runtime';

Vue.use(Vuex);

/**
 * 基础设置
 * @param setting
 * @return {*}
 */
let createCommonSetting = setting => {
  // 强制每个store使用命名空间
  setting.namespaced = true;

  // setting.state属性覆盖
  let pageState = setting.state();
  setting.state = () => Object.assign({
    // 每个store初始默认切换动画前缀
    pageSwitchClassPrefix: 'history',
  }, pageState);

  // setting.state属性覆盖
  setting.mutations = Object.assign({
    // 页面切换动画
    setPageSwitchClassPrefix (state, data) {
      state.pageSwitchClassPrefix = data;
    },
  }, setting.mutations);

  return setting;
};

export default {
  create ({req, res}) {
    return new Vuex.Store({
      modules: {
        global: {
          namespaced: true,
          state () {
            let state = {
              statusBarHeight: (function () {
                let statusBarHeight = ua.getStatusBarHeight(req && req.headers && req.headers['user-agent']);
                statusBarHeight = statusBarHeight && !isNaN(Number(statusBarHeight)) ? Number(statusBarHeight) : 0;
                return statusBarHeight;
              })(),
            };

            if (runtime.isClient()) {
              // C端变量
              state.client = {
                window,
                document: window.document,
                location: window.location,
              };
            }

            return state;
          },
          mutations: {
            setStatusBarHeight (state, data) {
              state.statusBarHeight = data;
            },
          },
          getters: {
            /* categoryIndex (state) {
             return 0;
             } */
          },
          actions: {},
        },
        index: createCommonSetting(require('../../../page/index/js/index.store.js').default),
        detail: createCommonSetting(require('../../../page/detail/js/detail.store.js').default),
        // all store above ..
      },
    });
  },
};
