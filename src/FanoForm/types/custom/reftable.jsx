import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import { Input, Icon, Modal, Table } from 'antd'
import { getProps } from '../../../utils/form'
import { get } from '../../../utils/request'

export default class FanoFormRefTable extends React.Component {
  constructor (props) {
    super(props)
    const { field } = this.props.injectProps
    const columns = field.props.columns.map(item => {
      item.width = item.width || 150
      item.key = item.key || item.dataIndex
      _.merge(item, field.props.columnsExpand[item.dataIndex])
      return item
    })
    this.state = {
      visible: false,
      loading: false,
      columns,
      rowKey: field.props.rowKey || '_id',
      dataSource: {
        list: []
      }
    }
    this.onClick = this.onClick.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentDidMount () {
    this.fetchData()
  }

  onClick () {
    this.setState({
      visible: true
    })
  }

  async fetchData () {
    this.setState({ loading: true })
    const { field } = this.props.injectProps
    const query = qs.stringify({
      page: this.state.dataSource.page,
      size: this.state.dataSource.size
    })

    let url = field.props.listUrl
    if (url.lastIndexOf('?') >= 0) {
      url = `${url}&${query}`
    } else {
      url = `${url}?${query}`
    }
    const data = await get(`${url}`, {
      headers: field.props.headers
    })
    const state = { loading: false }
    if (data) {
      state.dataSource = data
    }
    this.setState(state)
  }

  handleOk () {
    this.setState({
      visible: false
    })
  }

  handleCancel () {
    this.setState({
      visible: false
    })
  }

  handleRowClick (record) {
    const value = record[this.state.rowKey]
    this.setState({
      visible: false
    })
    this.props.onChange(value)
  }

  render () {
    const { field } = this.props.injectProps
    const props = getProps(this.props, [
      'placeholder',
      'disabled'
    ])
    return (
      <div>
        <Input
          {...props}
          addonAfter={<Icon type={'search'} onClick={this.onClick} style={{ cursor: 'pointer' }} />}
          readOnly
        />
        <Modal
          width={600}
          title={field.label}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Table
            rowKey={this.state.rowKey}
            columns={this.state.columns}
            dataSource={this.state.dataSource.list}
            scroll={{ y: 240 }}
            loading={this.state.loading}
            onRow={record => {
              return {
                onClick: this.handleRowClick.bind(this, record)
              }
            }}
            pagination={{
              current: this.state.dataSource.page,
              pageSize: this.state.dataSource.size,
              total: this.state.dataSource.totalrecords,
              onChange: (page, size) => {
                const { dataSource } = this.state
                dataSource.page = page
                dataSource.size = size
                this.setState({ dataSource }, this.fetchData)
              }
            }}
            size={'small'}
          />
        </Modal>
      </div>
    )
  }
}
