(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './FanoForm', './FanoTable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./FanoForm'), require('./FanoTable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.FanoForm, global.FanoTable);
    global.index = mod.exports;
  }
})(this, function (exports, _FanoForm, _FanoTable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FanoTable = exports.FanoForm = undefined;

  var _FanoForm2 = _interopRequireDefault(_FanoForm);

  var _FanoTable2 = _interopRequireDefault(_FanoTable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.FanoForm = _FanoForm2.default;
  exports.FanoTable = _FanoTable2.default;
});
//# sourceMappingURL=index.js.map