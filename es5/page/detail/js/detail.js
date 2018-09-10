'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _swiper = require('swiper');

var _swiper2 = _interopRequireDefault(_swiper);

var _runtime = require('runtime');

var _runtime2 = _interopRequireDefault(_runtime);

var _date = require('date');

var _date2 = _interopRequireDefault(_date);

var _weixin = require('../../../common/js/weixin/weixin.js');

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  asyncData: function asyncData(_ref) {
    var _this = this;

    var route = _ref.route,
        store = _ref.store,
        req = _ref.req,
        res = _ref.res;
    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!route.params.news) {
                _context.next = 4;
                break;
              }

              store.commit('detail/setNews', route.params.news);
              _context.next = 6;
              break;

            case 4:
              _context.next = 6;
              return store.dispatch('detail/getNews', { req: req, res: res, id: route.query.id });

            case 6:

              route.meta.title = store.state.detail.news.title;

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  components: {},
  props: {},
  data: function data() {
    return {
      window: window,
      document: document,
      location: location,

      // 工具模块
      date: _date2.default

      // 页面内部状态
    };
  },

  computed: {
    // news() {
    //   return this.$route.params.news || {};
    // },
  },
  watch: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  mounted: function mounted() {
    var ts = this;

    // ts.$route.params.contents
  },


  // 客户端首次进入或每次路由切换时触发
  enteredInClient: function enteredInClient() {
    // await weixin.init();

    // weixin.setShareInfo({
    //   title: '新闻详情页',
    // });

    var _this2 = this;

    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }))();
  },


  methods: {
    numToRem: function numToRem(num) {
      return num / 100 + 'rem';
    }
  },
  filters: {}
};