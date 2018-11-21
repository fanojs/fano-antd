(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/object/assign', 'lodash'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/assign'), require('lodash'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.assign, global.lodash);
    global.form = mod.exports;
  }
})(this, function (exports, _assign, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getProps = getProps;

  var _assign2 = _interopRequireDefault(_assign);

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function getProps(rawProps, supportProps, defaultProps) {
    var field = rawProps.injectProps.field;

    var props = _lodash2.default.omit(rawProps, 'injectProps');
    var fanoProps = _lodash2.default.pick(field.props, supportProps);
    (0, _assign2.default)(props, fanoProps, field.nativeProps, defaultProps);
    return props;
  }
});
//# sourceMappingURL=form.js.map