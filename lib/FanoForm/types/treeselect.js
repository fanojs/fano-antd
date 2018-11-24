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

require("antd/es/tree-select/style");

var _treeSelect = _interopRequireDefault(require("antd/es/tree-select"));

var _react = _interopRequireDefault(require("react"));

var _qs = _interopRequireDefault(require("qs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _arrayToTree = _interopRequireDefault(require("array-to-tree"));

var _request = require("../../utils/request");

var _form = require("../../utils/form");

var TreeNode = _treeSelect.default.TreeNode;

var FanoFormTreeSelect =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormTreeSelect, _React$Component);

  function FanoFormTreeSelect(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FanoFormTreeSelect);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormTreeSelect).call(this, props));
    var _props$injectProps$fi = props.injectProps.field.props,
        url = _props$injectProps$fi.url,
        dict = _props$injectProps$fi.dict,
        max = _props$injectProps$fi.max,
        simpleMode = _props$injectProps$fi.simpleMode;
    var _props$injectProps$fi2 = props.injectProps.field.props.treeData,
        treeData = _props$injectProps$fi2 === void 0 ? [] : _props$injectProps$fi2;

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
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(FanoFormTreeSelect, [{
    key: "getPlainValues",
    value: function getPlainValues(treeData) {
      var recursive = function recursive(container, values) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
            if (!_iteratorNormalCompletion && _iterator.return != null) {
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
      plainValues = _lodash.default.uniq(plainValues);
      return plainValues;
    }
  }, {
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
      var props = {};
      var _this$props$injectPro = this.props.injectProps.field.props,
          max = _this$props$injectPro.max,
          allowInput = _this$props$injectPro.allowInput,
          expandAll = _this$props$injectPro.expandAll,
          _this$props$injectPro2 = _this$props$injectPro.ignoreCase,
          ignoreCase = _this$props$injectPro2 === void 0 ? true : _this$props$injectPro2;

      if (_lodash.default.isNumber(max)) {
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
    key: "transformSimpleData",
    value: function transformSimpleData(treeData) {
      if (_lodash.default.isEmpty(treeData)) {
        return treeData;
      }

      var tree = (0, _arrayToTree.default)(treeData, {
        customID: 'value',
        parentProperty: 'pid',
        childrenProperty: 'children'
      });
      return tree;
    }
  }, {
    key: "transformKeysMap",
    value: function transformKeysMap(treeData, keysMap) {
      if (!_lodash.default.isPlainObject(keysMap)) {
        return;
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = treeData[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var dictUrl = this.props.injectProps.c.dictUrl;

      if (_lodash.default.isEmpty(this.state.treeData)) {
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
    key: "renderTreeData",
    value: function renderTreeData(values) {
      var disabledOptions = this.state.disabledOptions;
      var array = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var item = _step3.value;
          item.key = item.value;
          item.disabled = disabledOptions.indexOf(item.value) >= 0;
          item.disableCheckbox = item.disabled;

          var props = _lodash.default.pick(item, ['key', 'title', 'value', 'disableCheckbox', 'disabled', 'isLeaf']);

          if (Array.isArray(item.children)) {
            array.push(_react.default.createElement(TreeNode, props, this.renderTreeData(item.children)));
          } else {
            array.push(_react.default.createElement(TreeNode, props));
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
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
    key: "render",
    value: function render() {
      var _this$state2 = this.state,
          treeData = _this$state2.treeData,
          transformed = _this$state2.transformed,
          multi = _this$state2.multi;
      var props = (0, _form.getProps)(this.props, ['placeholder', 'allowClear', 'disabled']);
      Object.assign(props, transformed);

      if (multi === true) {
        props.onChange = this.onChange;
      }

      return _react.default.createElement(_treeSelect.default, props, this.renderTreeData(treeData));
    }
  }]);
  return FanoFormTreeSelect;
}(_react.default.Component);

exports.default = FanoFormTreeSelect;
//# sourceMappingURL=treeselect.js.map