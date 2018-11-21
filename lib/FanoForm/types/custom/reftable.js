(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'antd/es/modal', 'antd/es/table', 'antd/es/input', 'babel-runtime/helpers/extends', 'antd/es/icon', 'babel-runtime/regenerator', 'babel-runtime/helpers/asyncToGenerator', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'lodash', 'qs', 'antd', '../../../utils/form', '../../../utils/request', 'antd/es/modal/style', 'antd/es/table/style', 'antd/es/input/style', 'antd/es/icon/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('antd/es/modal'), require('antd/es/table'), require('antd/es/input'), require('babel-runtime/helpers/extends'), require('antd/es/icon'), require('babel-runtime/regenerator'), require('babel-runtime/helpers/asyncToGenerator'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('lodash'), require('qs'), require('antd'), require('../../../utils/form'), require('../../../utils/request'), require('antd/es/modal/style'), require('antd/es/table/style'), require('antd/es/input/style'), require('antd/es/icon/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.modal, global.table, global.input, global._extends, global.icon, global.regenerator, global.asyncToGenerator, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.react, global.lodash, global.qs, global.antd, global.form, global.request, global.style, global.style, global.style, global.style);
    global.reftable = mod.exports;
  }
})(this, function (exports, _modal, _table, _input, _extends2, _icon, _regenerator, _asyncToGenerator2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _react, _lodash, _qs, _antd, _form, _request) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _modal2 = _interopRequireDefault(_modal);

  var _table2 = _interopRequireDefault(_table);

  var _input2 = _interopRequireDefault(_input);

  var _extends3 = _interopRequireDefault(_extends2);

  var _icon2 = _interopRequireDefault(_icon);

  var _regenerator2 = _interopRequireDefault(_regenerator);

  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _react2 = _interopRequireDefault(_react);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _qs2 = _interopRequireDefault(_qs);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FanoFormRefTable = function (_React$Component) {
    (0, _inherits3.default)(FanoFormRefTable, _React$Component);

    function FanoFormRefTable(props) {
      (0, _classCallCheck3.default)(this, FanoFormRefTable);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FanoFormRefTable.__proto__ || (0, _getPrototypeOf2.default)(FanoFormRefTable)).call(this, props));

      var field = _this.props.injectProps.field;

      var columns = field.props.columns.map(function (item) {
        item.width = item.width || 150;
        item.key = item.key || item.dataIndex;
        _lodash2.default.merge(item, field.props.columnsExpand[item.dataIndex]);
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
      _this.onClick = _this.onClick.bind(_this);
      _this.handleOk = _this.handleOk.bind(_this);
      _this.handleCancel = _this.handleCancel.bind(_this);
      return _this;
    }

    (0, _createClass3.default)(FanoFormRefTable, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.fetchData();
      }
    }, {
      key: 'onClick',
      value: function onClick() {
        this.setState({
          visible: true
        });
      }
    }, {
      key: 'fetchData',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var field, query, url, data, state;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this.setState({ loading: true });
                  field = this.props.injectProps.field;
                  query = _qs2.default.stringify({
                    page: this.state.dataSource.page,
                    size: this.state.dataSource.size
                  });
                  url = field.props.listUrl;

                  if (url.lastIndexOf('?') >= 0) {
                    url = url + '&' + query;
                  } else {
                    url = url + '?' + query;
                  }
                  _context.next = 7;
                  return (0, _request.get)('' + url, {
                    headers: field.props.headers
                  });

                case 7:
                  data = _context.sent;
                  state = { loading: false };

                  if (data) {
                    state.dataSource = data;
                  }
                  this.setState(state);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function fetchData() {
          return _ref.apply(this, arguments);
        }

        return fetchData;
      }()
    }, {
      key: 'handleOk',
      value: function handleOk() {
        this.setState({
          visible: false
        });
      }
    }, {
      key: 'handleCancel',
      value: function handleCancel() {
        this.setState({
          visible: false
        });
      }
    }, {
      key: 'handleRowClick',
      value: function handleRowClick(record) {
        var value = record[this.state.rowKey];
        this.setState({
          visible: false
        });
        this.props.onChange(value);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var field = this.props.injectProps.field;

        var props = (0, _form.getProps)(this.props, ['placeholder', 'disabled']);
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_input2.default, (0, _extends3.default)({}, props, {
            addonAfter: _react2.default.createElement(_icon2.default, { type: 'search', onClick: this.onClick, style: { cursor: 'pointer' } }),
            readOnly: true
          })),
          _react2.default.createElement(
            _modal2.default,
            {
              width: 600,
              title: field.label,
              visible: this.state.visible,
              onOk: this.handleOk,
              onCancel: this.handleCancel
            },
            _react2.default.createElement(_table2.default, {
              rowKey: this.state.rowKey,
              columns: this.state.columns,
              dataSource: this.state.dataSource.list,
              scroll: { y: 240 },
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
                  _this2.setState({ dataSource: dataSource }, _this2.fetchData);
                }
              },
              size: 'small'
            })
          )
        );
      }
    }]);
    return FanoFormRefTable;
  }(_react2.default.Component);

  exports.default = FanoFormRefTable;
});
//# sourceMappingURL=reftable.js.map