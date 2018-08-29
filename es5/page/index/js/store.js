'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _dvdServiceJsAjax = require('dvd-service-js-ajax');

var _dvdServiceJsAjax2 = _interopRequireDefault(_dvdServiceJsAjax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = {
  namespaced: true,
  state: function state() {
    return {
      response: null
    };
  },

  mutations: {
    setResponse: function setResponse(state, data) {
      state.response = data;
    }
  },
  actions: {
    fetchResponse: function fetchResponse(context, _ref) {
      var _this = this;

      var req = _ref.req,
          res = _ref.res;
      return _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var response;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _dvdServiceJsAjax2.default.send({
                  type: 'post',
                  url: '/api/mg/user/center/newIndex',
                  dataType: 'json',
                  data: {}
                }, { req: req, res: res, debug: false });

              case 2:
                response = _context.sent;


                // console.log(response.data.feedList);

                // let response = require('../json/center.json');

                context.commit('setResponse', response);

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