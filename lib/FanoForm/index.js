(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/extends', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/get-iterator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'babel-runtime/helpers/classCallCheck', 'react', 'qs', 'lodash', '../utils/request', './DynamicForm', './types/text', './types/hidden', './types/digit', './types/number', './types/radio', './types/checkbox', './types/password', './types/select', './types/datepicker', './types/monthpicker', './types/weekpicker', './types/timepicker', './types/rangepicker', './types/treeselect', './types/imgbox', './types/custom/reftable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/extends'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/get-iterator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('babel-runtime/helpers/classCallCheck'), require('react'), require('qs'), require('lodash'), require('../utils/request'), require('./DynamicForm'), require('./types/text'), require('./types/hidden'), require('./types/digit'), require('./types/number'), require('./types/radio'), require('./types/checkbox'), require('./types/password'), require('./types/select'), require('./types/datepicker'), require('./types/monthpicker'), require('./types/weekpicker'), require('./types/timepicker'), require('./types/rangepicker'), require('./types/treeselect'), require('./types/imgbox'), require('./types/custom/reftable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._extends, global.assign, global.getIterator, global.getPrototypeOf, global.createClass, global.possibleConstructorReturn, global.inherits, global.classCallCheck, global.react, global.qs, global.lodash, global.request, global.DynamicForm, global.text, global.hidden, global.digit, global.number, global.radio, global.checkbox, global.password, global.select, global.datepicker, global.monthpicker, global.weekpicker, global.timepicker, global.rangepicker, global.treeselect, global.imgbox, global.reftable);
    global.index = mod.exports;
  }
})(this, function (exports, _extends2, _assign, _getIterator2, _getPrototypeOf, _createClass2, _possibleConstructorReturn2, _inherits2, _classCallCheck2, _react, _qs, _lodash, _request, _DynamicForm, _text, _hidden, _digit, _number, _radio, _checkbox, _password, _select, _datepicker, _monthpicker, _weekpicker, _timepicker, _rangepicker, _treeselect, _imgbox, _reftable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends3 = _interopRequireDefault(_extends2);

  var _assign2 = _interopRequireDefault(_assign);

  var _getIterator3 = _interopRequireDefault(_getIterator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _react2 = _interopRequireDefault(_react);

  var _qs2 = _interopRequireDefault(_qs);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _DynamicForm2 = _interopRequireDefault(_DynamicForm);

  var _text2 = _interopRequireDefault(_text);

  var _hidden2 = _interopRequireDefault(_hidden);

  var _digit2 = _interopRequireDefault(_digit);

  var _number2 = _interopRequireDefault(_number);

  var _radio2 = _interopRequireDefault(_radio);

  var _checkbox2 = _interopRequireDefault(_checkbox);

  var _password2 = _interopRequireDefault(_password);

  var _select2 = _interopRequireDefault(_select);

  var _datepicker2 = _interopRequireDefault(_datepicker);

  var _monthpicker2 = _interopRequireDefault(_monthpicker);

  var _weekpicker2 = _interopRequireDefault(_weekpicker);

  var _timepicker2 = _interopRequireDefault(_timepicker);

  var _rangepicker2 = _interopRequireDefault(_rangepicker);

  var _treeselect2 = _interopRequireDefault(_treeselect);

  var _imgbox2 = _interopRequireDefault(_imgbox);

  var _reftable2 = _interopRequireDefault(_reftable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FanoForm = function FanoForm() {
    (0, _classCallCheck3.default)(this, FanoForm);
  };

  FanoForm.c = {
    types: {
      text: _text2.default,
      password: _password2.default,
      hidden: _hidden2.default,
      number: _number2.default,
      digit: _digit2.default,
      radio: _radio2.default,
      checkbox: _checkbox2.default,
      select: _select2.default,
      datepicker: _datepicker2.default,
      monthpicker: _monthpicker2.default,
      weekpicker: _weekpicker2.default,
      timepicker: _timepicker2.default,
      rangepicker: _rangepicker2.default,
      treeselect: _treeselect2.default,
      reftable: _reftable2.default,
      imgbox: _imgbox2.default
    }

    /**
     * 全局配置
     * @param {*} options 配置项
     */
  };FanoForm.config = function (options) {
    if (_lodash2.default.isPlainObject(options)) {
      _lodash2.default.merge(FanoForm.c, options);
    } else {
      throw new Error('Invalid options');
    }
  };

  /**
   * 使用JSON配置生成表单
   * @param {*} json JSON配置
   */
  FanoForm.fromJson = function (json) {
    return function (_React$Component) {
      (0, _inherits3.default)(FanoComponent, _React$Component);

      function FanoComponent(props) {
        (0, _classCallCheck3.default)(this, FanoComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (FanoComponent.__proto__ || (0, _getPrototypeOf2.default)(FanoComponent)).call(this, props));

        _this.setDefaultValue(json);
        _this.combineExpandProps(json);
        _this.wrappedComponentRef = _this.wrappedComponentRef.bind(_this);
        return _this;
      }

      (0, _createClass3.default)(FanoComponent, [{
        key: 'setDefaultValue',
        value: function setDefaultValue(json) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = (0, _getIterator3.default)(json.fields), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var field = _step.value;

              field.props = field.props || {};
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
        }
      }, {
        key: 'getFieldsValue',
        value: function getFieldsValue() {
          return this.formRef.getFieldsValue();
        }
      }, {
        key: 'setFieldsValue',
        value: function setFieldsValue(values) {
          return this.formRef.setFieldsValue(values);
        }
      }, {
        key: 'setFieldsError',
        value: function setFieldsError(errors) {
          return this.formRef.setFieldsError(errors);
        }
      }, {
        key: 'combineExpandProps',
        value: function combineExpandProps(json) {
          var expandProps = this.props.expandProps;

          if (!_lodash2.default.isPlainObject(expandProps)) {
            return;
          }
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = (0, _getIterator3.default)(json.fields), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var field = _step2.value;

              var expand = expandProps[field.name];
              if (_lodash2.default.isPlainObject(expand)) {
                (0, _assign2.default)(field.props, expand);
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
        key: 'wrappedComponentRef',
        value: function wrappedComponentRef(inst) {
          this.formRef = inst;
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(_DynamicForm2.default, (0, _extends3.default)({}, this.props, {
            c: FanoForm.c,
            config: json,
            wrappedComponentRef: this.wrappedComponentRef
          }));
        }
      }]);
      return FanoComponent;
    }(_react2.default.Component);
  };

  /**
   * 通过URL获取配置后再生成表单
   * @param {*} url 配置URL
   */
  FanoForm.fromUrl = function (url) {
    if (!_lodash2.default.isString(url)) {
      throw new Error('Invalid \'url\': ' + url);
    }
    (0, _request.get)(url).then(function (json) {
      if (Array.isArray(_lodash2.default.get(json, 'list'))) {
        FanoForm.fromJson(json.list);
      } else {
        throw new Error('Invalid \'url\' format');
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
    if (!_lodash2.default.isString(code)) {
      throw new Error('Invalid code: ' + code);
    } else if (!_lodash2.default.isString(FanoForm.c.metaUrl)) {
      throw new Error('Invalid \'metaUrl\' format');
    }
    (0, _request.get)(FanoForm.c.metaUrl + '?' + _qs2.default.stringify({ code: code })).then(function (json) {
      if (Array.isArray(_lodash2.default.get(json, 'list'))) {
        FanoForm.fromJson(json.list);
      } else {
        throw new Error('Invalid \'metaUrl\' format');
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
    if (_lodash2.default.isString(code) && _lodash2.default.isFunction(fn)) {
      FanoForm.c.types.code = fn;
      return true;
    }
    return false;
  };

  exports.default = FanoForm;
});
//# sourceMappingURL=index.js.map