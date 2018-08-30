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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  asyncData: function asyncData(_ref) {
    var _this = this;

    var store = _ref.store,
        req = _ref.req,
        res = _ref.res;
    return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(_runtime2.default.isClient() && store.state.center.response)) {
                _context.next = 4;
                break;
              }

              store.dispatch('index/getNextPage', { req: req, res: res });
              _context.next = 6;
              break;

            case 4:
              _context.next = 6;
              return store.dispatch('index/getNextPage', { req: req, res: res });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }))();
  },

  components: {
    'dvd-service-com-paging-list': require('../../../common/com/dvd-service-com-paging-list/dvd-service-com-paging-list.vue').default
  },
  props: {},
  data: function data() {
    return {
      window: window,
      document: document,
      location: location,

      // 工具模块
      date: _date2.default,

      // 页面内部状态
      categoryBarSwiper: null,
      newsListSwiper: null
    };
  },

  computed: {},
  watch: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  mounted: function mounted() {
    var ts = this;

    // 初始化分类swiper
    this.categoryBarSwiper = new _swiper2.default(this.$refs.categoryBar, {
      slidesPerView: 'auto'
    });

    // setTimeout(() => {
    // 初始化新闻列表swiper
    this.newsListSwiper = new _swiper2.default(this.$refs.newsListSwiper, {
      initialSlide: this.$store.getters['index/categoryIndex'],
      on: {
        slideChangeTransitionEnd: function slideChangeTransitionEnd() {
          var category = ts.$store.state.index.categoryList[this.activeIndex];
          ts.changeCategoryTo(category);
        }
      }
    });
    // }, 3000);

    // debugger
  },

  methods: {
    changeCategoryTo: function changeCategoryTo(category) {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // 更改category
                _this2.$store.commit('index/setCategory', category);

                // 新闻列表切换到category对应的列表
                _this2.newsListSwiper.slideTo(_this2.$store.getters['index/categoryIndex']);

                // category对应的列表如果空的，获取数据，然后更新分页swiper
                if (!_this2.$store.state.index.newsList[category].length) {
                  _this2.getNextPage();
                }

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    },
    getNextPage: function getNextPage() {
      var _this3 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          cb = _ref2.cb,
          type = _ref2.type;

      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _this3.$store.dispatch('index/getNextPage', {
                  type: type
                });

              case 2:
                _this3.$refs.newsList[_this3.$store.getters['index/categoryIndex']].swiper.update();
                if (cb) {
                  cb();
                }

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  },
  filters: {}
};