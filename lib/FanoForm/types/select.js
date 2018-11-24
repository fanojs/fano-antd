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

require("antd/es/select/style");

var _select = _interopRequireDefault(require("antd/es/select"));

var _react = _interopRequireDefault(require("react"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _request = require("../../utils/request");

var _form = require("../../utils/form");

var SelectOption = _select.default.Option;
var OptGroup = _select.default.OptGroup;

var FanoFormSelect =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormSelect, _React$Component);

  function FanoFormSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FanoFormSelect);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormSelect).call(this, props));
    var _props$injectProps$fi = props.injectProps.field.props,
        url = _props$injectProps$fi.url,
        dict = _props$injectProps$fi.dict,
        _props$injectProps$fi2 = _props$injectProps$fi.options,
        options = _props$injectProps$fi2 === void 0 ? [] : _props$injectProps$fi2,
        max = _props$injectProps$fi.max,
        remoteSearch = _props$injectProps$fi.remoteSearch;
    _this.state = {
      url: url,
      dict: dict,
      options: options,
      max: max,
      remoteSearch: remoteSearch,
      plainValues: options.map(function (o) {
        return o.value;
      }),
      transformed: _this.transformProps()
    };
    _this.state.disabledOptions = _this.getDisabledOptions(_this.state.plainValues, _this.props.value);
    _this.state.multi = !!_this.state.transformed.multi;
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.onSearch = _this.onSearch.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(FanoFormSelect, [{
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
    key: "transformProps",
    value: function transformProps() {
      var props = {
        multi: true
      };
      var _this$props$injectPro = this.props.injectProps.field.props,
          max = _this$props$injectPro.max,
          allowCreate = _this$props$injectPro.allowCreate,
          allowInput = _this$props$injectPro.allowInput;

      if (_lodash.default.isNumber(max)) {
        if (max > 1) {
          props.mode = 'multiple';

          if (allowCreate === true) {
            props.mode = 'tags';
          }
        }
      } else {
        props.mode = 'multiple';
      }

      if (allowInput === true) {
        props.showSearch = true;
      }

      props.multi = ['multiple', 'tags'].includes(props.mode);
      return props;
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
    value: function onChange(value, option) {
      this.setState({
        disabledOptions: this.getDisabledOptions(this.state.plainValues, value)
      });
      return this.props.onChange(value, option);
    }
  }, {
    key: "onSearch",
    value: function onSearch(value) {
      this.fetchOptions("".concat(this.state.url, "?").concat(_qs.default.stringify({
        cond: JSON.stringify({
          value: value
        }, null, 0)
      })));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          options = _this$state2.options,
          disabledOptions = _this$state2.disabledOptions,
          transformed = _this$state2.transformed,
          remoteSearch = _this$state2.remoteSearch,
          multi = _this$state2.multi;
      var props = (0, _form.getProps)(this.props, ['placeholder', 'allowClear', 'disabled']);
      Object.assign(props, transformed);
      var children = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var option = _step.value;
          var label = option.label,
              value = option.value,
              groupChildren = option.children;
          var disabled = disabledOptions.indexOf(value) >= 0;

          if (Array.isArray(groupChildren)) {
            var groupItems = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = groupChildren[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;
                groupItems.push(_react.default.createElement(SelectOption, {
                  key: item.value,
                  value: item.value,
                  disabled: disabled
                }, item.label));
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

            children.push(_react.default.createElement(OptGroup, {
              key: label,
              label: label
            }, groupItems));
          } else {
            children.push(_react.default.createElement(SelectOption, {
              key: value,
              value: value,
              disabled: disabled
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

      if (multi === true) {
        props.onChange = this.onChange;
      }

      if (remoteSearch === true) {
        props.onSearch = this.onSearch;
      }

      return _react.default.createElement(_select.default, props, children);
    }
  }]);
  return FanoFormSelect;
}(_react.default.Component);

exports.default = FanoFormSelect;
//# sourceMappingURL=select.js.map