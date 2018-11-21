(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'antd/es/date-picker', 'react', 'antd', '../../utils/form', 'antd/es/date-picker/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('antd/es/date-picker'), require('react'), require('antd'), require('../../utils/form'), require('antd/es/date-picker/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.datePicker, global.react, global.antd, global.form, global.style);
    global.monthpicker = mod.exports;
  }
})(this, function (exports, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _datePicker, _react, _antd, _form) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _datePicker2 = _interopRequireDefault(_datePicker);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MonthPicker = _datePicker2.default.MonthPicker;

  var FanoFormMonthPicker = function (_React$Component) {
    (0, _inherits3.default)(FanoFormMonthPicker, _React$Component);

    function FanoFormMonthPicker() {
      (0, _classCallCheck3.default)(this, FanoFormMonthPicker);
      return (0, _possibleConstructorReturn3.default)(this, (FanoFormMonthPicker.__proto__ || (0, _getPrototypeOf2.default)(FanoFormMonthPicker)).apply(this, arguments));
    }

    (0, _createClass3.default)(FanoFormMonthPicker, [{
      key: 'render',
      value: function render() {
        var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled', 'allowClear', 'format', 'disabledDate']);
        return _react2.default.createElement(MonthPicker, props);
      }
    }]);
    return FanoFormMonthPicker;
  }(_react2.default.Component);

  exports.default = FanoFormMonthPicker;
});
//# sourceMappingURL=monthpicker.js.map