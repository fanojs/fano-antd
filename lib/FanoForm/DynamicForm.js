(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'antd/es/row', 'antd/es/button', 'antd/es/col', 'babel-runtime/helpers/extends', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'antd/es/form', 'react', 'lodash', 'antd', './DynamicForm.less', 'antd/es/row/style', 'antd/es/button/style', 'antd/es/col/style', 'antd/es/form/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('antd/es/row'), require('antd/es/button'), require('antd/es/col'), require('babel-runtime/helpers/extends'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('antd/es/form'), require('react'), require('lodash'), require('antd'), require('./DynamicForm.less'), require('antd/es/row/style'), require('antd/es/button/style'), require('antd/es/col/style'), require('antd/es/form/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.row, global.button, global.col, global._extends, global.assign, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.form, global.react, global.lodash, global.antd, global.DynamicForm, global.style, global.style, global.style, global.style);
    global.DynamicForm = mod.exports;
  }
})(this, function (exports, _row, _button, _col, _extends2, _assign, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _form, _react, _lodash, _antd, _DynamicForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _row2 = _interopRequireDefault(_row);

  var _button2 = _interopRequireDefault(_button);

  var _col2 = _interopRequireDefault(_col);

  var _extends3 = _interopRequireDefault(_extends2);

  var _assign2 = _interopRequireDefault(_assign);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _form2 = _interopRequireDefault(_form);

  var _react2 = _interopRequireDefault(_react);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _DynamicForm2 = _interopRequireDefault(_DynamicForm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FormItem = _form2.default.Item;

  var DynamicForm = function (_React$Component) {
    (0, _inherits3.default)(DynamicForm, _React$Component);

    function DynamicForm(props) {
      (0, _classCallCheck3.default)(this, DynamicForm);

      var _this = (0, _possibleConstructorReturn3.default)(this, (DynamicForm.__proto__ || (0, _getPrototypeOf2.default)(DynamicForm)).call(this, props));

      _this.state = {
        fieldsError: {}
      };
      _this.handleSubmit = _this.handleSubmit.bind(_this);
      return _this;
    }

    (0, _createClass3.default)(DynamicForm, [{
      key: 'getRequiredRule',
      value: function getRequiredRule(required) {
        var rule = { required: true };
        if (_lodash2.default.isString(required)) {
          rule.message = required;
        }
        return rule;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.setFieldsValue(this.props.values);
      }
    }, {
      key: 'getFieldControl',
      value: function getFieldControl(field) {
        var FanoFormType = this.props.c.types[field.type];
        if (FanoFormType) {
          return _react2.default.createElement(FanoFormType, { injectProps: { field: field, c: this.props.c, getFieldsValue: this.getFieldsValue } });
        }
        throw new Error('Invalid type: "' + field.name + ' => ' + field.type + '"');
      }
    }, {
      key: 'getFieldLabel',
      value: function getFieldLabel(field, needMark) {
        var text = _react2.default.createElement(
          'span',
          { key: 'label', className: _DynamicForm2.default.formItemText + ' fano-form-item-label-text' },
          field.label
        );
        var mark = _react2.default.createElement(
          'span',
          { key: 'requiredMark', className: _DynamicForm2.default.requiredMark + ' fano-form-item-required-mark' },
          '*'
        );
        var colonGetter = function colonGetter() {
          var mark = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
          return _react2.default.createElement(
            'span',
            { key: 'colon', className: _DynamicForm2.default.formItemColon + ' fano-form-item-colon' },
            mark
          );
        };

        var label = [text];
        if (field.props.required || field.props.requiredMark === true || needMark === true) {
          label.unshift(mark);
        }
        if (_lodash2.default.isEmpty(field.props.colon) || field.props.colon === true) {
          label.push(colonGetter());
        } else {
          label.push(colonGetter(null));
        }
        return label;
      }
    }, {
      key: 'getColProps',
      value: function getColProps(columns) {
        if (!_lodash2.default.isNumber(columns) || !_lodash2.default.isFinite(columns)) {
          columns = 4;
        }
        switch (columns) {
          case 4:
            return { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 };
          case 3:
            return { xs: 24, sm: 12, md: 12, lg: 8 };
          case 2:
            return { xs: 24, sm: 12 };
          case 1:
            return { xs: 24 };
          default:
            return { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 };
        }
      }
    }, {
      key: 'setFieldsValue',
      value: function setFieldsValue(values) {
        if (_lodash2.default.isPlainObject(values)) {
          return !!this.props.form.setFieldsValue(values);
        }
        return false;
      }
    }, {
      key: 'getFieldsValue',
      value: function getFieldsValue(fieldNames) {
        return this.props.form.getFieldsValue(fieldNames);
      }
    }, {
      key: 'getFieldsProps',
      value: function getFieldsProps() {
        var fieldNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        if (!Array.isArray(fieldNames)) {
          console.warn('argument must be a array');
          return {};
        }
        var config = this.props.config;

        var fields = _lodash2.default.chain(config.fields).filter(function (f) {
          return _lodash2.default.isEmpty(fieldNames) || fieldNames.includes(f.name);
        }).groupBy('name').mapValues(function (v) {
          return _lodash2.default.head(v);
        }).value();
        return fields;
      }
    }, {
      key: 'setFieldsError',
      value: function setFieldsError(errors) {
        if (_lodash2.default.isPlainObject(errors)) {
          var fieldsError = this.state.fieldsError;

          (0, _assign2.default)(fieldsError, errors);
          this.setState({ fieldsError: fieldsError });
          return true;
        }
        return false;
      }
    }, {
      key: 'renderFields',
      value: function renderFields() {
        var _props = this.props,
            config = _props.config,
            form = _props.form;
        var fieldsError = this.state.fieldsError;
        var fields = config.fields,
            _config$columns = config.columns,
            columns = _config$columns === undefined ? 4 : _config$columns;

        var colProps = this.getColProps(columns);
        var getFieldDecorator = form.getFieldDecorator;

        var cols = [];
        for (var i = 0; i < fields.length; i++) {
          var field = fields[i];
          var style = {};
          var fieldColProps = colProps;
          if (field.props.colProps) {
            fieldColProps = field.props.colProps;
          } else if (_lodash2.default.isFinite(field.props.columns)) {
            fieldColProps = this.getColProps(field.props.columns);
          }
          if (field.props.style) {
            _lodash2.default.merge(style, field.props.style);
          }
          if (field.props.width) {
            style.width = field.props.width;
          }
          if (field.props.height) {
            style.height = field.props.height;
          }
          field.props.placeholder = field.props.placeholder || field.label;

          var fieldError = _lodash2.default.pick(fieldsError[field.name], ['requiredMark', 'validateStatus', 'hasFeedback', 'help']);
          var fieldLabel = this.getFieldLabel(field, fieldError.requiredMark);
          var fieldControl = this.getFieldControl(field);
          var formItemProps = {
            label: _react2.default.createElement(
              'span',
              { className: _DynamicForm2.default.formItemLabel + ' fano-form-item-label fano-form-item-label-' + field.name },
              fieldLabel
            ),
            colon: false
          };
          var formItemOptions = {
            rules: [],
            initialValue: field.props.defaultValue
          };
          if (field.props.required) {
            formItemOptions.rules.push(this.getRequiredRule(field.props.required));
          }
          (0, _assign2.default)(formItemProps, fieldError);
          cols.push(_react2.default.createElement(
            _col2.default,
            (0, _extends3.default)({ key: i }, fieldColProps, { className: 'fano-form-col fano-form-col-' + field.name }),
            _react2.default.createElement(
              FormItem,
              (0, _extends3.default)({}, formItemProps, { className: _DynamicForm2.default.formItem + ' fano-form-item fano-form-item-' + field.name }),
              _react2.default.createElement(
                'div',
                { className: _DynamicForm2.default.formItemCtrl + ' fano-form-ctrl fano-form-ctrl-' + field.name, style: style },
                getFieldDecorator(field.name, formItemOptions)(fieldControl)
              )
            )
          ));
        }
        return cols;
      }
    }, {
      key: 'handleSubmit',
      value: function handleSubmit(e) {
        this.props.form.validateFieldsAndScroll(function (err, values) {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    }, {
      key: 'getDefaultFooter',
      value: function getDefaultFooter() {
        return _react2.default.createElement(
          'div',
          { className: _DynamicForm2.default.footer },
          _react2.default.createElement(
            _button2.default,
            null,
            '\u53D6\u6D88'
          ),
          _react2.default.createElement(
            _button2.default,
            { type: 'primary', onClick: this.handleSubmit },
            '\u786E\u5B9A'
          )
        );
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _form2.default,
          { layout: 'inline' },
          _react2.default.createElement(
            _row2.default,
            null,
            this.renderFields()
          ),
          _react2.default.createElement(
            _row2.default,
            null,
            _react2.default.createElement(
              _col2.default,
              null,
              this.props.footer === undefined ? this.getDefaultFooter() : this.props.footer
            )
          )
        );
      }
    }]);
    return DynamicForm;
  }(_react2.default.Component);

  exports.default = _form2.default.create()(DynamicForm);
});
//# sourceMappingURL=DynamicForm.js.map