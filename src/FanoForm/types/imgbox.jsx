import React from 'react'
import { Upload, Icon, Modal } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormImgBox extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false,
      previewImage: null
    }
    this.handlePreview = this.handlePreview.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleCancel () {
    this.setState({ previewVisible: false })
  }

  handlePreview (file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleRemove (file) {
    console.log(file)
  }

  handleChange ({ file, fileList }) {
    console.log(file, fileList)
    this.props.onChange(fileList)
  }

  render () {
    const { field } = this.props.injectProps
    const props = getProps(this.props, [
      'disabled',
      'name',
      'action',
      'multiple',
      'withCredentials',
      'headers',
      'accept',
      'data',
      'customRequest'
    ])
    const { allowPreview, allowRemove, allowUpload } = field.props

    const { previewVisible, previewImage } = this.state
    let uploadButton = (
      <div>
        <Icon type={'plus'} />
        <div className={'ant-upload-text'}>Upload</div>
      </div>
    )
    props.showUploadList = {}
    if (allowPreview === false) {
      props.showUploadList.showPreviewIcon = false
    }
    if (allowRemove === false) {
      props.showUploadList.showRemoveIcon = false
    }
    if (allowUpload === false) {
      uploadButton = null
    }
    return (
      <div style={{ lineHeight: '100%', padding: '4px 0' }}>
        <Upload
          {...props}
          listType={'picture-card'}
          fileList={this.props.value || []}
          onPreview={this.handlePreview}
          onRemove={this.handleRemove}
          onChange={this.handleChange}
        >
          {this.props.value.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img
            alt={field.label}
            style={{ width: '100%' }}
            src={previewImage}
          />
        </Modal>
      </div>
    )
  }
}
