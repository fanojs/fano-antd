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

require("antd/es/date-picker/style");

var _datePicker = _interopRequireDefault(require("antd/es/date-picker"));

var _react = _interopRequireDefault(require("react"));

var _form = require("../../utils/form");

var WeekPicker = _datePicker.default.WeekPicker;

var FanoFormWeekPicker =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormWeekPicker, _React$Component);

  function FanoFormWeekPicker() {
    (0, _classCallCheck2.default)(this, FanoFormWeekPicker);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormWeekPicker).apply(this, arguments));
  }

  (0, _createClass2.default)(FanoFormWeekPicker, [{
    key: "render",
    value: function render() {
      var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled', 'allowClear', 'format', 'disabledDate']);
      return _react.default.createElement(WeekPicker, props);
    }
  }]);
  return FanoFormWeekPicker;
}(_react.default.Component);

exports.default = FanoFormWeekPicker;
//# sourceMappingURL=weekpicker.js.map