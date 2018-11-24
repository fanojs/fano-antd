"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/time-picker/style");

var _timePicker = _interopRequireDefault(require("antd/es/time-picker"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _form = require("../../utils/form");

var FanoFormTimePicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormTimePicker, _React$Component);

  function FanoFormTimePicker() {
    (0, _classCallCheck2.default)(this, FanoFormTimePicker);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormTimePicker).apply(this, arguments));
  }

  (0, _createClass2.default)(FanoFormTimePicker, [{
    key: "render",
    value: function render() {
      var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled', 'allowClear', 'format']);
      return _react.default.createElement(_timePicker.default, props);
    }
  }]);
  return FanoFormTimePicker;
}(_react.default.Component);

exports.default = FanoFormTimePicker;
//# sourceMappingURL=timepicker.js.map