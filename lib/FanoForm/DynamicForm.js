"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

require("antd/es/form/style");

var _form = _interopRequireDefault(require("antd/es/form"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _DynamicForm = _interopRequireDefault(require("./DynamicForm.less"));

var FormItem = _form.default.Item;

var DynamicForm =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(DynamicForm, _React$Component);

  function DynamicForm(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DynamicForm);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DynamicForm).call(this, props));
    _this.state = {
      fieldsError: {}
    };
    _this.handleSubmit = _this.handleSubmit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(DynamicForm, [{
    key: "getRequiredRule",
    value: function getRequiredRule(required) {
      var rule = {
        required: true
      };

      if (_lodash.default.isString(required)) {
        rule.message = required;
      }

      return rule;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setFieldsValue(this.props.values);
    }
  }, {
    key: "getFieldControl",
    value: function getFieldControl(field) {
      var FanoFormType = this.props.c.types[field.type];

      if (FanoFormType) {
        return _react.default.createElement(FanoFormType, {
          injectProps: {
            field: field,
            c: this.props.c,
            getFieldsValue: this.getFieldsValue
          }
        });
      }

      throw new Error("Invalid type: \"".concat(field.name, " => ").concat(field.type, "\""));
    }
  }, {
    key: "getFieldLabel",
    value: function getFieldLabel(field, needMark) {
      var text = _react.default.createElement("span", {
        key: 'label',
        className: "".concat(_DynamicForm.default.formItemText, " fano-form-item-label-text")
      }, field.label);

      var mark = _react.default.createElement("span", {
        key: 'requiredMark',
        className: "".concat(_DynamicForm.default.requiredMark, " fano-form-item-required-mark")
      }, "*");

      var colonGetter = function colonGetter() {
        var mark = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
        return _react.default.createElement("span", {
          key: 'colon',
          className: "".concat(_DynamicForm.default.formItemColon, " fano-form-item-colon")
        }, mark);
      };

      var label = [text];

      if (field.props.required || field.props.requiredMark === true || needMark === true) {
        label.unshift(mark);
      }

      if (_lodash.default.isEmpty(field.props.colon) || field.props.colon === true) {
        label.push(colonGetter());
      } else {
        label.push(colonGetter(null));
      }

      return label;
    }
  }, {
    key: "getColProps",
    value: function getColProps(columns) {
      if (!_lodash.default.isNumber(columns) || !_lodash.default.isFinite(columns)) {
        columns = 4;
      }

      switch (columns) {
        case 4:
          return {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 8,
            xl: 6
          };

        case 3:
          return {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 8
          };

        case 2:
          return {
            xs: 24,
            sm: 12
          };

        case 1:
          return {
            xs: 24
          };

        default:
          return {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 8,
            xl: 6
          };
      }
    }
  }, {
    key: "setFieldsValue",
    value: function setFieldsValue(values) {
      if (_lodash.default.isPlainObject(values)) {
        return !!this.props.form.setFieldsValue(values);
      }

      return false;
    }
  }, {
    key: "getFieldsValue",
    value: function getFieldsValue(fieldNames) {
      return this.props.form.getFieldsValue(fieldNames);
    }
  }, {
    key: "getFieldsProps",
    value: function getFieldsProps() {
      var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (!Array.isArray(fieldNames)) {
        console.warn('argument must be a array');
        return {};
      }

      var config = this.props.config;

      var fields = _lodash.default.chain(config.fields).filter(function (f) {
        return _lodash.default.isEmpty(fieldNames) || fieldNames.includes(f.name);
      }).groupBy('name').mapValues(function (v) {
        return _lodash.default.head(v);
      }).value();

      return fields;
    }
    /**
     * 设置字段错误信息
     * requiredMark:boolean - 是否显示必填
     * validateStatus:string - 校验状态，可选 'success', 'warning', 'error', 'validating'
     * hasFeedback:boolean - 用于给输入框添加反馈图标
     * help:string - 设置校验文案
     */

  }, {
    key: "setFieldsError",
    value: function setFieldsError(errors) {
      if (_lodash.default.isPlainObject(errors)) {
        var fieldsError = this.state.fieldsError;
        Object.assign(fieldsError, errors);
        this.setState({
          fieldsError: fieldsError
        });
        return true;
      }

      return false;
    }
  }, {
    key: "renderFields",
    value: function renderFields() {
      var _this$props = this.props,
          config = _this$props.config,
          form = _this$props.form;
      var fieldsError = this.state.fieldsError;
      var fields = config.fields,
          _config$columns = config.columns,
          columns = _config$columns === void 0 ? 4 : _config$columns;
      var colProps = this.getColProps(columns);
      var getFieldDecorator = form.getFieldDecorator;
      var cols = [];

      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var style = {};
        var fieldColProps = colProps;

        if (field.props.colProps) {
          fieldColProps = field.props.colProps;
        } else if (_lodash.default.isFinite(field.props.columns)) {
          fieldColProps = this.getColProps(field.props.columns);
        }

        if (field.props.style) {
          _lodash.default.merge(style, field.props.style);
        }

        if (field.props.width) {
          style.width = field.props.width;
        }

        if (field.props.height) {
          style.height = field.props.height;
        }

        field.props.placeholder = field.props.placeholder || field.label;

        var fieldError = _lodash.default.pick(fieldsError[field.name], ['requiredMark', 'validateStatus', 'hasFeedback', 'help']);

        var fieldLabel = this.getFieldLabel(field, fieldError.requiredMark);
        var fieldControl = this.getFieldControl(field);
        var formItemProps = {
          label: _react.default.createElement("span", {
            className: "".concat(_DynamicForm.default.formItemLabel, " fano-form-item-label fano-form-item-label-").concat(field.name)
          }, fieldLabel),
          colon: false
        };
        var formItemOptions = {
          rules: [],
          initialValue: field.props.defaultValue
        };

        if (field.props.required) {
          formItemOptions.rules.push(this.getRequiredRule(field.props.required));
        }

        Object.assign(formItemProps, fieldError);
        cols.push(_react.default.createElement(_col.default, (0, _extends2.default)({
          key: i
        }, fieldColProps, {
          className: "fano-form-col fano-form-col-".concat(field.name)
        }), _react.default.createElement(FormItem, (0, _extends2.default)({}, formItemProps, {
          className: "".concat(_DynamicForm.default.formItem, " fano-form-item fano-form-item-").concat(field.name)
        }), _react.default.createElement("div", {
          className: "".concat(_DynamicForm.default.formItemCtrl, " fano-form-ctrl fano-form-ctrl-").concat(field.name),
          style: style
        }, getFieldDecorator(field.name, formItemOptions)(fieldControl)))));
      }

      return cols;
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(e) {
      this.props.form.validateFieldsAndScroll(function (err, values) {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  }, {
    key: "getDefaultFooter",
    value: function getDefaultFooter() {
      return _react.default.createElement("div", {
        className: _DynamicForm.default.footer
      }, _react.default.createElement(_button.default, null, "\u53D6\u6D88"), _react.default.createElement(_button.default, {
        type: 'primary',
        onClick: this.handleSubmit
      }, "\u786E\u5B9A"));
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_form.default, {
        layout: 'inline'
      }, _react.default.createElement(_row.default, null, this.renderFields()), _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, null, this.props.footer === undefined ? this.getDefaultFooter() : this.props.footer)));
    }
  }]);
  return DynamicForm;
}(_react.default.Component);

var _default = _form.default.create()(DynamicForm);

exports.default = _default;
//# sourceMappingURL=DynamicForm.js.map