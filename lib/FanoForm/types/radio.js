"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

var _react = _interopRequireDefault(require("react"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _request = require("../../utils/request");

var _form = require("../../utils/form");

var RadioButton = _radio.default.Button;
var RadioGroup = _radio.default.Group;

var FanoFormRadio =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormRadio, _React$Component);

  function FanoFormRadio(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FanoFormRadio);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormRadio).call(this, props));
    var _props$injectProps$fi = props.injectProps.field.props,
        url = _props$injectProps$fi.url,
        dict = _props$injectProps$fi.dict,
        _props$injectProps$fi2 = _props$injectProps$fi.options,
        options = _props$injectProps$fi2 === void 0 ? [] : _props$injectProps$fi2,
        _props$injectProps$fi3 = _props$injectProps$fi.showButtonStyle,
        showButtonStyle = _props$injectProps$fi3 === void 0 ? false : _props$injectProps$fi3;
    _this.state = {
      url: url,
      dict: dict,
      options: options,
      showButtonStyle: showButtonStyle
    };
    return _this;
  }

  (0, _createClass2.default)(FanoFormRadio, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var dictUrl = this.props.injectProps.c.dictUrl;

      if (_lodash.default.isEmpty(this.state.options)) {
        if (!_lodash.default.isEmpty(this.state.url)) {
          this.fetchOptions(this.state.url);
        } else if (!_lodash.default.isEmpty(this.state.dict)) {
          if (_lodash.default.isEmpty(dictUrl)) {
            throw new Error("Invalid 'dictUrl'");
          }

          this.fetchOptions("".concat(dictUrl, "?").concat(_qs.default.stringify({
            cond: JSON.stringify({
              code: this.state.dict
            }, null, 0)
          })));
        }
      }
    }
  }, {
    key: "fetchOptions",
    value: function fetchOptions(url) {
      var _this2 = this;

      var beforeFetch = this.props.injectProps.field.props.beforeFetch;

      if (_lodash.default.isFunction(beforeFetch)) {
        url = beforeFetch(url, this.props.injectProps.field);
      }

      (0, _request.get)(url).then(function (json) {
        if (Array.isArray(_lodash.default.get(json, 'list'))) {
          _this2.setState({
            options: json.list
          });
        } else {
          throw new Error("Invalid 'url' format");
        }
      }).catch(function (e) {
        throw e;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          options = _this$state.options,
          showButtonStyle = _this$state.showButtonStyle;
      var props = (0, _form.getProps)(this.props, ['disabled']);
      var children = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var option = _step.value;
          var label = option.label,
              value = option.value;

          if (showButtonStyle) {
            children.push(_react.default.createElement(RadioButton, {
              key: value,
              value: value
            }, label));
          } else {
            children.push(_react.default.createElement(_radio.default, {
              key: value,
              value: value
            }, label));
          }
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

      return _react.default.createElement(RadioGroup, props, children);
    }
  }]);
  return FanoFormRadio;
}(_react.default.Component);

exports.default = FanoFormRadio;
//# sourceMappingURL=radio.js.map