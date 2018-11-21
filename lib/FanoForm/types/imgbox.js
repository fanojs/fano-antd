(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'antd/es/modal', 'antd/es/upload', 'babel-runtime/helpers/extends', 'antd/es/icon', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', 'react', 'antd', '../../utils/form', './imgbox.less', 'antd/es/modal/style', 'antd/es/upload/style', 'antd/es/icon/style'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('antd/es/modal'), require('antd/es/upload'), require('babel-runtime/helpers/extends'), require('antd/es/icon'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('react'), require('antd'), require('../../utils/form'), require('./imgbox.less'), require('antd/es/modal/style'), require('antd/es/upload/style'), require('antd/es/icon/style'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.modal, global.upload, global._extends, global.icon, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.react, global.antd, global.form, global.imgbox, global.style, global.style, global.style);
    global.imgbox = mod.exports;
  }
})(this, function (exports, _modal, _upload, _extends2, _icon, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _react, _antd, _form, _imgbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _modal2 = _interopRequireDefault(_modal);

  var _upload2 = _interopRequireDefault(_upload);

  var _extends3 = _interopRequireDefault(_extends2);

  var _icon2 = _interopRequireDefault(_icon);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _react2 = _interopRequireDefault(_react);

  var _imgbox2 = _interopRequireDefault(_imgbox);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FanoFormImgBox = function (_React$Component) {
    (0, _inherits3.default)(FanoFormImgBox, _React$Component);

    function FanoFormImgBox(props) {
      (0, _classCallCheck3.default)(this, FanoFormImgBox);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FanoFormImgBox.__proto__ || (0, _getPrototypeOf2.default)(FanoFormImgBox)).call(this, props));

      _this.state = {
        previewVisible: false,
        previewImage: null
      };
      _this.handlePreview = _this.handlePreview.bind(_this);
      _this.handleCancel = _this.handleCancel.bind(_this);
      _this.handleRemove = _this.handleRemove.bind(_this);
      _this.handleChange = _this.handleChange.bind(_this);
      return _this;
    }

    (0, _createClass3.default)(FanoFormImgBox, [{
      key: 'handleCancel',
      value: function handleCancel() {
        this.setState({ previewVisible: false });
      }
    }, {
      key: 'handlePreview',
      value: function handlePreview(file) {
        this.setState({
          previewImage: file.url || file.thumbUrl,
          previewVisible: true
        });
      }
    }, {
      key: 'handleRemove',
      value: function handleRemove(file) {
        console.log(file);
      }
    }, {
      key: 'handleChange',
      value: function handleChange(_ref) {
        var file = _ref.file,
            fileList = _ref.fileList;

        console.log(file, fileList);
        this.props.onChange(fileList);
      }
    }, {
      key: 'render',
      value: function render() {
        var field = this.props.injectProps.field;

        var props = (0, _form.getProps)(this.props, ['disabled', 'name', 'action', 'multiple', 'withCredentials', 'headers', 'accept', 'data', 'customRequest']);
        var _field$props = field.props,
            allowPreview = _field$props.allowPreview,
            allowRemove = _field$props.allowRemove,
            allowUpload = _field$props.allowUpload;
        var _state = this.state,
            previewVisible = _state.previewVisible,
            previewImage = _state.previewImage;

        var uploadButton = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_icon2.default, { type: 'plus' }),
          _react2.default.createElement(
            'div',
            { className: 'ant-upload-text' },
            'Upload'
          )
        );
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
        return _react2.default.createElement(
          'div',
          { className: '' + _imgbox2.default.container },
          _react2.default.createElement(
            _upload2.default,
            (0, _extends3.default)({}, props, {
              listType: 'picture-card',
              fileList: this.props.value || [],
              onPreview: this.handlePreview,
              onRemove: this.handleRemove,
              onChange: this.handleChange
            }),
            this.props.value.length >= 3 ? null : uploadButton
          ),
          _react2.default.createElement(
            _modal2.default,
            {
              visible: previewVisible,
              footer: null,
              onCancel: this.handleCancel
            },
            _react2.default.createElement('img', {
              alt: field.label,
              style: { width: '100%' },
              src: previewImage
            })
          )
        );
      }
    }]);
    return FanoFormImgBox;
  }(_react2.default.Component);

  exports.default = FanoFormImgBox;
});
//# sourceMappingURL=imgbox.js.map