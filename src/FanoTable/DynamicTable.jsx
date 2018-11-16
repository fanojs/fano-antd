import React from 'react'
import _ from 'lodash'
import qs from 'qs'
import { Table, Button, Popconfirm, Divider, Icon, Popover, Checkbox } from 'antd'
import { Resizable } from 'react-resizable'
import { get } from '../utils/request'
import styles from './DynamicTable.less'

export default class DynamicTable extends React.Component {
  constructor (props) {
    super(props)
    const data = {
      list: Array.isArray(this.props.values) ? this.props.values : []
    }
    const showActions = _.get(this, 'props.config.showActions', 'del,sync,new,delRow,editRow').split(',')
    const columns = this.wrapColumnsDefaultProps(this.props.config.columns, showActions)
    this.handleResize = (index) => {
      return (e, { size }) => {
        this.setState(({ columns }) => {
          const nextColumns = [...columns]
          nextColumns[index] = Object.assign({}, nextColumns[index], {
            width: size.width
          })
          return { columns: nextColumns }
        })
      }
    }
    this.title = this.title.bind(this)
    this.handleDel = this.handleDel.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSync = this.handleSync.bind(this)
    this.handleSetting = this.handleSetting.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    const setting = _.merge({
      title: this.title,
      size: 'middle',
      fixedHeader: true,
      rowSelected: true,
      checkbox: true,
      pageMode: true,
      columns: columns.map((col, index) => {
        return Object.assign(col, {
          onHeaderCell: column => {
            return {
              width: column.width,
              onResize: this.handleResize(index)
            }
          }
        })
      }),
      loading: false
    }, props.config.setting, props.nativeSetting, props.expandSetting)
    this.state = {
      setting,
      data,
      columns,
      showActions,
      selectedRowKeys: [],
      selectedRows: []
    }
  }

  componentWillMount () {
    this.fetchList()
  }

  wrapColumnsDefaultProps (rawColumns, showActions) {
    const columns = []
    for (const column of rawColumns) {
      if (column.width === undefined) {
        column.width = 100
      }
      if (column.width === '-' || !column.width) {
        delete column.width
      }
      const render = column.render
      if (_.isFunction(render)) {
        column.render = (text, record) => <span>{render(text, record)}</span>
      } else {
        column.render = (text) => <span>{text}</span>
      }
      columns.push(column)
    }
    const actions = []
    if (showActions.includes('editRow')) {
      actions.push((text, record) => {
        return (
          <Icon
            key={'edit'}
            type={'edit'}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.handleEdit(record)
            }}
          />
        )
      })
    }
    if (showActions.includes('delRow')) {
      actions.push((text, record) => {
        return (
          <Popconfirm
            title={'确认删除吗？'}
            onConfirm={() => {
              this.handleDel(record)
            }}
            key={'del'}
            okText={'确定'}
            cancelText={'取消'}
          >
            <Icon key={'delete'} type={'delete'} style={{ cursor: 'pointer', color: '#f5222d' }} />
          </Popconfirm>
        )
      })
    }

    if (actions.length > 0) {
      const actionsColumn = {
        title: '操作',
        dataIndex: 'actions',
        width: 80,
        render: (text, record) => {
          const ret = []
          for (let i = 0; i < actions.length; i++) {
            let action = actions[i]
            if (_.isFunction(action)) {
              action = action(text, record)
            }
            ret.push(action)
            if (i < actions.length - 1) {
              ret.push(<Divider type={'vertical'} key={i} />)
            }
          }
          return ret
        }
      }
      Object.assign(actionsColumn, _.find(columns, item => item.dataIndex === 'actions') || {})
      columns.push(actionsColumn)
    }
    return columns
  }

  wrapQueryString (url) {
    const { data } = this.state
    const s = url.lastIndexOf('?')
    const query = {}
    if (s > 0) {
      Object.assign(query, qs.parse(url.substr(s + 1)))
      url = url.substring(0, s)
    }
    if (data.range) {
      query.range = data.range
    }
    if (data.page) {
      query.page = data.page
    }
    if (data.size) {
      query.size = data.size
    }
    if (data.sort) {
      if (_.isPlainObject(data.sort)) {
        const sort = []
        for (const key in data.sort) {
          const value = data.sort[key]
          if (parseInt(value) === -1) {
            sort.push(`-${key}`)
          } else {
            sort.push(key)
          }
        }
        query.sort = sort.join(',')
      } else if (_.isString(data.sort)) {
        query.sort = data.sort
      }
    }
    if (data.project) {
      if (_.isPlainObject(data.project)) {
        const project = []
        for (const key in data.project) {
          const value = data.project[key]
          if (parseInt(value) === 0) {
            project.push(`-${key}`)
          } else {
            project.push(key)
          }
        }
        query.project = project.join(',')
      } else if (_.isString(data.project)) {
        query.project = data.project
      }
    }
    if (data.cond) {
      if (_.isPlainObject(data.cond)) {
        query.cond = JSON.stringify(data.cond)
      } else if (_.isString(data.cond)) {
        query.cond = data.cond
      }
    }
    return `${url}?${qs.stringify(query)}`
  }

  resizeableTitle (props) {
    const { onResize, width } = props
    const restProps = _.omit(props, 'onResize', 'width')
    if (!width) {
      return <th {...restProps} />
    }
    return (
      <Resizable width={width} height={0} onResize={onResize}>
        <th {...restProps} />
      </Resizable>
    )
  }

  async fetchList () {
    let { setting } = this.state
    setting.loading = true
    this.setState({ setting })
    const { listUrl } = this.props.config
    const url = this.wrapQueryString(listUrl)
    const json = await get(url)
    setting = this.state.setting
    setting.loading = false
    if (Array.isArray(_.get(json, 'list'))) {
      this.setState({
        data: json,
        setting
      })
    } else {
      console.warn(`Invalid 'url' format`)
      this.setState({
        setting
      })
    }
  }

  handleSync () {
    this.fetchList()
  }

  handleAdd () {
    if (_.isFunction(this.props.onAdd)) {
      this.props.onAdd()
    }
  }

  handleEdit () {
    if (_.isFunction(this.props.onEdit)) {
      this.props.onEdit()
    }
  }

  handleDel (record) {
    const { rowKey } = this.state.setting
    let { selectedRowKeys, selectedRows } = this.state
    if (record) {
      selectedRowKeys = [record[rowKey]]
      selectedRows = [record]
    }
    if (_.isFunction(this.props.onDel)) {
      this.props.onDel(selectedRowKeys, selectedRows)
    }
    this.setState({
      selectedRowKeys: [],
      selectedRows: []
    })
    console.log(selectedRowKeys, selectedRows)
  }

  handleSetting (key, value) {
    const { setting } = this.state
    setting[key] = value
    if (_.isFunction(this.props.onSetting)) {
      this.props.onSetting(setting)
    }
    this.setState({ setting })
  }

  handleRowClick (record, e) {
    let { selectedRowKeys, selectedRows } = this.state
    const { rowKey } = this.state.setting
    const key = record[rowKey]
    if (selectedRowKeys.includes(key)) {
      selectedRowKeys = selectedRowKeys.filter(item => item !== key)
      selectedRows = selectedRows.filter(item => item[rowKey] !== key)
    } else {
      selectedRowKeys.push(key)
      selectedRows.push(record)
    }
    this.setState({ selectedRowKeys, selectedRows })
  }

  title () {
    const settingPopover = (
      <div>
        <div><Checkbox checked={this.state.setting.bordered} onChange={e => (this.handleSetting('bordered', e.target.checked))}>显示边框</Checkbox></div>
        <div><Checkbox checked={this.state.setting.showHeader} onChange={e => (this.handleSetting('showHeader', e.target.checked))}>显示列头</Checkbox></div>
        <div><Checkbox checked={this.state.setting.checkbox} onChange={e => (this.handleSetting('checkbox', e.target.checked))}>显示选择框</Checkbox></div>
        <div><Checkbox checked={this.state.setting.fixedHeader} onChange={e => (this.handleSetting('fixedHeader', e.target.checked))}>固定表头</Checkbox></div>
        <div><Checkbox checked={this.state.setting.rowSelected} onChange={e => (this.handleSetting('rowSelected', e.target.checked))}>支持行选中</Checkbox></div>
        <div><Checkbox checked={this.state.setting.pageMode} onChange={e => (this.handleSetting('pageMode', e.target.checked))}>支持分页</Checkbox></div>
      </div>
    )
    return (
      <div className={styles.toolbar}>
        <Button.Group size={'small'}>
          <Button icon={'plus'} type={'primary'} onClick={this.handleAdd} />
          <Popconfirm
            title={'确认删除吗？'}
            onConfirm={() => {
              this.handleDel(null)
            }}
            okText={'确定'}
            cancelText={'取消'}
          >
            <Button icon={'delete'} type={'danger'} />
          </Popconfirm>
          <Button icon={'sync'} onClick={this.handleSync} />
        </Button.Group>
        <Button.Group size={'small'}>
          <Popover content={settingPopover} trigger={'click'} placement={'bottomRight'}>
            <Button icon={'setting'} onClick={this.handleSetting} />
          </Popover>
        </Button.Group>
      </div>
    )
  }
  handleSelect (selectedRowKeys, selectedRows) {
    this.setState({ selectedRowKeys, selectedRows })
  }

  render () {
    const { data, selectedRowKeys } = this.state
    const setting = _.clone(this.state.setting)
    setting.dataSource = data.list
    if (setting.fixedHeader) {
      setting.scroll = { x: 1500, y: 500 }
    }
    if (setting.pageMode) {
      setting.pagination = {
        current: data.page || 1,
        pageSize: data.size,
        onChange: (page, size) => {
          const { data } = this.state
          data.page = page
          data.size = size
          this.setState({ data }, this.fetchList)
        },
        total: data.totalrecords
      }
    } else {
      setting.pagination = false
    }
    if (setting.checkbox) {
      setting.rowSelection = {
        selectedRowKeys,
        onChange: this.handleSelect
      }
      setting.rowSelection.type = setting.rowSelectedType
    }
    if (setting.rowSelected) {
      setting.onRow = record => ({
        onClick: () => {
          this.handleRowClick(record)
        }
      })
    }
    if (setting.resizeableHeader) {
      setting.components = {
        header: {
          cell: this.resizeableTitle
        }
      }
    }
    return (
      <div className={styles.container}>
        <Table
          {...setting}
        />
      </div>
    )
  }
}
