"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/radio/style");

var _radio = _interopRequireDefault(require("antd/es/radio"));

require("antd/es/row/style");

var _row = _interopRequireDefault(require("antd/es/row"));

require("antd/es/col/style");

var _col = _interopRequireDefault(require("antd/es/col"));

require("antd/es/checkbox/style");

var _checkbox = _interopRequireDefault(require("antd/es/checkbox"));

require("antd/es/table/style");

var _table = _interopRequireDefault(require("antd/es/table"));

require("antd/es/alert/style");

var _alert = _interopRequireDefault(require("antd/es/alert"));

require("antd/es/button/style");

var _button = _interopRequireDefault(require("antd/es/button"));

require("antd/es/input/style");

var _input = _interopRequireDefault(require("antd/es/input"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/es/message/style");

var _message2 = _interopRequireDefault(require("antd/es/message"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

require("antd/es/tooltip/style");

var _tooltip = _interopRequireDefault(require("antd/es/tooltip"));

require("antd/es/divider/style");

var _divider = _interopRequireDefault(require("antd/es/divider"));

require("antd/es/popconfirm/style");

var _popconfirm = _interopRequireDefault(require("antd/es/popconfirm"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash"));

var _qs = _interopRequireDefault(require("qs"));

var _reactResizable = require("react-resizable");

var _request = require("../utils/request");

var _Directives = require("../components/Directives");

var DynamicTable =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(DynamicTable, _React$Component);

  function DynamicTable(props) {
    var _this;

    (0, _classCallCheck2.default)(this, DynamicTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(DynamicTable).call(this, props));
    var cacheKey = "FanoTable_".concat(props.config.name, "_setting").toUpperCase();

    var cachedSetting = _this.loadSettingFromLocal(cacheKey);

    var data = {
      list: Array.isArray(props.values) ? props.values : []
    };

    var showActions = _lodash.default.get((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'props.config.showActions', 'del,sync,new,delRow,editRow').split(',');

    _this.handleResize = function (index) {
      return function (e, _ref) {
        var size = _ref.size;

        _this.setState(function (_ref2) {
          var columns = _ref2.columns;
          var nextColumns = (0, _toConsumableArray2.default)(columns);
          nextColumns[index] = Object.assign({}, nextColumns[index], {
            width: size.width
          });
          return {
            columns: nextColumns
          };
        });
      };
    };

    _this.handleDel = _this.handleDel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleAdd = _this.handleAdd.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleEdit = _this.handleEdit.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSync = _this.handleSync.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSetting = _this.handleSetting.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleSelect = _this.handleSelect.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRowClick = _this.handleRowClick.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleTableChange = _this.handleTableChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleColumnsSetting = _this.handleColumnsSetting.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

    var setting = _lodash.default.merge({
      rowKey: '_id',
      size: 'middle',
      fixedHeader: true,
      rowSelected: true,
      checkbox: true,
      pageMode: true,
      loading: false
    }, props.config.setting, props.nativeSetting, props.expandSetting);

    if (!setting.version || setting.version && setting.version === _lodash.default.get(cachedSetting, 'setting.version')) {
      _lodash.default.merge(setting, cachedSetting.setting);
    } else {
      _this.clearLocalSetting(cacheKey);
    }

    var columns = _this.wrapColumnsDefaultProps(props.config.columns, showActions, setting);

    _this.state = {
      cacheKey: cacheKey,
      actionsSize: _this.transformActionsSize(),
      setting: setting,
      data: data,
      columns: columns,
      columnsSetting: cachedSetting.columnsSetting,
      showActions: showActions,
      selectedRowKeys: [],
      selectedRows: [],
      settingModalVisible: false
    };
    return _this;
  }

  (0, _createClass2.default)(DynamicTable, [{
    key: "loadSettingFromLocal",
    value: function loadSettingFromLocal(key) {
      var setting = JSON.parse(window.localStorage.getItem(key) || '{}');
      return {
        setting: _lodash.default.omit(setting, 'columnsSetting'),
        columnsSetting: setting.columnsSetting || {}
      };
    }
  }, {
    key: "saveSettingToLocal",
    value: function saveSettingToLocal(key, setting) {
      if (_lodash.default.isPlainObject(setting)) {
        setting = JSON.stringify(setting);
      }

      window.localStorage.setItem(key, setting);
    }
  }, {
    key: "clearLocalSetting",
    value: function clearLocalSetting(key) {
      window.localStorage.removeItem(key);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      this.fetchList();
    }
  }, {
    key: "getRowNoColumn",
    value: function getRowNoColumn() {
      return this.rowNoColumn || {
        title: 'No.',
        dataIndex: 'rowNo',
        width: 60
      };
    }
  }, {
    key: "wrapColumnsDefaultProps",
    value: function wrapColumnsDefaultProps(rawColumns, showActions, setting) {
      var _this2 = this;

      var columns = [];

      if (setting.rowNo && !rawColumns.find(function (item) {
        return item.dataIndex === 'rowNo';
      })) {
        rawColumns.unshift(this.getRowNoColumn());
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var column = _step.value;

          if (column.width === undefined) {
            column.width = setting.width || 150;
          }

          var render = column.render;

          if (_lodash.default.isFunction(render)) {
            column.render = function (text, record) {
              text = render(text, record);

              if (column.tip) {
                text = _react.default.createElement(_tooltip.default, {
                  title: text
                }, text);
              }

              return text;
            };
          } else if (!['actions'].includes(column.dataIndex)) {
            column.render = function (text) {
              if (column.img) {
                text = _react.default.createElement("img", {
                  src: text,
                  alt: text,
                  height: 30
                });
              } else {
                text = _react.default.createElement("span", null, text);
              }

              if (column.tip) {
                text = _react.default.createElement(_tooltip.default, {
                  title: text
                }, text);
              }

              return text;
            };
          }

          columns.push(column);
        };

        for (var _iterator = rawColumns[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          _loop();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var presetActions = [];

      if (showActions.includes('editRow')) {
        presetActions.push(function (text, record) {
          return _react.default.createElement(_icon.default, {
            key: 'edit',
            type: 'edit',
            style: {
              cursor: 'pointer'
            },
            onClick: function onClick() {
              _this2.handleEdit(record);
            }
          });
        });
      }

      if (showActions.includes('delRow')) {
        presetActions.push(function (text, record) {
          return _react.default.createElement(_popconfirm.default, {
            title: '确认删除吗？',
            onConfirm: function onConfirm() {
              _this2.handleDel(record);
            },
            key: 'del',
            okText: '确定',
            cancelText: '取消'
          }, _react.default.createElement(_icon.default, {
            key: 'delete',
            type: 'delete',
            style: {
              cursor: 'pointer',
              color: '#f5222d'
            }
          }));
        });
      } // 添加操作列


      var actionsColumn = {
        title: '操作',
        dataIndex: 'actions',
        fixed: 'right',
        width: 80,
        render: function render(text, record) {
          var actions = _lodash.default.cloneDeep(presetActions);

          var actionsSize = _this2.state.actionsSize;

          if (Array.isArray(_this2.props.rowActions)) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _this2.props.rowActions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var item = _step2.value;

                if (_lodash.default.isFunction(item)) {
                  actions.push(item(record, actionsSize));
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }

          var ret = [];

          for (var i = 0; i < actions.length; i++) {
            var action = actions[i];

            if (_lodash.default.isFunction(action)) {
              action = action(text, record);
            }

            ret.push(action);

            if (i < actions.length - 1) {
              ret.push(_react.default.createElement(_divider.default, {
                type: 'vertical',
                key: i
              }));
            }
          }

          return ret;
        }
      };
      columns = columns.filter(function (column) {
        if (column.dataIndex === 'actions') {
          _lodash.default.merge(actionsColumn, column);

          if (actionsColumn.width === '-' || !actionsColumn.width) {
            delete actionsColumn.width;
          }

          return false;
        }

        if (column.width === '-' || !column.width) {
          delete column.width;
        }

        return true;
      });
      columns.push(actionsColumn);
      this.rowNoColumn = _lodash.default.find(columns, function (item) {
        return item.dataIndex === 'rowNo';
      });
      return columns;
    }
  }, {
    key: "wrapQueryString",
    value: function wrapQueryString(url) {
      var data = this.state.data;
      var s = url.lastIndexOf('?');
      var query = {};

      if (s > 0) {
        Object.assign(query, _qs.default.parse(url.substr(s + 1)));
        url = url.substring(0, s);
      }

      if (data.range) {
        query.range = data.range;
      }

      if (data.page) {
        query.page = data.page;
      }

      if (data.size) {
        query.size = data.size;
      }

      if (data.sort) {
        if (_lodash.default.isPlainObject(data.sort)) {
          var sort = [];

          for (var key in data.sort) {
            var value = data.sort[key];

            if (parseInt(value) === -1) {
              sort.push("-".concat(key));
            } else {
              sort.push(key);
            }
          }

          query.sort = sort.join(',');
        } else if (_lodash.default.isString(data.sort)) {
          query.sort = data.sort;
        }
      }

      if (data.project) {
        if (_lodash.default.isPlainObject(data.project)) {
          var project = [];

          for (var _key in data.project) {
            var _value = data.project[_key];

            if (parseInt(_value) === 0) {
              project.push("-".concat(_key));
            } else {
              project.push(_key);
            }
          }

          query.project = project.join(',');
        } else if (_lodash.default.isString(data.project)) {
          query.project = data.project;
        }
      }

      if (data.cond) {
        if (_lodash.default.isPlainObject(data.cond)) {
          query.cond = JSON.stringify(data.cond);
        } else if (_lodash.default.isString(data.cond)) {
          query.cond = data.cond;
        }
      }

      return "".concat(url, "?").concat(_qs.default.stringify(query));
    }
  }, {
    key: "resizeableTitle",
    value: function resizeableTitle(props) {
      var onResize = props.onResize,
          width = props.width;

      var restProps = _lodash.default.omit(props, 'onResize', 'width');

      if (!width) {
        return _react.default.createElement("th", restProps);
      }

      return _react.default.createElement(_reactResizable.Resizable, {
        width: width,
        height: 0,
        onResize: onResize
      }, _react.default.createElement("th", restProps));
    }
  }, {
    key: "fetchList",
    value: function () {
      var _fetchList = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var setting, listUrl, url, json, i, item;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setting = this.state.setting;
                setting.loading = true;
                this.setState({
                  setting: setting
                });
                listUrl = this.props.config.listUrl;
                url = this.wrapQueryString(listUrl);
                _context.next = 7;
                return (0, _request.get)(url);

              case 7:
                json = _context.sent;
                setting = this.state.setting;
                setting.loading = false;

                if (Array.isArray(_lodash.default.get(json, 'list'))) {
                  for (i = 0; i < json.list.length; i++) {
                    item = json.list[i];
                    item.rowNo = (json.page - 1) * json.size + i + 1;
                  }

                  this.setState({
                    data: json,
                    setting: setting
                  });
                } else {
                  console.warn("Invalid 'url' format");
                  this.setState({
                    setting: setting
                  });
                }

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function fetchList() {
        return _fetchList.apply(this, arguments);
      };
    }()
  }, {
    key: "handleSync",
    value: function handleSync() {
      this.fetchList();
    }
  }, {
    key: "handleAdd",
    value: function handleAdd() {
      if (_lodash.default.isFunction(this.props.onAdd)) {
        this.props.onAdd();
      }
    }
  }, {
    key: "handleEdit",
    value: function handleEdit() {
      if (_lodash.default.isFunction(this.props.onEdit)) {
        this.props.onEdit();
      }
    }
  }, {
    key: "handleDel",
    value: function () {
      var _handleDel = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(record) {
        var rowKey, _this$state, selectedRowKeys, selectedRows, success, deleteUrl, ret;

        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                rowKey = this.state.setting.rowKey;
                _this$state = this.state, selectedRowKeys = _this$state.selectedRowKeys, selectedRows = _this$state.selectedRows;

                if (record) {
                  selectedRowKeys = [record[rowKey]];
                  selectedRows = [record];
                }

                if (selectedRowKeys.length === 0) {
                  _message2.default.warning('请先选择需要删除的数据');
                }

                success = false;

                if (!_lodash.default.isFunction(this.props.onDel)) {
                  _context2.next = 10;
                  break;
                }

                this.props.onDel(selectedRowKeys, selectedRows);
                success = true;
                _context2.next = 16;
                break;

              case 10:
                deleteUrl = this.props.config.deleteUrl;

                if (!deleteUrl) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 14;
                return (0, _request.del)(deleteUrl, {
                  cond: (0, _defineProperty2.default)({}, rowKey, selectedRowKeys)
                });

              case 14:
                ret = _context2.sent;

                if (ret) {
                  _message2.default.success("\u5DF2\u6210\u529F\u5220\u9664 ".concat(selectedRowKeys.length, " \u6761\u8BB0\u5F55"), 5);

                  success = true;
                }

              case 16:
                if (success) {
                  this.setState({
                    selectedRowKeys: [],
                    selectedRows: []
                  }, this.fetchList);
                }

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function handleDel(_x) {
        return _handleDel.apply(this, arguments);
      };
    }()
  }, {
    key: "handleSetting",
    value: function handleSetting(key, value) {
      var _this3 = this;

      var _this$state2 = this.state,
          setting = _this$state2.setting,
          columns = _this$state2.columns;
      setting[key] = value;

      if (_lodash.default.isFunction(this.props.onSetting)) {
        this.props.onSetting(setting);
      }

      var state = {
        setting: setting
      };

      if (key === 'size') {
        state.actionsSize = this.transformActionsSize(value);
      } else if (key === 'rowNo') {
        if (value) {
          columns.unshift(this.getRowNoColumn());
        } else {
          columns = columns.filter(function (item) {
            return item.dataIndex !== 'rowNo';
          });
        }

        state.columns = columns;
      }

      this.setState(state, function () {
        _this3.saveSettingToLocal(_this3.state.cacheKey, Object.assign({
          columnsSetting: _this3.state.columnsSetting
        }, _this3.state.setting));
      });
    }
  }, {
    key: "transformActionsSize",
    value: function transformActionsSize(settingSize) {
      return {
        'default': 'large',
        'middle': 'default',
        'small': 'small'
      }[settingSize] || 'default';
    }
  }, {
    key: "handleRowClick",
    value: function handleRowClick(record, e) {
      var _this$state3 = this.state,
          selectedRowKeys = _this$state3.selectedRowKeys,
          selectedRows = _this$state3.selectedRows;
      var rowKey = this.state.setting.rowKey;
      var key = record[rowKey];

      if (selectedRowKeys.includes(key)) {
        selectedRowKeys = selectedRowKeys.filter(function (item) {
          return item !== key;
        });
        selectedRows = selectedRows.filter(function (item) {
          return item[rowKey] !== key;
        });
      } else {
        selectedRowKeys.push(key);
        selectedRows.push(record);
      }

      this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      });
    }
  }, {
    key: "handleSelect",
    value: function handleSelect(selectedRowKeys, selectedRows) {
      this.setState({
        selectedRowKeys: selectedRowKeys,
        selectedRows: selectedRows
      });
    }
  }, {
    key: "handleColumnsSetting",
    value: function handleColumnsSetting(column, key, value) {
      var _this4 = this;

      var columnsSetting = this.state.columnsSetting;

      _lodash.default.set(columnsSetting, "".concat(column.dataIndex, ".").concat(key), value);

      this.setState({
        columnsSetting: columnsSetting
      }, function () {
        _this4.saveSettingToLocal(_this4.state.cacheKey, Object.assign({
          columnsSetting: _this4.state.columnsSetting
        }, _this4.state.setting));
      });
    }
  }, {
    key: "handleTableChange",
    value: function handleTableChange(pagination, filters, sorter) {
      var data = this.state.data;

      if (pagination) {
        if (pagination.current) {
          data.page = pagination.current;
        }

        if (pagination.pageSize) {
          data.size = pagination.pageSize;
        }
      }

      if (sorter) {
        switch (sorter.order) {
          case 'ascend':
            data.sort = (0, _defineProperty2.default)({}, sorter.field, 1);
            break;

          case 'descend':
            data.sort = (0, _defineProperty2.default)({}, sorter.field, -1);
            break;

          default:
            data.sort = {};
            break;
        }
      }

      if (filters) {
        data.cond = data.cond || {};

        for (var key in filters) {
          var value = filters[key];

          if (!value || Array.isArray(value) && value.length === 0) {
            delete data.cond[key];
            continue;
          }

          if (Array.isArray(value)) {
            if (value.length === 1) {
              data.cond[key] = value[0];
            } else {
              data.cond[key] = {
                $in: value
              };
            }
          } else {
            data.cond[key] = value;
          }
        }
      }

      this.setState({
        data: data
      }, this.fetchList);
    }
  }, {
    key: "handleCond",
    value: function handleCond(key, value, likeMode, callback) {
      var data = this.state.data;
      data.cond = data.cond || {};

      if (value) {
        if (likeMode && _lodash.default.isString(value)) {
          data.cond[key] = {
            $regex: value,
            $options: 'mi'
          };
        } else {
          data.cond[key] = value;
        }
      } else {
        delete data.cond[key];
      }

      this.setState({
        data: data
      }, callback);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.setState = function () {};
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state4 = this.state,
          data = _this$state4.data,
          selectedRowKeys = _this$state4.selectedRowKeys,
          columns = _this$state4.columns,
          settingModalVisible = _this$state4.settingModalVisible,
          columnsSetting = _this$state4.columnsSetting,
          actionsSize = _this$state4.actionsSize,
          preData = _this$state4.preData;
      var tableActions = this.props.tableActions;

      var setting = _lodash.default.clone(this.state.setting);

      setting.columns = columns.filter(function (column) {
        var display = _lodash.default.get(columnsSetting, "".concat(column.dataIndex, ".display"), true);

        if (_lodash.default.get(columnsSetting, "".concat(column.dataIndex, ".sorter"), false)) {
          column.sorter = true;
        } else {
          delete column.sorter;
        }

        if (_lodash.default.get(columnsSetting, "".concat(column.dataIndex, ".filter"), false)) {
          var keyword = _lodash.default.get(data.cond, column.dataIndex);

          if (_lodash.default.isPlainObject(keyword) && keyword.$regex) {
            keyword = keyword.$regex;
          }

          if (keyword) {
            column.filterIcon = _react.default.createElement(_icon.default, {
              type: 'filter',
              theme: 'filled',
              style: {
                color: '#108ee9'
              }
            });
          } else {
            column.filterIcon = _react.default.createElement(_icon.default, {
              type: 'filter',
              style: {
                color: '#aaa'
              }
            });
          }

          var tips = "\u8BF7\u8F93\u5165".concat(column.title, "\u5173\u952E\u5B57");
          var inputPart;

          if (column.title.length > 4) {
            inputPart = _react.default.createElement(_tooltip.default, {
              title: tips
            }, _react.default.createElement(_input.default, {
              placeholder: tips,
              value: keyword,
              size: actionsSize,
              style: {
                width: 170
              },
              onChange: function onChange(e) {
                return _this5.handleCond(column.dataIndex, e.target.value, true);
              },
              onPressEnter: function onPressEnter() {
                return _this5.fetchList();
              }
            }));
          } else {
            inputPart = _react.default.createElement(_input.default, {
              placeholder: tips,
              value: keyword,
              size: actionsSize,
              style: {
                width: 170
              },
              onChange: function onChange(e) {
                return _this5.handleCond(column.dataIndex, e.target.value, true);
              },
              onPressEnter: function onPressEnter() {
                return _this5.fetchList();
              }
            });
          }

          column.filterDropdown = _react.default.createElement("div", {
            className: 'fano-table-custom-filter-dropdown'
          }, inputPart, _react.default.createElement(_button.default, {
            size: actionsSize,
            type: 'primary',
            onClick: function onClick() {
              return _this5.fetchList();
            }
          }, "\u641C\u7D22"), _react.default.createElement(_button.default, {
            size: actionsSize,
            onClick: function onClick() {
              return _this5.handleCond(column.dataIndex, null, false, _this5.fetchList);
            }
          }, "\u6E05\u7A7A"));
        } else {
          delete column.filterDropdown;
          delete column.filterIcon;
        }

        return display;
      });
      setting.dataSource = data.list;

      if (setting.fixedHeader) {
        setting.scroll = {
          x: '110%',
          y: 500
        };
      }

      if (setting.pageMode) {
        setting.pagination = {
          current: data.page || 1,
          pageSize: data.size,
          total: data.totalrecords
        };
      } else {
        setting.pagination = false;
      }

      if (setting.checkbox) {
        setting.rowSelection = {
          fixed: true,
          selectedRowKeys: selectedRowKeys,
          onChange: this.handleSelect
        };
        setting.rowSelection.type = setting.rowSelectedType;
      }

      if (setting.rowSelected) {
        setting.onRow = function (record) {
          return {
            onClick: function onClick() {
              _this5.handleRowClick(record);
            }
          };
        };
      }

      if (setting.resizeableHeader) {
        setting.components = {
          header: {
            cell: this.resizeableTitle
          }
        };
        setting.columns = columns.map(function (col, index) {
          return Object.assign(col, {
            onHeaderCell: function onHeaderCell(column) {
              return {
                width: column.width,
                onResize: _this5.handleResize(index)
              };
            }
          });
        });
      }

      setting.onChange = this.handleTableChange;
      var customTableActions = [];

      if (Array.isArray(tableActions)) {
        customTableActions = tableActions.map(function (item) {
          return item(actionsSize);
        });
      }

      return _react.default.createElement("div", {
        className: 'fano-table-container'
      }, _react.default.createElement("div", {
        className: 'fano-table-toolbar',
        style: {
          marginBottom: 16
        }
      }, _react.default.createElement("div", {
        className: 'fano-table-actions'
      }, _react.default.createElement(_button.default, {
        size: actionsSize,
        icon: 'plus',
        type: 'primary',
        onClick: this.handleAdd
      }, "\u65B0\u589E"), _react.default.createElement(_popconfirm.default, {
        title: '确认删除吗？',
        onConfirm: function onConfirm() {
          _this5.handleDel(null);
        },
        okText: '确定',
        cancelText: '取消'
      }, _react.default.createElement(_button.default, {
        size: actionsSize,
        icon: 'delete',
        type: 'danger'
      }, "\u5220\u9664")), _react.default.createElement(_button.default, {
        size: actionsSize,
        icon: 'sync',
        onClick: this.handleSync
      }, "\u5237\u65B0"), customTableActions), _react.default.createElement("div", {
        className: 'fano-table-right-area'
      }, _react.default.createElement(_button.default, {
        icon: 'setting',
        size: actionsSize,
        onClick: function onClick() {
          _this5.setState({
            settingModalVisible: true
          });
        }
      }))), _react.default.createElement(_Directives.If, {
        cond: !setting.hideOnNoSelected || setting.hideOnNoSelected === true && selectedRowKeys.length > 0
      }, _react.default.createElement(_alert.default, {
        message: _react.default.createElement(_react.Fragment, null, _react.default.createElement("span", null, _react.default.createElement(_react.Fragment, null, "\u5DF2\u9009\u62E9"), _react.default.createElement("a", {
          style: {
            fontWeight: 600,
            margin: '0 5px'
          },
          onClick: function onClick() {
            if (_this5.state.selectedRowKeys.length === 0 || _this5.state.preData) {
              return;
            }

            _this5.setState({
              preData: _lodash.default.cloneDeep(_this5.state.data),
              data: Object.assign(_lodash.default.cloneDeep(_this5.state.data), {
                page: 1,
                list: _this5.state.selectedRows,
                totalrecords: _this5.state.selectedRowKeys.length
              })
            });
          }
        }, selectedRowKeys.length), _react.default.createElement(_react.default.Fragment, null, "\u884C")), _react.default.createElement(_Directives.If, {
          cond: selectedRowKeys.length > 0
        }, _react.default.createElement("a", {
          style: {
            marginLeft: 24
          },
          onClick: function onClick() {
            return _this5.setState({
              selectedRowKeys: [],
              selectedRows: []
            });
          }
        }, "\u6E05\u7A7A")), _react.default.createElement(_Directives.If, {
          cond: preData
        }, _react.default.createElement("a", {
          style: {
            marginLeft: 8
          },
          onClick: function onClick() {
            if (_this5.state.preData) {
              _this5.setState({
                data: _this5.state.preData,
                preData: null
              });
            }
          }
        }, "\u64A4\u9500"))),
        type: 'info',
        showIcon: true,
        style: {
          marginBottom: 16
        }
      })), _react.default.createElement(_table.default, setting), _react.default.createElement(_modal.default, {
        title: 'Setting',
        visible: settingModalVisible,
        onOk: function onOk() {
          _this5.setState({
            settingModalVisible: false
          });
        },
        onCancel: function onCancel() {
          _this5.setState({
            settingModalVisible: false
          });
        },
        footer: null
      }, _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
        span: 24
      }, _react.default.createElement("section", {
        className: 'fano-box'
      }, _react.default.createElement("div", {
        className: 'fano-box-title'
      }, "\u5E38\u7528\u8BBE\u7F6E"), _react.default.createElement(_row.default, null, _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.bordered,
        onChange: function onChange(e) {
          return _this5.handleSetting('bordered', e.target.checked);
        }
      }, "\u663E\u793A\u8FB9\u6846")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.showHeader,
        onChange: function onChange(e) {
          return _this5.handleSetting('showHeader', e.target.checked);
        }
      }, "\u663E\u793A\u5217\u5934")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.checkbox,
        onChange: function onChange(e) {
          return _this5.handleSetting('checkbox', e.target.checked);
        }
      }, "\u663E\u793A\u9009\u62E9\u6846")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.fixedHeader,
        onChange: function onChange(e) {
          return _this5.handleSetting('fixedHeader', e.target.checked);
        }
      }, "\u56FA\u5B9A\u8868\u5934")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.rowSelected,
        onChange: function onChange(e) {
          return _this5.handleSetting('rowSelected', e.target.checked);
        }
      }, "\u652F\u6301\u884C\u9009\u4E2D")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.pageMode,
        onChange: function onChange(e) {
          return _this5.handleSetting('pageMode', e.target.checked);
        }
      }, "\u652F\u6301\u5206\u9875")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.resizeableHeader,
        onChange: function onChange(e) {
          return _this5.handleSetting('resizeableHeader', e.target.checked);
        }
      }, "\u4F38\u7F29\u5217")), _react.default.createElement(_col.default, {
        span: 8
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.rowNo,
        onChange: function onChange(e) {
          return _this5.handleSetting('rowNo', e.target.checked);
        }
      }, "\u663E\u793A\u884C\u53F7")), _react.default.createElement(_col.default, {
        span: 12
      }, _react.default.createElement(_checkbox.default, {
        checked: setting.hideOnNoSelected,
        onChange: function onChange(e) {
          return _this5.handleSetting('hideOnNoSelected', e.target.checked);
        }
      }, "\u672A\u9009\u62E9\u65F6\u9690\u85CF\u63D0\u793A"))))), _react.default.createElement(_col.default, {
        span: 24
      }, _react.default.createElement("section", {
        className: 'fano-box'
      }, _react.default.createElement("div", {
        className: 'fano-box-title'
      }, "\u5C3A\u5BF8\u8BBE\u7F6E"), _react.default.createElement(_radio.default.Group, {
        onChange: function onChange(e) {
          return _this5.handleSetting('size', e.target.value);
        },
        value: setting.size
      }, _react.default.createElement(_radio.default, {
        value: 'default'
      }, "Default"), _react.default.createElement(_radio.default, {
        value: 'middle'
      }, "Middle"), _react.default.createElement(_radio.default, {
        value: 'small'
      }, "Small")))), _react.default.createElement(_col.default, {
        span: 24
      }, _react.default.createElement("section", {
        className: 'fano-box'
      }, _react.default.createElement("div", {
        className: 'fano-box-title'
      }, "\u5B57\u6BB5\u8BBE\u7F6E"), _react.default.createElement("div", {
        className: 'fano-table-fields-setting'
      }, columns.map(function (column) {
        return _react.default.createElement("div", {
          key: column.dataIndex,
          className: 'fano-table-field-setting'
        }, _react.default.createElement(_tooltip.default, {
          title: column.title
        }, _react.default.createElement("span", {
          className: 'fano-table-field-setting-label'
        }, column.title, "\uFF1A")), _react.default.createElement(_checkbox.default, {
          checked: _lodash.default.get(columnsSetting, "".concat(column.dataIndex, ".display"), true),
          onChange: function onChange(e) {
            return _this5.handleColumnsSetting(column, 'display', e.target.checked);
          }
        }, "\u662F\u5426\u663E\u793A"), _react.default.createElement(_checkbox.default, {
          checked: _lodash.default.get(columnsSetting, "".concat(column.dataIndex, ".sorter"), false),
          onChange: function onChange(e) {
            return _this5.handleColumnsSetting(column, 'sorter', e.target.checked);
          }
        }, "\u662F\u5426\u6392\u5E8F"), _react.default.createElement(_checkbox.default, {
          checked: _lodash.default.get(columnsSetting, "".concat(column.dataIndex, ".filter"), false),
          onChange: function onChange(e) {
            return _this5.handleColumnsSetting(column, 'filter', e.target.checked);
          }
        }, "\u5FEB\u901F\u7B5B\u9009"));
      })))))));
    }
  }]);
  return DynamicTable;
}(_react.default.Component);

exports.default = DynamicTable;
//# sourceMappingURL=DynamicTable.js.map