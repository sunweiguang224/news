'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _ua = require('ua');

var _ua2 = _interopRequireDefault(_ua);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

exports.default = {
  create: function create(_ref) {
    var req = _ref.req,
        res = _ref.res;

    return new _vuex2.default.Store({
      modules: {
        index: require('./index/js/store.js').default,
        detail: require('./detail/js/store.js').default,
        global: {
          namespaced: true,
          state: function state() {
            return {
              statusBarHeight: _ua2.default.getStatusBarHeight(req && req.headers && req.headers['user-agent']) || 20
            };
          },

          mutations: {
            setStatusBarHeight: function setStatusBarHeight(state, data) {
              state.statusBarHeight = data;
            }
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
          }
        }
      }
    });
  }
};