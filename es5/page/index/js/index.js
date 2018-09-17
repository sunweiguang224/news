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

var _ua = require('ua');

var _ua2 = _interopRequireDefault(_ua);

var _weixin = require('../../../common/js/weixin/weixin.js');

var _weixin2 = _interopRequireDefault(_weixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import console from 'console';


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
              if (store.state.index.newsList[store.state.index.category].list.length) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return store.dispatch('index/getNextPage', { req: req, res: res });

            case 3:
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
      newsListSwiper: null,
      style: {
        titleBarHeight: 40,
        categoryBarHeight: 36
      }
    };
  },

  computed: {},
  watch: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  mounted: function mounted() {
    var ts = this;

    // alert(this.$store.state.global.statusBarHeight);

    // alert(navigator.userAgent)

    // 初始化分类swiper
    this.categoryBarSwiper = new _swiper2.default(this.$refs.categoryBar, {
      slidesPerView: 'auto'
    });

    // 初始化新闻列表swiper
    this.newsListSwiper = new _swiper2.default(this.$refs.newsListSwiper, {
      initialSlide: this.$store.getters['index/categoryIndex'],
      on: {
        // 滚动至category对应列表时，更新category-bar和列表数据
        slideChangeTransitionStart: function slideChangeTransitionStart() {
          // 获取下一个category
          var category = ts.$store.state.index.categoryList[this.activeIndex];

          // 更改category
          ts.$store.commit('index/setCategory', category);

          // 选中的category居中显示
          ts.categoryBarSwiper.slideTo(this.activeIndex - 3);

          // 获取category对应列表的首屏数据
          if (!ts.$store.state.index.newsList[category].list.length) {
            ts.getNextPage();
          }
        }
      }
    });

    // 预加载的js
    setTimeout(function () {
      // 详情页
      import( /* webpackChunkName: "page/detail/js/detail" */'../../detail/detail.vue');
    }, 1000);
  },


  // 客户端首次进入或每次路由切换时触发
  enteredInClient: function enteredInClient() {
    // await weixin.init();

    // weixin.setShareInfo({
    //   title: '首页11',
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
    },
    numToRem: function numToRem(num) {
      return num / 100 + 'rem';
    }
  },
  filters: {}
};