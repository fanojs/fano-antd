"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _qs = _interopRequireDefault(require("qs"));

var _form = require("../../../utils/form");

var _request = require("../../../utils/request");

var FanoFormRefTable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormRefTable, _React$Component);

  function FanoFormRefTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FanoFormRefTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormRefTable).call(this, props));
    var field = _this.props.injectProps.field;
    var columns = field.props.columns.map(function (item) {
      item.width = item.width || 150;
      item.key = item.key || item.dataIndex;

      _lodash.default.merge(item, field.props.columnsExpand[item.dataIndex]);

      return item;
    });
    _this.state = {
      visible: false,
      loading: false,
      columns: columns,
      rowKey: field.props.rowKey || '_id',
      dataSource: {
        list: []
      }
    };
    _this.onClick = _this.onClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleOk = _this.handleOk.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCancel = _this.handleCancel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(FanoFormRefTable, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchData();
    }
  }, {
    key: "onClick",
    value: function onClick() {
      this.setState({
        visible: true
      });
    }
  }, {
    key: "fetchData",
    value: function () {
      var _fetchData = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var field, query, url, data, state;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.setState({
                  loading: true
                });
                field = this.props.injectProps.field;
                query = _qs.default.stringify({
                  page: this.state.dataSource.page,
                  size: this.state.dataSource.size
                });
                url = field.props.listUrl;

                if (url.lastIndexOf('?') >= 0) {
                  url = "".concat(url, "&").concat(query);
                } else {
                  url = "".concat(url, "?").concat(query);
                }

                _context.next = 7;
                return (0, _request.get)("".concat(url), {
                  headers: field.props.headers
                });

              case 7:
                data = _context.sent;
                state = {
                  loading: false
                };

                if (data) {
                  state.dataSource = data;
                }

                this.setState(state);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchData() {
        return _fetchData.apply(this, arguments);
      };
    }()
  }, {
    key: "handleOk",
    value: function handleOk() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: "handleRowClick",
    value: function handleRowClick(record) {
      var value = record[this.state.rowKey];
      this.setState({
        visible: false
      });
      this.props.onChange(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var field = this.props.injectProps.field;
      var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled']);
      return _react.default.createElement("div", null, _react.default.createElement(_input.default, (0, _extends2.default)({}, props, {
        addonAfter: _react.default.createElement(_icon.default, {
          type: 'search',
          onClick: this.onClick,
          style: {
            cursor: 'pointer'
          }
        }),
        readOnly: true
      })), _react.default.createElement(_modal.default, {
        width: 600,
        title: field.label,
        visible: this.state.visible,
        onOk: this.handleOk,
        onCancel: this.handleCancel
      }, _react.default.createElement(_table.default, {
        rowKey: this.state.rowKey,
        columns: this.state.columns,
        dataSource: this.state.dataSource.list,
        scroll: {
          y: 240
        },
        loading: this.state.loading,
        onRow: function onRow(record) {
          return {
            onClick: _this2.handleRowClick.bind(_this2, record)
          };
        },
        pagination: {
          current: this.state.dataSource.page,
          pageSize: this.state.dataSource.size,
          total: this.state.dataSource.totalrecords,
          onChange: function onChange(page, size) {
            var dataSource = _this2.state.dataSource;
            dataSource.page = page;
            dataSource.size = size;

            _this2.setState({
              dataSource: dataSource
            }, _this2.fetchData);
          }
        },
        size: 'small'
      })));
    }
  }]);
  return FanoFormRefTable;
}(_react.default.Component);

exports.default = FanoFormRefTable;
//# sourceMappingURL=reftable.js.map