"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _react = _interopRequireDefault(require("react"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _request = require("../utils/request");

var _DynamicTable = _interopRequireDefault(require("./DynamicTable"));

if (!_lodash.default.isFunction(window.L)) {
  window.L = function (key, value) {
    return value || key;
  };
}
/**
 * 表格组件
 */


var FanoTable = function FanoTable() {
  (0, _classCallCheck2.default)(this, FanoTable);
};

FanoTable.c = {};
/**
 * 全局配置
 * @param {*} options 配置项
 */

FanoTable.config = function (options) {
  if (_lodash.default.isPlainObject(options)) {
    _lodash.default.merge(FanoTable.c, options);
  } else {
    throw new Error("Invalid options");
  }
};
/**
 * 使用JSON配置生成表格
 * @param {*} json JSON配置
 */


FanoTable.fromJson = function (json) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(FanoComponent, _React$Component);

      function FanoComponent(props) {
        var _this;

        (0, _classCallCheck2.default)(this, FanoComponent);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoComponent).call(this, props));

        _this.combineExpandProps(json);

        return _this;
      }

      (0, _createClass2.default)(FanoComponent, [{
        key: "combineExpandProps",
        value: function combineExpandProps(json) {
          var columnExpand = this.props.columnExpand;

          if (!_lodash.default.isPlainObject(columnExpand)) {
            return;
          }

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = json.columns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var column = _step.value;
              var expand = columnExpand[column.dataIndex];

              if (_lodash.default.isPlainObject(expand)) {
                _lodash.default.merge(column, expand);
              }

              delete columnExpand[column.dataIndex];
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          if (Object.keys(columnExpand).length > 0) {
            for (var dataIndex in columnExpand) {
              var value = columnExpand[dataIndex];
              value.dataIndex = dataIndex;
              json.columns.push(_lodash.default.cloneDeep(value));
            }
          }
        }
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(_DynamicTable.default, (0, _extends2.default)({}, this.props, {
            c: FanoTable.c,
            config: json
          }));
        }
      }]);
      return FanoComponent;
    }(_react.default.Component)
  );
};
/**
 * 通过URL获取配置后再生成表格
 * @param {*} url 配置URL
 */


FanoTable.fromUrl = function (url) {
  if (!_lodash.default.isString(url)) {
    throw new Error("Invalid 'url': ".concat(url));
  }

  (0, _request.get)(url).then(function (json) {
    if (Array.isArray(_lodash.default.get(json, 'list'))) {
      FanoTable.fromJson(json.list);
    } else {
      throw new Error("Invalid 'url' format");
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
  if (!_lodash.default.isString(code)) {
    throw new Error("Invalid code: ".concat(code));
  } else if (!_lodash.default.isString(FanoTable.c.metaUrl)) {
    throw new Error("Invalid 'metaUrl' format");
  }

  (0, _request.get)("".concat(FanoTable.c.metaUrl, "?").concat(_qs.default.stringify({
    code: code
  }))).then(function (json) {
    if (Array.isArray(_lodash.default.get(json, 'list'))) {
      FanoTable.fromJson(json.list);
    } else {
      throw new Error("Invalid 'metaUrl' format");
    }
  }).catch(function (e) {
    throw e;
  });
};

var _default = FanoTable;
exports.default = _default;
//# sourceMappingURL=index.js.map