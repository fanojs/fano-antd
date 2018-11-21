(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/extends', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/classCallCheck', 'react', 'qs', 'lodash', '../utils/request', './DynamicTable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/extends'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/object/keys'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/classCallCheck'), require('react'), require('qs'), require('lodash'), require('../utils/request'), require('./DynamicTable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.getIterator, global.keys, global.getPrototypeOf, global.createClass, global.possibleConstructorReturn, global.inherits, global.classCallCheck, global.react, global.qs, global.lodash, global.request, global.DynamicTable);
    global.index = mod.exports;
  }
})(this, function (exports, _extends2, _getIterator2, _keys, _getPrototypeOf, _createClass2, _possibleConstructorReturn2, _inherits2, _classCallCheck2, _react, _qs, _lodash, _request, _DynamicTable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends3 = _interopRequireDefault(_extends2);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _keys2 = _interopRequireDefault(_keys);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _react2 = _interopRequireDefault(_react);

  var _qs2 = _interopRequireDefault(_qs);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _DynamicTable2 = _interopRequireDefault(_DynamicTable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  if (!_lodash2.default.isFunction(window.L)) {
    window.L = function (key, value) {
      return value || key;
    };
  }

  /**
   * 表格组件
   */

  var FanoTable = function FanoTable() {
    (0, _classCallCheck3.default)(this, FanoTable);
  };

  FanoTable.c = {};

  /**
   * 全局配置
   * @param {*} options 配置项
   */
  FanoTable.config = function (options) {
    if (_lodash2.default.isPlainObject(options)) {
      _lodash2.default.merge(FanoTable.c, options);
    } else {
      throw new Error('Invalid options');
    }
  };

  /**
   * 使用JSON配置生成表格
   * @param {*} json JSON配置
   */
  FanoTable.fromJson = function (json) {
    return function (_React$Component) {
      (0, _inherits3.default)(FanoComponent, _React$Component);

      function FanoComponent(props) {
        (0, _classCallCheck3.default)(this, FanoComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FanoComponent.__proto__ || (0, _getPrototypeOf2.default)(FanoComponent)).call(this, props));

        _this.combineExpandProps(json);
        return _this;
      }

      (0, _createClass3.default)(FanoComponent, [{
        key: 'combineExpandProps',
        value: function combineExpandProps(json) {
          var columnExpand = this.props.columnExpand;

          if (!_lodash2.default.isPlainObject(columnExpand)) {
            return;
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(json.columns), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var column = _step.value;

              var expand = columnExpand[column.dataIndex];
              if (_lodash2.default.isPlainObject(expand)) {
                _lodash2.default.merge(column, expand);
              }
              delete columnExpand[column.dataIndex];
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if ((0, _keys2.default)(columnExpand).length > 0) {
            for (var dataIndex in columnExpand) {
              var value = columnExpand[dataIndex];
              value.dataIndex = dataIndex;
              json.columns.push(_lodash2.default.cloneDeep(value));
            }
          }
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(_DynamicTable2.default, (0, _extends3.default)({}, this.props, {
            c: FanoTable.c,
            config: json
          }));
        }
      }]);
      return FanoComponent;
    }(_react2.default.Component);
  };

  /**
   * 通过URL获取配置后再生成表格
   * @param {*} url 配置URL
   */
  FanoTable.fromUrl = function (url) {
    if (!_lodash2.default.isString(url)) {
      throw new Error('Invalid \'url\': ' + url);
    }
    (0, _request.get)(url).then(function (json) {
      if (Array.isArray(_lodash2.default.get(json, 'list'))) {
        FanoTable.fromJson(json.list);
      } else {
        throw new Error('Invalid \'url\' format');
      }
    }).catch(function (e) {
      throw e;
    });
  };

  /**
   * 通过元数据编码获取配置后再生成表格
   * @param {*} code 元数据编码
   */
  FanoTable.fromMeta = function (code) {
    if (!_lodash2.default.isString(code)) {
      throw new Error('Invalid code: ' + code);
    } else if (!_lodash2.default.isString(FanoTable.c.metaUrl)) {
      throw new Error('Invalid \'metaUrl\' format');
    }
    (0, _request.get)(FanoTable.c.metaUrl + '?' + _qs2.default.stringify({ code: code })).then(function (json) {
      if (Array.isArray(_lodash2.default.get(json, 'list'))) {
        FanoTable.fromJson(json.list);
      } else {
        throw new Error('Invalid \'metaUrl\' format');
      }
    }).catch(function (e) {
      throw e;
    });
  };

  exports.default = FanoTable;
});
//# sourceMappingURL=index.js.map