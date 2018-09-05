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
  namespaced: true,
  state: function state() {
    return {
      categoryList: ['推荐', '娱乐', '生活', '体育', '军事', '科技', '互联网', '国际', '国内', '人文', '汽车', '财经', '房产', '时尚'],
      newsList: {
        '推荐': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '娱乐': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '生活': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '体育': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '军事': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '科技': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '互联网': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '国际': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '国内': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '人文': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '汽车': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '财经': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '房产': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        },
        '时尚': {
          list: [],
          pageNo: 0,
          pageSize: 10,
          isOver: false
        }
      },
      category: '推荐'
    };
  },

  mutations: {
    setCategory: function setCategory(state, data) {
      state.category = data;
    },
    prependNewsList: function prependNewsList(state, data) {
      var newNewsList = JSON.parse(JSON.stringify(state.newsList[data.category]));
      newNewsList.list = data.newsList.concat(newNewsList.list);
      newNewsList.pageNo += 1;
      newNewsList.isOver += false;
      state.newsList[data.category] = newNewsList;
    },
    appendNewsList: function appendNewsList(state, data) {
      var newNewsList = JSON.parse(JSON.stringify(state.newsList[data.category]));
      newNewsList.list = newNewsList.list.concat(data.newsList);
      newNewsList.pageNo += 1;
      newNewsList.isOver += false;
      state.newsList[data.category] = newNewsList;
    }
  },
  getters: {
    categoryIndex: function categoryIndex(state) {
      for (var i in state.categoryList) {
        if (state.category === state.categoryList[i]) {
          return i;
        }
      }
      return 0;
    }
  },
  actions: {
    getNextPage: function getNextPage(context) {
      var _this = this;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          req = _ref.req,
          res = _ref.res,
          _ref$type = _ref.type,
          type = _ref$type === undefined ? 'append' : _ref$type;

      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var category, newsList, list;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                category = context.state.category;
                newsList = context.state.newsList[category];
                _context.next = 4;
                return _ajax2.default.send({
                  type: 'get',
                  url: '/api/queryNewsList',
                  dataType: 'json',
                  // data: {
                  //   category: context.state.category,
                  // },
                  params: {
                    category: category,
                    pageNo: newsList.pageNo + 1,
                    pageSize: newsList.pageSize
                  }
                }, { req: req, res: res });

              case 4:
                list = _context.sent;


                // console.log(list)

                if (type == 'append') {
                  context.commit('appendNewsList', {
                    category: category,
                    newsList: list
                  });
                } else if (type == 'prepend') {
                  context.commit('prependNewsList', {
                    category: category,
                    newsList: list
                  });
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }
};