"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProps = getProps;

var _lodash = _interopRequireDefault(require("lodash"));

function getProps(rawProps, supportProps, defaultProps) {
  var field = rawProps.injectProps.field;

  var props = _lodash.default.omit(rawProps, 'injectProps');

  var fanoProps = _lodash.default.pick(field.props, supportProps);

  Object.assign(props, fanoProps, field.nativeProps, defaultProps);
  return props;
}
//# sourceMappingURL=form.js.map