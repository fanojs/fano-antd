"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input-number/style");

var _inputNumber = _interopRequireDefault(require("antd/es/input-number"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _form = require("../../utils/form");

var FanoFormNumber =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormNumber, _React$Component);

  function FanoFormNumber() {
    (0, _classCallCheck2.default)(this, FanoFormNumber);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormNumber).apply(this, arguments));
  }

  (0, _createClass2.default)(FanoFormNumber, [{
    key: "render",
    value: function render() {
      var props = (0, _form.getProps)(this.props, ['placeholder', 'max', 'min', 'step', 'disabled'], {
        precision: 0
      });
      return _react.default.createElement(_inputNumber.default, props);
    }
  }]);
  return FanoFormNumber;
}(_react.default.Component);

exports.default = FanoFormNumber;
//# sourceMappingURL=number.js.map