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

              store.dispatch('index/fetchResponse', { req: req, res: res });
              _context.next = 6;
              break;

            case 4:
              _context.next = 6;
              return store.dispatch('index/fetchResponse', { req: req, res: res });

            case 6:
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

      date: _date2.default
    };
  },

  computed: {},
  watch: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  mounted: function mounted() {
    new _swiper2.default(this.$refs.categoryBar, {
      slidesPerView: 'auto'
      // spaceBetween: 0,
      // centeredSlides: true,
    });
  },

  methods: {},
  filters: {}
};