(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'antd/es/select', 'react', 'qs', 'antd', 'lodash', '../../utils/request', '../../utils/form', 'antd/es/select/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('antd/es/select'), require('react'), require('qs'), require('antd'), require('lodash'), require('../../utils/request'), require('../../utils/form'), require('antd/es/select/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getIterator, global.assign, global.stringify, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.select, global.react, global.qs, global.antd, global.lodash, global.request, global.form, global.style);
    global.select = mod.exports;
  }
})(this, function (exports, _getIterator2, _assign, _stringify, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _select, _react, _qs, _antd, _lodash, _request, _form) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _assign2 = _interopRequireDefault(_assign);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _select2 = _interopRequireDefault(_select);

  var _react2 = _interopRequireDefault(_react);

  var _qs2 = _interopRequireDefault(_qs);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var SelectOption = _select2.default.Option;
  var OptGroup = _select2.default.OptGroup;

  var FanoFormSelect = function (_React$Component) {
    (0, _inherits3.default)(FanoFormSelect, _React$Component);

    function FanoFormSelect(props) {
      (0, _classCallCheck3.default)(this, FanoFormSelect);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FanoFormSelect.__proto__ || (0, _getPrototypeOf2.default)(FanoFormSelect)).call(this, props));

      var _props$injectProps$fi = props.injectProps.field.props,
          url = _props$injectProps$fi.url,
          dict = _props$injectProps$fi.dict,
          _props$injectProps$fi2 = _props$injectProps$fi.options,
          options = _props$injectProps$fi2 === undefined ? [] : _props$injectProps$fi2,
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
      _this.onChange = _this.onChange.bind(_this);
      _this.onSearch = _this.onSearch.bind(_this);
      return _this;
    }

    (0, _createClass3.default)(FanoFormSelect, [{
      key: 'getDisabledOptions',
      value: function getDisabledOptions(plainValues, value) {
        var _state = this.state,
            max = _state.max,
            multi = _state.multi;

        if (multi === true) {
          var disabledOptions = [];
          if (_lodash2.default.isNumber(max) && value.length >= max) {
            if (value.length > max) {
              value = this.props.value;
            }
            disabledOptions = _lodash2.default.difference(plainValues, value);
          }
          return disabledOptions;
        }
        return this.state.disabledOptions || [];
      }
    }, {
      key: 'transformProps',
      value: function transformProps() {
        var props = { multi: true };
        var _props$injectProps$fi3 = this.props.injectProps.field.props,
            max = _props$injectProps$fi3.max,
            allowCreate = _props$injectProps$fi3.allowCreate,
            allowInput = _props$injectProps$fi3.allowInput;

        if (_lodash2.default.isNumber(max)) {
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
            var state = {
              options: json.list,
              plainValues: json.list.map(function (o) {
                return o.value;
              })
            };
            state.disabledOptions = _this2.getDisabledOptions(state.plainValues, _this2.props.value);
            _this2.setState(state);
          } else {
            throw new Error('Invalid \'url\' format');
          }
        }).catch(function (e) {
          throw e;
        });
      }
    }, {
      key: 'onChange',
      value: function onChange(value, option) {
        this.setState({ disabledOptions: this.getDisabledOptions(this.state.plainValues, value) });
        return this.props.onChange(value, option);
      }
    }, {
      key: 'onSearch',
      value: function onSearch(value) {
        this.fetchOptions(this.state.url + '?' + _qs2.default.stringify({
          cond: (0, _stringify2.default)({ value: value }, null, 0)
        }));
      }
    }, {
      key: 'render',
      value: function render() {
        var _state2 = this.state,
            options = _state2.options,
            disabledOptions = _state2.disabledOptions,
            transformed = _state2.transformed,
            remoteSearch = _state2.remoteSearch,
            multi = _state2.multi;

        var props = (0, _form.getProps)(this.props, ['placeholder', 'allowClear', 'disabled']);
        (0, _assign2.default)(props, transformed);
        var children = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(options), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
                for (var _iterator2 = (0, _getIterator3.default)(groupChildren), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var item = _step2.value;

                  groupItems.push(_react2.default.createElement(
                    SelectOption,
                    { key: item.value, value: item.value, disabled: disabled },
                    item.label
                  ));
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }

              children.push(_react2.default.createElement(
                OptGroup,
                { key: label, label: label },
                groupItems
              ));
            } else {
              children.push(_react2.default.createElement(
                SelectOption,
                { key: value, value: value, disabled: disabled },
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

        if (multi === true) {
          props.onChange = this.onChange;
        }
        if (remoteSearch === true) {
          props.onSearch = this.onSearch;
        }
        return _react2.default.createElement(
          _select2.default,
          props,
          children
        );
      }
    }]);
    return FanoFormSelect;
  }(_react2.default.Component);

  exports.default = FanoFormSelect;
});
//# sourceMappingURL=select.js.map