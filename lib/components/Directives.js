"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.If = void 0;

var _react = _interopRequireWildcard(require("react"));

var If = function If(props) {
  return props.cond ? _react.default.createElement(_react.Fragment, null, props.children) : null;
};

exports.If = If;
//# sourceMappingURL=Directives.js.map