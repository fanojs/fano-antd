"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _form = require("../../utils/form");

var FanoFormText =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormText, _React$Component);

  function FanoFormText() {
    (0, _classCallCheck2.default)(this, FanoFormText);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormText).apply(this, arguments));
  }

  (0, _createClass2.default)(FanoFormText, [{
    key: "render",
    value: function render() {
      var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled']);
      return _react.default.createElement(_input.default, props);
    }
  }]);
  return FanoFormText;
}(_react.default.Component);

exports.default = FanoFormText;
//# sourceMappingURL=text.js.map