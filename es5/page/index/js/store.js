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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  namespaced: true,
  state: function state() {
    return {
      categoryList: ['推荐', '娱乐', '生活', '体育', '军事', '科技', '互联网', '国际', '国内', '人文', '汽车', '财经', '房产', '时尚'],
      category: '推荐',
      response: null
    };
  },

  mutations: {
    setResponse: function setResponse(state, data) {
      state.response = data;
    },
    setCategory: function setCategory(state, data) {
      state.category = data;
    }
  },
  actions: {
    fetchResponse: function fetchResponse(context) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          req = _ref.req,
          res = _ref.res;

      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _ajax2.default.send({
                  type: 'get',
                  url: 'http://' + (_runtime2.default.isServer() ? 'localhost' : location.hostname) + ':8100/api/queryNewsList',
                  dataType: 'json',
                  // data: {
                  //   category: context.state.category,
                  // },
                  params: {
                    category: context.state.category
                  }
                }, { req: req, res: res });

              case 2:
                response = _context.sent;


                // console.log(response.data.feedList);

                // let response = require('../json/center.json');

                context.commit('setResponse', response);

                console.log(response);

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};