"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = get;
exports.post = post;
exports.put = put;
exports.del = del;
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isomorphicFetch = _interopRequireDefault(require("isomorphic-fetch"));

var _lodash = _interopRequireDefault(require("lodash"));

var TOKEN_KEY = 'token';
/**
 * 底层请求封装
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */

function request(_x, _x2) {
  return _request.apply(this, arguments);
}
/**
 * 常规GET请求
 * @param url
 * @param [opts]
 * @return {Promise}
 */


function _request() {
  _request = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(url, opts) {
    var token, onError, errorHandler, res, data, json;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // 配置加工
            opts = _lodash.default.merge({
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              cache: 'no-cache',
              credentials: 'include'
            }, opts);
            token = window.localStorage.getItem(TOKEN_KEY);

            if (token && !opts.headers.token) {
              opts.headers.token = token;
            }

            onError = _lodash.default.result(opts, 'onError', null);
            delete opts.onError; // 定义异常处理器

            errorHandler =
            /*#__PURE__*/
            function () {
              var _ref = (0, _asyncToGenerator2.default)(
              /*#__PURE__*/
              _regenerator.default.mark(function _callee(errmsg) {
                return _regenerator.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (onError !== null) {
                          if (_lodash.default.isFunction(onError)) {
                            onError(errmsg);
                          }
                        } else {
                          errmsg = errmsg || 'Network error';

                          _message2.default.error(errmsg);
                        }

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              }));

              return function errorHandler(_x3) {
                return _ref.apply(this, arguments);
              };
            }(); // 执行请求


            _context2.next = 8;
            return (0, _isomorphicFetch.default)(url, opts);

          case 8:
            res = _context2.sent;
            data = null;

            if (!(res.status >= 200 && res.status < 300)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 13;
            return res.json();

          case 13:
            json = _context2.sent;

            if (!(json.errcode || json.errmsg)) {
              _context2.next = 20;
              break;
            }

            if (json.errstack) {
              console.error(json.errstack);
            }

            _context2.next = 18;
            return errorHandler(json.errmsg);

          case 18:
            _context2.next = 21;
            break;

          case 20:
            data = _lodash.default.result(json, 'data', json);

          case 21:
            _context2.next = 25;
            break;

          case 23:
            _context2.next = 25;
            return errorHandler();

          case 25:
            return _context2.abrupt("return", data);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _request.apply(this, arguments);
}

function get(url, opts) {
  return request(url, opts);
}
/**
 * 常规POST请求
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */


function post(url, body, opts) {
  return request(url, _lodash.default.merge({
    method: 'POST',
    body: JSON.stringify(body)
  }, opts));
}
/**
 * 常规PUT请求
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */


function put(url, body, opts) {
  return request(url, _lodash.default.merge({
    method: 'PUT',
    body: JSON.stringify(body)
  }, opts));
}
/**
 * 常规DELETE请求
 * @param url
 * @param body
 * @param [opts]
 * @return {Promise}
 */


function del(url, body, opts) {
  return request(url, _lodash.default.merge({
    method: 'DELETE',
    body: JSON.stringify(body)
  }, opts));
}

var _default = request;
exports.default = _default;
//# sourceMappingURL=request.js.map