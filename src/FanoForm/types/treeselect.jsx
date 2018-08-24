
import React from 'react'
import qs from 'qs'
import { TreeSelect } from 'antd'
import _ from 'lodash'
import arrayToTree from 'array-to-tree'
import { get } from '../../utils/request'
import { getProps } from '../../utils/form'

const TreeNode = TreeSelect.TreeNode

export default class FanoFormTreeSelect extends React.Component {
  constructor (props) {
    super(props)
    const { url, dict, max, simpleMode } = props.injectProps.field.props
    let { treeData = [] } = props.injectProps.field.props
    if (simpleMode) {
      this.transformKeysMap(treeData, simpleMode)
      treeData = this.transformSimpleData(treeData)
    }
    this.state = {
      url,
      dict,
      treeData,
      simpleMode,
      max,
      plainValues: this.getPlainValues(treeData),
      transformed: this.transformProps()
    }
    this.state.disabledOptions = this.getDisabledOptions(this.state.plainValues, this.props.value)
    this.state.multi = !!this.state.transformed.multi
    this.onChange = this.onChange.bind(this)
  }

  getPlainValues (treeData) {
    const recursive = (container, values) => {
      for (const item of values) {
        container.push(item.value)
        if (Array.isArray(item.children)) {
          recursive(container, item.children)
        }
      }
    }

    let plainValues = []
    recursive(plainValues, treeData)
    plainValues = _.uniq(plainValues)
    return plainValues
  }

  getDisabledOptions (plainValues, value) {
    const { max, multi } = this.state
    if (multi === true) {
      let disabledOptions = []
      if (_.isNumber(max) && value.length >= max) {
        if (value.length > max) {
          value = this.props.value
        }
        disabledOptions = _.difference(plainValues, value)
      }
      return disabledOptions
    }
    return this.state.disabledOptions || []
  }

  transformProps () {
    const props = {}
    const { max, allowInput, expandAll, ignoreCase = true } = this.props.injectProps.field.props
    if (_.isNumber(max)) {
      if (max > 1) {
        props.treeCheckable = true
      }
    }
    if (allowInput === true) {
      props.showSearch = true
    }
    if (expandAll === true) {
      props.treeDefaultExpandAll = true
    }
    props.multi = !!props.treeCheckable
    props.filterTreeNode = (inputValue, treeNode) => new RegExp(inputValue, ignoreCase === true ? 'mi' : 'm').test(treeNode.props.title)
    return props
  }

  transformSimpleData (treeData) {
    if (_.isEmpty(treeData)) {
      return treeData
    }
    const tree = arrayToTree(treeData, {
      customID: 'value',
      parentProperty: 'pid',
      childrenProperty: 'children'
    })
    return tree
  }

  transformKeysMap (treeData, keysMap) {
    if (!_.isPlainObject(keysMap)) {
      return
    }
    for (const item of treeData) {
      item.title = item[keysMap.titleKey]
      item.value = item[keysMap.valueKey]
      item.pid = item[keysMap.pidKey]
      delete item[keysMap.titleKey]
      delete item[keysMap.valueKey]
      delete item[keysMap.pidKey]
      if (Array.isArray(item.children)) {
        this.transformKeysMap(item.children, keysMap)
      }
    }
  }

  componentDidMount () {
    const { dictUrl } = this.props.injectProps.c
    if (_.isEmpty(this.state.treeData)) {
      if (!_.isEmpty(this.state.url)) {
        this.fetchOptions(this.state.url)
      } else if (!_.isEmpty(this.state.dict)) {
        if (_.isEmpty(dictUrl)) {
          throw new Error(`Invalid 'dictUrl'`)
        }
        this.fetchOptions(`${dictUrl}?${qs.stringify({
          cond: JSON.stringify({ code: this.state.dict }, null, 0)
        })}`)
      }
    }
  }

  fetchOptions (url) {
    const { beforeFetch } = this.props.injectProps.field.props
    if (_.isFunction(beforeFetch)) {
      url = beforeFetch(url, this.props.injectProps.field)
    }
    get(url)
      .then(json => {
        if (Array.isArray(_.get(json, 'list'))) {
          const state = {
            treeData: json.list,
            plainValues: this.getPlainValues(json.list)
          }
          if (this.state.simpleMode) {
            this.transformKeysMap(state.treeData, this.state.simpleMode)
            state.treeData = this.transformSimpleData(state.treeData)
          }
          state.disabledOptions = this.getDisabledOptions(state.plainValues, this.props.value)
          this.setState(state)
        } else {
          throw new Error(`Invalid 'url' format`)
        }
      })
      .catch(e => { throw e })
  }

  onChange (value) {
    this.setState({ disabledOptions: this.getDisabledOptions(this.state.plainValues, value) })
    return this.props.onChange(value)
  }

  renderTreeData (values) {
    const { disabledOptions } = this.state
    const array = []
    for (const item of values) {
      item.key = item.value
      item.disabled = disabledOptions.indexOf(item.value) >= 0
      item.disableCheckbox = item.disabled
      const props = _.pick(item, ['key', 'title', 'value', 'disableCheckbox', 'disabled', 'isLeaf'])
      if (Array.isArray(item.children)) {
        array.push(<TreeNode {...props}>{this.renderTreeData(item.children)}</TreeNode>)
      } else {
        array.push(<TreeNode {...props} />)
      }
    }
    return array
  }

  render () {
    const { treeData, transformed, multi } = this.state
    const props = getProps(this.props, [
      'placeholder',
      'allowClear',
      'disabled'
    ])
    Object.assign(props, transformed)
    if (multi === true) {
      props.onChange = this.onChange
    }
    return (
      <TreeSelect {...props}>
        {this.renderTreeData(treeData)}
      </TreeSelect>
    )
  }
}
