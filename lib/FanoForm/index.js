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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _react = _interopRequireDefault(require("react"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _request = require("../utils/request");

var _DynamicForm = _interopRequireDefault(require("./DynamicForm"));

var _text = _interopRequireDefault(require("./types/text"));

var _hidden = _interopRequireDefault(require("./types/hidden"));

var _digit = _interopRequireDefault(require("./types/digit"));

var _number = _interopRequireDefault(require("./types/number"));

var _radio = _interopRequireDefault(require("./types/radio"));

var _checkbox = _interopRequireDefault(require("./types/checkbox"));

var _password = _interopRequireDefault(require("./types/password"));

var _select = _interopRequireDefault(require("./types/select"));

var _datepicker = _interopRequireDefault(require("./types/datepicker"));

var _monthpicker = _interopRequireDefault(require("./types/monthpicker"));

var _weekpicker = _interopRequireDefault(require("./types/weekpicker"));

var _timepicker = _interopRequireDefault(require("./types/timepicker"));

var _rangepicker = _interopRequireDefault(require("./types/rangepicker"));

var _treeselect = _interopRequireDefault(require("./types/treeselect"));

var _imgbox = _interopRequireDefault(require("./types/imgbox"));

var _reftable = _interopRequireDefault(require("./types/custom/reftable"));

var FanoForm = function FanoForm() {
  (0, _classCallCheck2.default)(this, FanoForm);
};

FanoForm.c = {
  types: {
    text: _text.default,
    password: _password.default,
    hidden: _hidden.default,
    number: _number.default,
    digit: _digit.default,
    radio: _radio.default,
    checkbox: _checkbox.default,
    select: _select.default,
    datepicker: _datepicker.default,
    monthpicker: _monthpicker.default,
    weekpicker: _weekpicker.default,
    timepicker: _timepicker.default,
    rangepicker: _rangepicker.default,
    treeselect: _treeselect.default,
    reftable: _reftable.default,
    imgbox: _imgbox.default
  }
  /**
   * 全局配置
   * @param {*} options 配置项
   */

};

FanoForm.config = function (options) {
  if (_lodash.default.isPlainObject(options)) {
    _lodash.default.merge(FanoForm.c, options);
  } else {
    throw new Error("Invalid options");
  }
};
/**
 * 使用JSON配置生成表单
 * @param {*} json JSON配置
 */


FanoForm.fromJson = function (json) {
  return (
    /*#__PURE__*/
    function (_React$Component) {
      (0, _inherits2.default)(FanoComponent, _React$Component);

      function FanoComponent(props) {
        var _this;

        (0, _classCallCheck2.default)(this, FanoComponent);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoComponent).call(this, props));

        _this.setDefaultValue(json);

        _this.combineExpandProps(json);

        _this.wrappedComponentRef = _this.wrappedComponentRef.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
        return _this;
      }

      (0, _createClass2.default)(FanoComponent, [{
        key: "setDefaultValue",
        value: function setDefaultValue(json) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = json.fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var field = _step.value;
              field.props = field.props || {};
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
        }
      }, {
        key: "getFieldsValue",
        value: function getFieldsValue() {
          return this.formRef.getFieldsValue();
        }
      }, {
        key: "setFieldsValue",
        value: function setFieldsValue(values) {
          return this.formRef.setFieldsValue(values);
        }
      }, {
        key: "setFieldsError",
        value: function setFieldsError(errors) {
          return this.formRef.setFieldsError(errors);
        }
      }, {
        key: "combineExpandProps",
        value: function combineExpandProps(json) {
          var expandProps = this.props.expandProps;

          if (!_lodash.default.isPlainObject(expandProps)) {
            return;
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = json.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var field = _step2.value;
              var expand = expandProps[field.name];

              if (_lodash.default.isPlainObject(expand)) {
                Object.assign(field.props, expand);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }, {
        key: "wrappedComponentRef",
        value: function wrappedComponentRef(inst) {
          this.formRef = inst;
        }
      }, {
        key: "render",
        value: function render() {
          return _react.default.createElement(_DynamicForm.default, (0, _extends2.default)({}, this.props, {
            c: FanoForm.c,
            config: json,
            wrappedComponentRef: this.wrappedComponentRef
          }));
        }
      }]);
      return FanoComponent;
    }(_react.default.Component)
  );
};
/**
 * 通过URL获取配置后再生成表单
 * @param {*} url 配置URL
 */


FanoForm.fromUrl = function (url) {
  if (!_lodash.default.isString(url)) {
    throw new Error("Invalid 'url': ".concat(url));
  }

  (0, _request.get)(url).then(function (json) {
    if (Array.isArray(_lodash.default.get(json, 'list'))) {
      FanoForm.fromJson(json.list);
    } else {
      throw new Error("Invalid 'url' format");
    }
  }).catch(function (e) {
    throw e;
  });
};
/**
 * 通过元数据编码获取配置后再生成表单
 * @param {*} code 元数据编码
 */


FanoForm.fromMeta = function (code) {
  if (!_lodash.default.isString(code)) {
    throw new Error("Invalid code: ".concat(code));
  } else if (!_lodash.default.isString(FanoForm.c.metaUrl)) {
    throw new Error("Invalid 'metaUrl' format");
  }

  (0, _request.get)("".concat(FanoForm.c.metaUrl, "?").concat(_qs.default.stringify({
    code: code
  }))).then(function (json) {
    if (Array.isArray(_lodash.default.get(json, 'list'))) {
      FanoForm.fromJson(json.list);
    } else {
      throw new Error("Invalid 'metaUrl' format");
    }
  }).catch(function (e) {
    throw e;
  });
};
/**
 * 注入自定义的控件类型
 * @param {*} code 类型编码
 * @param {*} fn 类型函数
 */


FanoForm.injectType = function (code, fn) {
  if (_lodash.default.isString(code) && _lodash.default.isFunction(fn)) {
    FanoForm.c.types.code = fn;
    return true;
  }

  return false;
};

var _default = FanoForm;
exports.default = _default;
//# sourceMappingURL=index.js.map