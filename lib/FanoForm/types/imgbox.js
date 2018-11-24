"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("antd/es/modal/style");

var _modal = _interopRequireDefault(require("antd/es/modal"));

require("antd/es/upload/style");

var _upload = _interopRequireDefault(require("antd/es/upload"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/es/icon/style");

var _icon = _interopRequireDefault(require("antd/es/icon"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _react = _interopRequireDefault(require("react"));

var _form = require("../../utils/form");

var FanoFormImgBox =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(FanoFormImgBox, _React$Component);

  function FanoFormImgBox(props) {
    var _this;

    (0, _classCallCheck2.default)(this, FanoFormImgBox);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(FanoFormImgBox).call(this, props));
    _this.state = {
      previewVisible: false,
      previewImage: null
    };
    _this.handlePreview = _this.handlePreview.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleCancel = _this.handleCancel.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleRemove = _this.handleRemove.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    _this.handleChange = _this.handleChange.bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
    return _this;
  }

  (0, _createClass2.default)(FanoFormImgBox, [{
    key: "handleCancel",
    value: function handleCancel() {
      this.setState({
        previewVisible: false
      });
    }
  }, {
    key: "handlePreview",
    value: function handlePreview(file) {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true
      });
    }
  }, {
    key: "handleRemove",
    value: function handleRemove(file) {
      console.log(file);
    }
  }, {
    key: "handleChange",
    value: function handleChange(_ref) {
      var file = _ref.file,
          fileList = _ref.fileList;
      console.log(file, fileList);
      this.props.onChange(fileList);
    }
  }, {
    key: "render",
    value: function render() {
      var field = this.props.injectProps.field;
      var props = (0, _form.getProps)(this.props, ['disabled', 'name', 'action', 'multiple', 'withCredentials', 'headers', 'accept', 'data', 'customRequest']);
      var _field$props = field.props,
          allowPreview = _field$props.allowPreview,
          allowRemove = _field$props.allowRemove,
          allowUpload = _field$props.allowUpload;
      var _this$state = this.state,
          previewVisible = _this$state.previewVisible,
          previewImage = _this$state.previewImage;

      var uploadButton = _react.default.createElement("div", null, _react.default.createElement(_icon.default, {
        type: 'plus'
      }), _react.default.createElement("div", {
        className: 'ant-upload-text'
      }, "Upload"));

      props.showUploadList = {};

      if (allowPreview === false) {
        props.showUploadList.showPreviewIcon = false;
      }

      if (allowRemove === false) {
        props.showUploadList.showRemoveIcon = false;
      }

      if (allowUpload === false) {
        uploadButton = null;
      }

      return _react.default.createElement("div", {
        style: {
          lineHeight: '100%',
          padding: '4px 0'
        }
      }, _react.default.createElement(_upload.default, (0, _extends2.default)({}, props, {
        listType: 'picture-card',
        fileList: this.props.value || [],
        onPreview: this.handlePreview,
        onRemove: this.handleRemove,
        onChange: this.handleChange
      }), this.props.value.length >= 3 ? null : uploadButton), _react.default.createElement(_modal.default, {
        visible: previewVisible,
        footer: null,
        onCancel: this.handleCancel
      }, _react.default.createElement("img", {
        alt: field.label,
        style: {
          width: '100%'
        },
        src: previewImage
      })));
    }
  }]);
  return FanoFormImgBox;
}(_react.default.Component);

exports.default = FanoFormImgBox;
//# sourceMappingURL=imgbox.js.map