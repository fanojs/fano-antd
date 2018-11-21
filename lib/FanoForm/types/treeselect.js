(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/json/stringify', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'antd/es/tree-select', 'react', 'qs', 'antd', 'lodash', 'array-to-tree', '../../utils/request', '../../utils/form', 'antd/es/tree-select/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/json/stringify'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('antd/es/tree-select'), require('react'), require('qs'), require('antd'), require('lodash'), require('array-to-tree'), require('../../utils/request'), require('../../utils/form'), require('antd/es/tree-select/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assign, global.stringify, global.getIterator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.treeSelect, global.react, global.qs, global.antd, global.lodash, global.arrayToTree, global.request, global.form, global.style);
    global.treeselect = mod.exports;
  }
})(this, function (exports, _assign, _stringify, _getIterator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _treeSelect, _react, _qs, _antd, _lodash, _arrayToTree, _request, _form) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _assign2 = _interopRequireDefault(_assign);

  var _stringify2 = _interopRequireDefault(_stringify);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _treeSelect2 = _interopRequireDefault(_treeSelect);

  var _react2 = _interopRequireDefault(_react);

  var _qs2 = _interopRequireDefault(_qs);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _arrayToTree2 = _interopRequireDefault(_arrayToTree);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var TreeNode = _treeSelect2.default.TreeNode;

  var FanoFormTreeSelect = function (_React$Component) {
    (0, _inherits3.default)(FanoFormTreeSelect, _React$Component);

    function FanoFormTreeSelect(props) {
      (0, _classCallCheck3.default)(this, FanoFormTreeSelect);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FanoFormTreeSelect.__proto__ || (0, _getPrototypeOf2.default)(FanoFormTreeSelect)).call(this, props));

      var _props$injectProps$fi = props.injectProps.field.props,
          url = _props$injectProps$fi.url,
          dict = _props$injectProps$fi.dict,
          max = _props$injectProps$fi.max,
          simpleMode = _props$injectProps$fi.simpleMode;
      var _props$injectProps$fi2 = props.injectProps.field.props.treeData,
          treeData = _props$injectProps$fi2 === undefined ? [] : _props$injectProps$fi2;

      if (simpleMode) {
        _this.transformKeysMap(treeData, simpleMode);
        treeData = _this.transformSimpleData(treeData);
      }
      _this.state = {
        url: url,
        dict: dict,
        treeData: treeData,
        simpleMode: simpleMode,
        max: max,
        plainValues: _this.getPlainValues(treeData),
        transformed: _this.transformProps()
      };
      _this.state.disabledOptions = _this.getDisabledOptions(_this.state.plainValues, _this.props.value);
      _this.state.multi = !!_this.state.transformed.multi;
      _this.onChange = _this.onChange.bind(_this);
      return _this;
    }

    (0, _createClass3.default)(FanoFormTreeSelect, [{
      key: 'getPlainValues',
      value: function getPlainValues(treeData) {
        var recursive = function recursive(container, values) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(values), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var item = _step.value;

              container.push(item.value);
              if (Array.isArray(item.children)) {
                recursive(container, item.children);
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
        };

        var plainValues = [];
        recursive(plainValues, treeData);
        plainValues = _lodash2.default.uniq(plainValues);
        return plainValues;
      }
    }, {
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
        var props = {};
        var _props$injectProps$fi3 = this.props.injectProps.field.props,
            max = _props$injectProps$fi3.max,
            allowInput = _props$injectProps$fi3.allowInput,
            expandAll = _props$injectProps$fi3.expandAll,
            _props$injectProps$fi4 = _props$injectProps$fi3.ignoreCase,
            ignoreCase = _props$injectProps$fi4 === undefined ? true : _props$injectProps$fi4;

        if (_lodash2.default.isNumber(max)) {
          if (max > 1) {
            props.treeCheckable = true;
          }
        }
        if (allowInput === true) {
          props.showSearch = true;
        }
        if (expandAll === true) {
          props.treeDefaultExpandAll = true;
        }
        props.multi = !!props.treeCheckable;
        props.filterTreeNode = function (inputValue, treeNode) {
          return new RegExp(inputValue, ignoreCase === true ? 'mi' : 'm').test(treeNode.props.title);
        };
        return props;
      }
    }, {
      key: 'transformSimpleData',
      value: function transformSimpleData(treeData) {
        if (_lodash2.default.isEmpty(treeData)) {
          return treeData;
        }
        var tree = (0, _arrayToTree2.default)(treeData, {
          customID: 'value',
          parentProperty: 'pid',
          childrenProperty: 'children'
        });
        return tree;
      }
    }, {
      key: 'transformKeysMap',
      value: function transformKeysMap(treeData, keysMap) {
        if (!_lodash2.default.isPlainObject(keysMap)) {
          return;
        }
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = (0, _getIterator3.default)(treeData), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            item.title = item[keysMap.titleKey];
            item.value = item[keysMap.valueKey];
            item.pid = item[keysMap.pidKey];
            delete item[keysMap.titleKey];
            delete item[keysMap.valueKey];
            delete item[keysMap.pidKey];
            if (Array.isArray(item.children)) {
              this.transformKeysMap(item.children, keysMap);
            }
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
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var dictUrl = this.props.injectProps.c.dictUrl;

        if (_lodash2.default.isEmpty(this.state.treeData)) {
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
              treeData: json.list,
              plainValues: _this2.getPlainValues(json.list)
            };
            if (_this2.state.simpleMode) {
              _this2.transformKeysMap(state.treeData, _this2.state.simpleMode);
              state.treeData = _this2.transformSimpleData(state.treeData);
            }
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
      value: function onChange(value) {
        this.setState({ disabledOptions: this.getDisabledOptions(this.state.plainValues, value) });
        return this.props.onChange(value);
      }
    }, {
      key: 'renderTreeData',
      value: function renderTreeData(values) {
        var disabledOptions = this.state.disabledOptions;

        var array = [];
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = (0, _getIterator3.default)(values), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var item = _step3.value;

            item.key = item.value;
            item.disabled = disabledOptions.indexOf(item.value) >= 0;
            item.disableCheckbox = item.disabled;
            var props = _lodash2.default.pick(item, ['key', 'title', 'value', 'disableCheckbox', 'disabled', 'isLeaf']);
            if (Array.isArray(item.children)) {
              array.push(_react2.default.createElement(
                TreeNode,
                props,
                this.renderTreeData(item.children)
              ));
            } else {
              array.push(_react2.default.createElement(TreeNode, props));
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        return array;
      }
    }, {
      key: 'render',
      value: function render() {
        var _state2 = this.state,
            treeData = _state2.treeData,
            transformed = _state2.transformed,
            multi = _state2.multi;

        var props = (0, _form.getProps)(this.props, ['placeholder', 'allowClear', 'disabled']);
        (0, _assign2.default)(props, transformed);
        if (multi === true) {
          props.onChange = this.onChange;
        }
        return _react2.default.createElement(
          _treeSelect2.default,
          props,
          this.renderTreeData(treeData)
        );
      }
    }]);
    return FanoFormTreeSelect;
  }(_react2.default.Component);

  exports.default = FanoFormTreeSelect;
});
//# sourceMappingURL=treeselect.js.map