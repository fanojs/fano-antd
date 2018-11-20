import React, { Fragment } from 'react'
import _ from 'lodash'
import qs from 'qs'
import { Table, Button, Popconfirm, Divider, Icon, Checkbox, Modal, Radio, Row, Col, Tooltip, Alert, Input, message } from 'antd'
import { Resizable } from 'react-resizable'
import { get, del } from '../utils/request'
import { If } from '../components/Directives'
import styles from './DynamicTable.less'

export default class DynamicTable extends React.Component {
  constructor (props) {
    super(props)
    const cacheKey = `FanoTable_${props.config.name}_setting`.toUpperCase()
    const cachedSetting = this.loadSettingFromLocal(cacheKey)
    const data = {
      list: Array.isArray(props.values) ? props.values : []
    }
    const showActions = _.get(this, 'props.config.showActions', 'del,sync,new,delRow,editRow').split(',')
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
    this.handleDel = this.handleDel.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSync = this.handleSync.bind(this)
    this.handleSetting = this.handleSetting.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleRowClick = this.handleRowClick.bind(this)
    this.handleTableChange = this.handleTableChange.bind(this)
    this.handleColumnsSetting = this.handleColumnsSetting.bind(this)
    const setting = _.merge({
      size: 'middle',
      fixedHeader: true,
      rowSelected: true,
      checkbox: true,
      pageMode: true,
      loading: false
    }, props.config.setting, props.nativeSetting, props.expandSetting)
    if (!setting.version || (setting.version && setting.version === _.get(cachedSetting, 'setting.version'))) {
      _.merge(setting, cachedSetting.setting)
    } else {
      this.clearLocalSetting(cacheKey)
    }
    const columns = this.wrapColumnsDefaultProps(props.config.columns, showActions, setting)
    this.state = {
      cacheKey,
      actionsSize: this.transformActionsSize(),
      setting,
      data,
      columns,
      columnsSetting: cachedSetting.columnsSetting,
      showActions,
      selectedRowKeys: [],
      selectedRows: [],
      settingModalVisible: false
    }
  }

  loadSettingFromLocal (key) {
    const setting = JSON.parse(window.localStorage.getItem(key) || '{}')
    return {
      setting: _.omit(setting, 'columnsSetting'),
      columnsSetting: setting.columnsSetting || {}
    }
  }

  saveSettingToLocal (key, setting) {
    if (_.isPlainObject(setting)) {
      setting = JSON.stringify(setting)
    }
    window.localStorage.setItem(key, setting)
  }

  clearLocalSetting (key) {
    window.localStorage.removeItem(key)
  }

  componentWillMount () {
    this.fetchList()
  }

  getRowNoColumn () {
    return this.rowNoColumn || {
      title: 'No.',
      dataIndex: 'rowNo',
      width: 60
    }
  }

  wrapColumnsDefaultProps (rawColumns, showActions, setting) {
    let columns = []
    if (setting.rowNo && !rawColumns.find(item => item.dataIndex === 'rowNo')) {
      rawColumns.unshift(this.getRowNoColumn())
    }
    for (const column of rawColumns) {
      if (column.width === undefined) {
        column.width = setting.width || 150
      }
      if (column.width === '-' || !column.width) {
        delete column.width
      }
      const render = column.render
      if (_.isFunction(render)) {
        column.render = (text, record) => {
          text = render(text, record)
          if (column.tip) {
            text = <Tooltip title={text}>{text}</Tooltip>
          }
          return text
        }
      } else if (!['actions'].includes(column.dataIndex)) {
        column.render = (text) => {
          if (column.img) {
            text = <img src={text} alt={text} height={30} />
          } else {
            text = <span>{text}</span>
          }
          if (column.tip) {
            text = <Tooltip title={text}>{text}</Tooltip>
          }
          return text
        }
      }
      columns.push(column)
    }
    const presetActions = []
    if (showActions.includes('editRow')) {
      presetActions.push((text, record) => {
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
      presetActions.push((text, record) => {
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
    // 添加操作列
    const actionsColumn = {
      title: '操作',
      dataIndex: 'actions',
      fixed: 'right',
      width: 80,
      render: (text, record) => {
        const actions = _.cloneDeep(presetActions)
        const { actionsSize } = this.state
        if (Array.isArray(this.props.rowActions)) {
          for (const item of this.props.rowActions) {
            if (_.isFunction(item)) {
              actions.push(item(record, actionsSize))
            }
          }
        }
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
    columns = columns.filter(column => {
      if (column.width === '-') {
        delete column.width
      }
      if (column.dataIndex === 'actions') {
        _.merge(actionsColumn, column)
        return false
      }
      return true
    })
    columns.push(actionsColumn)
    this.rowNoColumn = _.find(columns, item => item.dataIndex === 'rowNo')
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
      for (let i = 0; i < json.list.length; i++) {
        const item = json.list[i]
        item.rowNo = (json.page - 1) * json.size + i + 1
      }
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

  async handleDel (record) {
    const { rowKey } = this.state.setting
    let { selectedRowKeys, selectedRows } = this.state
    if (record) {
      selectedRowKeys = [record[rowKey]]
      selectedRows = [record]
    }
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择需要删除的数据')
    }
    let success = false
    if (_.isFunction(this.props.onDel)) {
      this.props.onDel(selectedRowKeys, selectedRows)
      success = true
    } else {
      const { deleteUrl } = this.props.config
      if (deleteUrl) {
        const ret = await del(deleteUrl, {
          cond: {
            [rowKey]: selectedRowKeys
          }
        })
        if (ret) {
          message.success(`已成功删除 ${selectedRowKeys.length} 条记录`, 5)
          success = true
        }
      }
    }
    if (success) {
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      }, this.fetchList)
    }
  }

  handleSetting (key, value) {
    let { setting, columns } = this.state
    setting[key] = value
    if (_.isFunction(this.props.onSetting)) {
      this.props.onSetting(setting)
    }
    const state = { setting }
    if (key === 'size') {
      state.actionsSize = this.transformActionsSize(value)
    } else if (key === 'rowNo') {
      if (value) {
        columns.unshift(this.getRowNoColumn())
      } else {
        columns = columns.filter(item => item.dataIndex !== 'rowNo')
      }
      state.columns = columns
    }
    this.setState(state, () => {
      this.saveSettingToLocal(this.state.cacheKey, Object.assign({ columnsSetting: this.state.columnsSetting }, this.state.setting))
    })
  }

  transformActionsSize (settingSize) {
    return {
      'default': 'large',
      'middle': 'default',
      'small': 'small'
    }[settingSize] || 'default'
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

  handleSelect (selectedRowKeys, selectedRows) {
    this.setState({ selectedRowKeys, selectedRows })
  }

  handleColumnsSetting (column, key, value) {
    const { columnsSetting } = this.state
    _.set(columnsSetting, `${column.dataIndex}.${key}`, value)
    this.setState({ columnsSetting }, () => {
      this.saveSettingToLocal(this.state.cacheKey, Object.assign({ columnsSetting: this.state.columnsSetting }, this.state.setting))
    })
  }

  handleTableChange (pagination, filters, sorter) {
    const { data } = this.state
    if (pagination) {
      if (pagination.current) {
        data.page = pagination.current
      }
      if (pagination.pageSize) {
        data.size = pagination.pageSize
      }
    }
    if (sorter) {
      switch (sorter.order) {
        case 'ascend':
          data.sort = { [sorter.field]: 1 }
          break
        case 'descend':
          data.sort = { [sorter.field]: -1 }
          break
        default:
          data.sort = {}
          break
      }
    }
    if (filters) {
      data.cond = data.cond || {}
      for (const key in filters) {
        const value = filters[key]
        if (!value || (Array.isArray(value) && value.length === 0)) {
          delete data.cond[key]
          continue
        }
        if (Array.isArray(value)) {
          if (value.length === 1) {
            data.cond[key] = value[0]
          } else {
            data.cond[key] = {
              $in: value
            }
          }
        } else {
          data.cond[key] = value
        }
      }
    }
    this.setState({ data }, this.fetchList)
  }

  handleCond (key, value, likeMode, callback) {
    const { data } = this.state
    data.cond = data.cond || {}
    if (value) {
      if (likeMode && _.isString(value)) {
        data.cond[key] = {
          $regex: value,
          $options: 'mi'
        }
      } else {
        data.cond[key] = value
      }
    } else {
      delete data.cond[key]
    }
    this.setState({ data }, callback)
  }

  componentWillUnmount () {
    this.setState = () => {}
  }

  render () {
    const { data, selectedRowKeys, columns, settingModalVisible, columnsSetting, actionsSize, preData } = this.state
    const { tableActions } = this.props
    const setting = _.clone(this.state.setting)
    setting.columns = columns.filter(column => {
      const display = _.get(columnsSetting, `${column.dataIndex}.display`, true)
      if (_.get(columnsSetting, `${column.dataIndex}.sorter`, false)) {
        column.sorter = true
      } else {
        delete column.sorter
      }
      if (_.get(columnsSetting, `${column.dataIndex}.filter`, false)) {
        let keyword = _.get(data.cond, column.dataIndex)
        if (_.isPlainObject(keyword) && keyword.$regex) {
          keyword = keyword.$regex
        }

        if (keyword) {
          column.filterIcon = <Icon type={'filter'} theme={'filled'} style={{ color: '#108ee9' }} />
        } else {
          column.filterIcon = <Icon type={'filter'} style={{ color: '#aaa' }} />
        }
        const tips = `请输入${column.title}关键字`
        let inputPart
        if (column.title.length > 4) {
          inputPart = (
            <Tooltip title={tips}>
              <Input
                placeholder={tips}
                value={keyword}
                size={actionsSize}
                style={{ width: 170 }}
                onChange={e => this.handleCond(column.dataIndex, e.target.value, true)}
                onPressEnter={() => this.fetchList()}
              />
            </Tooltip>
          )
        } else {
          inputPart = (
            <Input
              placeholder={tips}
              value={keyword}
              size={actionsSize}
              style={{ width: 170 }}
              onChange={e => this.handleCond(column.dataIndex, e.target.value, true)}
              onPressEnter={() => this.fetchList()}
            />
          )
        }
        column.filterDropdown = (
          <div className={styles.customFilterDropdown}>
            {inputPart}
            <Button size={actionsSize} type={'primary'} onClick={() => this.fetchList()}>搜索</Button>
            <Button size={actionsSize} onClick={() => this.handleCond(column.dataIndex, null, false, this.fetchList)}>清空</Button>
          </div>
        )
      } else {
        delete column.filterDropdown
        delete column.filterIcon
      }
      return display
    })
    setting.dataSource = data.list
    if (setting.fixedHeader) {
      setting.scroll = { x: '110%', y: 500 }
    }
    if (setting.pageMode) {
      setting.pagination = {
        current: data.page || 1,
        pageSize: data.size,
        total: data.totalrecords
      }
    } else {
      setting.pagination = false
    }
    if (setting.checkbox) {
      setting.rowSelection = {
        fixed: true,
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
      setting.columns = columns.map((col, index) => {
        return Object.assign(col, {
          onHeaderCell: column => {
            return {
              width: column.width,
              onResize: this.handleResize(index)
            }
          }
        })
      })
    }
    setting.onChange = this.handleTableChange
    let customTableActions = []
    if (Array.isArray(tableActions)) {
      customTableActions = tableActions.map(item => item(actionsSize))
    }
    return (
      <div className={styles.container}>
        <div className={styles.toolbar} style={{ marginBottom: 16 }}>
          <div className={styles.actions}>
            <Button size={actionsSize} icon={'plus'} type={'primary'} onClick={this.handleAdd}>新增</Button>
            <Popconfirm
              title={'确认删除吗？'}
              onConfirm={() => {
                this.handleDel(null)
              }}
              okText={'确定'}
              cancelText={'取消'}
            >
              <Button size={actionsSize} icon={'delete'} type={'danger'}>删除</Button>
            </Popconfirm>
            <Button size={actionsSize} icon={'sync'} onClick={this.handleSync}>刷新</Button>
            {customTableActions}
          </div>
          <div className={styles.rightArea}>
            <Button
              icon={'setting'}
              size={actionsSize}
              onClick={() => {
                this.setState({
                  settingModalVisible: true
                })
              }}
            />
          </div>
        </div>
        <If cond={!setting.hideOnNoSelected || (setting.hideOnNoSelected === true && selectedRowKeys.length > 0)}>
          <Alert
            message={
              <Fragment>
                <span>
                  <Fragment>已选择</Fragment>
                  <a
                    style={{ fontWeight: 600, margin: '0 5px' }}
                    onClick={() => {
                      if (this.state.selectedRowKeys.length === 0) {
                        return
                      }
                      const { rowKey } = this.state.setting
                      const { data } = this.state
                      const state = {}
                      if (!this.state.preData) {
                        state.preData = _.cloneDeep(data)
                      }
                      data.cond = {
                        [rowKey]: {
                          $in: selectedRowKeys
                        }
                      }
                      data.page = 1
                      state.data = data
                      this.setState(state, this.fetchList)
                    }}
                  >
                    {selectedRowKeys.length}
                  </a>
                  <React.Fragment>行</React.Fragment>
                </span>
                <If cond={selectedRowKeys.length > 0}>
                  <a style={{ marginLeft: 24 }} onClick={() => (this.setState({ selectedRowKeys: [], selectedRows: [] }))}>清空</a>
                </If>
                <If cond={preData}>
                  <a
                    style={{ marginLeft: 8 }}
                    onClick={() => {
                      if (this.state.preData) {
                        this.setState({
                          data: this.state.preData,
                          preData: null
                        })
                      }
                    }}
                  >
                    撤销
                  </a>
                </If>
              </Fragment>
            }
            type={'info'}
            showIcon
            style={{ marginBottom: 16 }}
          />
        </If>
        <Table
          {...setting}
        />
        <Modal
          title={'Setting'}
          visible={settingModalVisible}
          onOk={() => {
            this.setState({
              settingModalVisible: false
            })
          }}
          onCancel={() => {
            this.setState({
              settingModalVisible: false
            })
          }}
          footer={null}
        >
          <Row>
            <Col span={24}>
              <section className={'fano-box'}>
                <div className={'fano-box-title'}>常用设置</div>
                <Row>
                  <Col span={8}><Checkbox checked={setting.bordered} onChange={e => (this.handleSetting('bordered', e.target.checked))}>显示边框</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.showHeader} onChange={e => (this.handleSetting('showHeader', e.target.checked))}>显示列头</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.checkbox} onChange={e => (this.handleSetting('checkbox', e.target.checked))}>显示选择框</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.fixedHeader} onChange={e => (this.handleSetting('fixedHeader', e.target.checked))}>固定表头</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.rowSelected} onChange={e => (this.handleSetting('rowSelected', e.target.checked))}>支持行选中</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.pageMode} onChange={e => (this.handleSetting('pageMode', e.target.checked))}>支持分页</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.resizeableHeader} onChange={e => (this.handleSetting('resizeableHeader', e.target.checked))}>伸缩列</Checkbox></Col>
                  <Col span={8}><Checkbox checked={setting.rowNo} onChange={e => (this.handleSetting('rowNo', e.target.checked))}>显示行号</Checkbox></Col>
                  <Col span={12}><Checkbox checked={setting.hideOnNoSelected} onChange={e => (this.handleSetting('hideOnNoSelected', e.target.checked))}>未选择时隐藏提示</Checkbox></Col>
                </Row>
              </section>
            </Col>
            <Col span={24}>
              <section className={'fano-box'}>
                <div className={'fano-box-title'}>尺寸设置</div>
                <Radio.Group
                  onChange={e => (this.handleSetting('size', e.target.value))}
                  value={setting.size}
                >
                  <Radio value={'default'}>Default</Radio>
                  <Radio value={'middle'}>Middle</Radio>
                  <Radio value={'small'}>Small</Radio>
                </Radio.Group>
              </section>
            </Col>
            <Col span={24}>
              <section className={'fano-box'}>
                <div className={'fano-box-title'}>字段设置</div>
                <div className={styles.fieldsSetting}>
                  {columns.map(column => {
                    return (
                      <div key={column.dataIndex} className={styles.fieldSetting}>
                        <Tooltip title={column.title}>
                          <span className={styles.fieldSettingLabel}>{column.title}：</span>
                        </Tooltip>
                        <Checkbox checked={_.get(columnsSetting, `${column.dataIndex}.display`, true)} onChange={e => (this.handleColumnsSetting(column, 'display', e.target.checked))}>是否显示</Checkbox>
                        <Checkbox checked={_.get(columnsSetting, `${column.dataIndex}.sorter`, false)} onChange={e => (this.handleColumnsSetting(column, 'sorter', e.target.checked))}>是否排序</Checkbox>
                        <Checkbox checked={_.get(columnsSetting, `${column.dataIndex}.filter`, false)} onChange={e => (this.handleColumnsSetting(column, 'filter', e.target.checked))}>快速筛选</Checkbox>
                      </div>
                    )
                  })}
                </div>
              </section>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}
