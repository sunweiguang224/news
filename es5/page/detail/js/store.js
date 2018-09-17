'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _ajax = require('ajax');

var _ajax2 = _interopRequireDefault(_ajax);

var _runtime = require('runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  state: function state() {
    return {
      news: null
    };
  },

  mutations: {
    setNews: function setNews(state, data) {
      state.news = data;
    }
  },
  getters: {},
  actions: {
    /**
     * 获取新闻详情
     * @param context
     * @param req
     * @param res
     * @param id
     * @return {Promise.<void>}
     */
    getNews: function getNews(context) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          req = _ref.req,
          res = _ref.res,
          id = _ref.id;

      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var news;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _ajax2.default.send({
                  type: 'get',
                  url: '/api/queryNewsDetail',
                  dataType: 'json',
                  // data: {
                  //   category: context.state.category,
                  // },
                  params: {
                    id: id
                  }
                }, { req: req, res: res });

              case 2:
                news = _context.sent;


                // console.log(news)

                context.commit('setNews', news);

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};