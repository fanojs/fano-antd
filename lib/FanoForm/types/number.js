(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'antd/es/input-number', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'antd', '../../utils/form', 'antd/es/input-number/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('antd/es/input-number'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('antd'), require('../../utils/form'), require('antd/es/input-number/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.inputNumber, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.react, global.antd, global.form, global.style);
    global.number = mod.exports;
  }
})(this, function (exports, _inputNumber, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _react, _antd, _form) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _inputNumber2 = _interopRequireDefault(_inputNumber);

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

  var FanoFormNumber = function (_React$Component) {
    (0, _inherits3.default)(FanoFormNumber, _React$Component);

    function FanoFormNumber() {
      (0, _classCallCheck3.default)(this, FanoFormNumber);
      return (0, _possibleConstructorReturn3.default)(this, (FanoFormNumber.__proto__ || (0, _getPrototypeOf2.default)(FanoFormNumber)).apply(this, arguments));
    }

    (0, _createClass3.default)(FanoFormNumber, [{
      key: 'render',
      value: function render() {
        var props = (0, _form.getProps)(this.props, ['placeholder', 'max', 'min', 'step', 'disabled'], {
          precision: 0
        });
        return _react2.default.createElement(_inputNumber2.default, props);
      }
    }]);
    return FanoFormNumber;
  }(_react2.default.Component);

  exports.default = FanoFormNumber;
});
//# sourceMappingURL=number.js.map