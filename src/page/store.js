import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  create () {
    return new Vuex.Store({
      modules: {
        index: require('./index/js/store.js').default,
        detail: require('./detail/js/store.js').default,
        global: {
          namespaced: true,
          state () {
            return {
              statusBarHeight: 20,
            };
          },
          mutations: {
            setStatusBarHeight (state, data) {
              state.statusBarHeight = data;
            },
          },
          getters: {
            /*categoryIndex (state) {
              return 0;
            }*/
          },
          actions: {
            /*async getNextPage (context, {req, res, type = 'append'} = {}) {
              let category = context.state.category;

              let newsList = context.state.newsList[category];

              let list = await ajax.send({
                type: 'get',
                url: `http://${runtime.isServer() ? 'localhost' : location.hostname}:8100/api/queryNewsList`,
                dataType: 'json',
                // data: {
                //   category: context.state.category,
                // },
                params: {
                  category,
                  pageNo: newsList.pageNo + 1,
                  pageSize: newsList.pageSize,
                },
              }, {req, res});

              // console.log(list)

              if (type == 'append') {
                context.commit('appendNewsList', {
                  category,
                  newsList: list,
                });
              } else if (type == 'prepend') {
                context.commit('prependNewsList', {
                  category,
                  newsList: list,
                });
              }
            },*/
          },
        },
      },
    });
  },
};
