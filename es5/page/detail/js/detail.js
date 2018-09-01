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
    news: function news() {
      return this.$route.params.news || {};
    }
  },
  watch: {},
  beforeCreate: function beforeCreate() {},
  created: function created() {},
  mounted: function mounted() {
    var ts = this;

    // ts.$route.params.contents
  },

  methods: {
    numToRem: function numToRem(num) {
      return num / 100 + 'rem';
    }
  },
  filters: {}
};