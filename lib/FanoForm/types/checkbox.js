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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

var _react = _interopRequireDefault(require("react"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _request = require("../../utils/request");

var _form = require("../../utils/form");

var CheckboxGroup = _checkbox.default.Group;

var FanoFormCheckbox =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormCheckbox, _React$Component);

  function FanoFormCheckbox(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FanoFormCheckbox);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormCheckbox).call(this, props));
    var _props$injectProps$fi = props.injectProps.field.props,
        url = _props$injectProps$fi.url,
        dict = _props$injectProps$fi.dict,
        _props$injectProps$fi2 = _props$injectProps$fi.options,
        options = _props$injectProps$fi2 === void 0 ? [] : _props$injectProps$fi2,
        max = _props$injectProps$fi.max;
    _this.state = {
      url: url,
      dict: dict,
      options: options,
      max: max,
      multi: true,
      plainValues: options.map(function (o) {
        return o.value;
      })
    };
    _this.state.disabledOptions = _this.getDisabledOptions(_this.state.plainValues, _this.props.value);
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(FanoFormCheckbox, [{
    key: "getDisabledOptions",
    value: function getDisabledOptions(plainValues, value) {
      var _this$state = this.state,
          max = _this$state.max,
          multi = _this$state.multi;

      if (multi === true) {
        var disabledOptions = [];

        if (_lodash.default.isNumber(max) && value.length >= max) {
          if (value.length > max) {
            value = this.props.value;
          }

          disabledOptions = _lodash.default.difference(plainValues, value);
        }

        return disabledOptions;
      }

      return this.state.disabledOptions || [];
    }
  }, {
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
          var state = {
            options: json.list,
            plainValues: json.list.map(function (o) {
              return o.value;
            })
          };
          state.disabledOptions = _this2.getDisabledOptions(state.plainValues, _this2.props.value);

          _this2.setState(state);
        } else {
          throw new Error("Invalid 'url' format");
        }
      }).catch(function (e) {
        throw e;
      });
    }
  }, {
    key: "onChange",
    value: function onChange(value) {
      this.setState({
        disabledOptions: this.getDisabledOptions(this.state.plainValues, value)
      });
      return this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          options = _this$state2.options,
          disabledOptions = _this$state2.disabledOptions;
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
          var disabled = disabledOptions.indexOf(value) >= 0;
          children.push(_react.default.createElement(_checkbox.default, {
            key: value,
            value: value,
            disabled: disabled
          }, label));
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

      props.onChange = this.onChange;
      return _react.default.createElement(CheckboxGroup, props, children);
    }
  }]);
  return FanoFormCheckbox;
}(_react.default.Component);

exports.default = FanoFormCheckbox;
//# sourceMappingURL=checkbox.js.map