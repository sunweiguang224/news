'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _vuex = require('vuex');

var _vuex2 = _interopRequireDefault(_vuex);

var _ua = require('ua');

var _ua2 = _interopRequireDefault(_ua);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

/**
 * 基础设置
 * @param setting
 * @return {*}
 */
function createCommonSetting(setting) {

  // setting属性覆盖
  setting = _extends({

    // 页面切换动画
    namespaced: true

  }, setting);

  // setting.state属性覆盖
  var originalState = setting.state;
  setting.state = function () {
    return _extends({

      // 页面切换动画
      pageSwitchClassPrefix: 'history'

    }, originalState());
  };

  // setting.state属性覆盖
  setting.mutations = _extends({

    // 页面切换动画
    setPageSwitchClassPrefix: function setPageSwitchClassPrefix(state, data) {
      state.pageSwitchClassPrefix = data;
    }
  }, setting.mutations);

  return setting;
}

exports.default = {
  create: function create(_ref) {
    var req = _ref.req,
        res = _ref.res;

    return new _vuex2.default.Store({
      modules: {
        index: createCommonSetting(require('./index/js/store.js').default),
        detail: createCommonSetting(require('./detail/js/store.js').default),
        global: {
          namespaced: true,
          state: function state() {
            return {
              statusBarHeight: function () {
                var statusBarHeight = _ua2.default.getStatusBarHeight(req && req.headers && req.headers['user-agent']);
                statusBarHeight = statusBarHeight && Number(statusBarHeight) != NaN ? Number(statusBarHeight) : 0;
                return statusBarHeight;
              }()
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