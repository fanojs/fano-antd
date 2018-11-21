(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'antd/es/radio', 'react', 'qs', 'antd', 'lodash', '../../utils/request', '../../utils/form', 'antd/es/radio/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('antd/es/radio'), require('react'), require('qs'), require('antd'), require('lodash'), require('../../utils/request'), require('../../utils/form'), require('antd/es/radio/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getIterator, global.stringify, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.radio, global.react, global.qs, global.antd, global.lodash, global.request, global.form, global.style);
    global.radio = mod.exports;
  }
})(this, function (exports, _getIterator2, _stringify, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _radio, _react, _qs, _antd, _lodash, _request, _form) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _radio2 = _interopRequireDefault(_radio);

  var _react2 = _interopRequireDefault(_react);

  var _qs2 = _interopRequireDefault(_qs);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var RadioButton = _radio2.default.Button;
  var RadioGroup = _radio2.default.Group;

  var FanoFormRadio = function (_React$Component) {
    (0, _inherits3.default)(FanoFormRadio, _React$Component);

    function FanoFormRadio(props) {
      (0, _classCallCheck3.default)(this, FanoFormRadio);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FanoFormRadio.__proto__ || (0, _getPrototypeOf2.default)(FanoFormRadio)).call(this, props));

      var _props$injectProps$fi = props.injectProps.field.props,
          url = _props$injectProps$fi.url,
          dict = _props$injectProps$fi.dict,
          _props$injectProps$fi2 = _props$injectProps$fi.options,
          options = _props$injectProps$fi2 === undefined ? [] : _props$injectProps$fi2,
          _props$injectProps$fi3 = _props$injectProps$fi.showButtonStyle,
          showButtonStyle = _props$injectProps$fi3 === undefined ? false : _props$injectProps$fi3;

      _this.state = {
        url: url,
        dict: dict,
        options: options,
        showButtonStyle: showButtonStyle
      };
      return _this;
    }

    (0, _createClass3.default)(FanoFormRadio, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        var dictUrl = this.props.injectProps.c.dictUrl;

        if (_lodash2.default.isEmpty(this.state.options)) {
          if (!_lodash2.default.isEmpty(this.state.url)) {
            this.fetchOptions(this.state.url);
          } else if (!_lodash2.default.isEmpty(this.state.dict)) {
            if (_lodash2.default.isEmpty(dictUrl)) {
              throw new Error('Invalid \'dictUrl\'');
            }
            this.fetchOptions(dictUrl + '?' + _qs2.default.stringify({
              cond: (0, _stringify2.default)({ code: this.state.dict }, null, 0)
            }));
          }
        }
      }
    }, {
      key: 'fetchOptions',
      value: function fetchOptions(url) {
        var _this2 = this;

        var beforeFetch = this.props.injectProps.field.props.beforeFetch;

        if (_lodash2.default.isFunction(beforeFetch)) {
          url = beforeFetch(url, this.props.injectProps.field);
        }
        (0, _request.get)(url).then(function (json) {
          if (Array.isArray(_lodash2.default.get(json, 'list'))) {
            _this2.setState({
              options: json.list
            });
          } else {
            throw new Error('Invalid \'url\' format');
          }
        }).catch(function (e) {
          throw e;
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            options = _state.options,
            showButtonStyle = _state.showButtonStyle;

        var props = (0, _form.getProps)(this.props, ['disabled']);
        var children = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;
            var label = option.label,
                value = option.value;

            if (showButtonStyle) {
              children.push(_react2.default.createElement(
                RadioButton,
                { key: value, value: value },
                label
              ));
            } else {
              children.push(_react2.default.createElement(
                _radio2.default,
                { key: value, value: value },
                label
              ));
            }
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

        return _react2.default.createElement(
          RadioGroup,
          props,
          children
        );
      }
    }]);
    return FanoFormRadio;
  }(_react2.default.Component);

  exports.default = FanoFormRadio;
});
//# sourceMappingURL=radio.js.map