(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/json/stringify', 'babel-runtime/regenerator', 'antd/es/message', 'babel-runtime/helpers/asyncToGenerator', 'isomorphic-fetch', 'antd', 'lodash', 'antd/es/message/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/json/stringify'), require('babel-runtime/regenerator'), require('antd/es/message'), require('babel-runtime/helpers/asyncToGenerator'), require('isomorphic-fetch'), require('antd'), require('lodash'), require('antd/es/message/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.stringify, global.regenerator, global.message, global.asyncToGenerator, global.isomorphicFetch, global.antd, global.lodash, global.style);
    global.request = mod.exports;
  }
})(this, function (exports, _stringify, _regenerator, _message2, _asyncToGenerator2, _isomorphicFetch, _antd, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.get = get;
  exports.post = post;
  exports.put = put;
  exports.del = del;

  var _stringify2 = _interopRequireDefault(_stringify);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _message3 = _interopRequireDefault(_message2);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var TOKEN_KEY = 'token';

  /**
   * 底层请求封装
   * @param url
   * @param body
   * @param [opts]
   * @return {Promise}
   */

  var request = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url, opts) {
      var _this = this;

      var token, onError, errorHandler, res, data, json;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 配置加工
              opts = _lodash2.default.merge({
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
              onError = _lodash2.default.result(opts, 'onError', null);

              delete opts.onError;

              // 定义异常处理器

              errorHandler = function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(errmsg) {
                  return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (onError !== null) {
                            if (_lodash2.default.isFunction(onError)) {
                              onError(errmsg);
                            }
                          } else {
                            errmsg = errmsg || 'Network error';
                            _message3.default.error(errmsg);
                          }

                        case 1:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                }));

                return function errorHandler(_x3) {
                  return _ref2.apply(this, arguments);
                };
              }();

              // 执行请求


              _context2.next = 8;
              return (0, _isomorphicFetch2.default)(url, opts);

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
              data = _lodash2.default.result(json, 'data', json);

            case 21:
              _context2.next = 25;
              break;

            case 23:
              _context2.next = 25;
              return errorHandler();

            case 25:
              return _context2.abrupt('return', data);

            case 26:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    return function request(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  /**
   * 常规GET请求
   * @param url
   * @param [opts]
   * @return {Promise}
   */
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
    return request(url, _lodash2.default.merge({
      method: 'POST',
      body: (0, _stringify2.default)(body)
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
    return request(url, _lodash2.default.merge({
      method: 'PUT',
      body: (0, _stringify2.default)(body)
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
    return request(url, _lodash2.default.merge({
      method: 'DELETE',
      body: (0, _stringify2.default)(body)
    }, opts));
  }

  exports.default = request;
});
//# sourceMappingURL=request.js.map