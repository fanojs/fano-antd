(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'antd/es/time-picker', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'antd', '../../utils/form', 'antd/es/time-picker/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('antd/es/time-picker'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('antd'), require('../../utils/form'), require('antd/es/time-picker/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.timePicker, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.react, global.antd, global.form, global.style);
    global.timepicker = mod.exports;
  }
})(this, function (exports, _timePicker, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _react, _antd, _form) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _timePicker2 = _interopRequireDefault(_timePicker);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _react2 = _interopRequireDefault(_react);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FanoFormTimePicker = function (_React$Component) {
    (0, _inherits3.default)(FanoFormTimePicker, _React$Component);

    function FanoFormTimePicker() {
      (0, _classCallCheck3.default)(this, FanoFormTimePicker);
      return (0, _possibleConstructorReturn3.default)(this, (FanoFormTimePicker.__proto__ || (0, _getPrototypeOf2.default)(FanoFormTimePicker)).apply(this, arguments));
    }

    (0, _createClass3.default)(FanoFormTimePicker, [{
      key: 'render',
      value: function render() {
        var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled', 'allowClear', 'format']);
        return _react2.default.createElement(_timePicker2.default, props);
      }
    }]);
    return FanoFormTimePicker;
  }(_react2.default.Component);

  exports.default = FanoFormTimePicker;
});
//# sourceMappingURL=timepicker.js.map