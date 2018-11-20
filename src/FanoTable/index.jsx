import React from 'react'
import qs from 'qs'
import _ from 'lodash'
import { get } from '../utils/request'
import DynamicTable from './DynamicTable'

if (!_.isFunction(window.L)) {
  window.L = (key, value) => {
    return value || key
  }
}

/**
 * 表格组件
 */
class FanoTable { }

FanoTable.c = {}

/**
 * 全局配置
 * @param {*} options 配置项
 */
FanoTable.config = (options) => {
  if (_.isPlainObject(options)) {
    _.merge(FanoTable.c, options)
  } else {
    throw new Error(`Invalid options`)
  }
}

/**
 * 使用JSON配置生成表格
 * @param {*} json JSON配置
 */
FanoTable.fromJson = (json) => {
  return (
    class FanoComponent extends React.Component {
      constructor (props) {
        super(props)
        this.combineExpandProps(json)
      }

      combineExpandProps (json) {
        const { columnExpand } = this.props
        if (!_.isPlainObject(columnExpand)) {
          return
        }

        for (const column of json.columns) {
          const expand = columnExpand[column.dataIndex]
          if (_.isPlainObject(expand)) {
            _.merge(column, expand)
          }
          delete columnExpand[column.dataIndex]
        }
        if (Object.keys(columnExpand).length > 0) {
          for (const dataIndex in columnExpand) {
            const value = columnExpand[dataIndex]
            value.dataIndex = dataIndex
            json.columns.push(_.cloneDeep(value))
          }
        }
      }

      render () {
        return (
          <DynamicTable {...this.props}
            c={FanoTable.c}
            config={json}
          />
        )
      }
    }
  )
}

/**
 * 通过URL获取配置后再生成表格
 * @param {*} url 配置URL
 */
FanoTable.fromUrl = (url) => {
  if (!_.isString(url)) {
    throw new Error(`Invalid 'url': ${url}`)
  }
  get(url)
    .then(json => {
      if (Array.isArray(_.get(json, 'list'))) {
        FanoTable.fromJson(json.list)
      } else {
        throw new Error(`Invalid 'url' format`)
      }
    })
    .catch(e => { throw e })
}

/**
 * 通过元数据编码获取配置后再生成表格
 * @param {*} code 元数据编码
 */
FanoTable.fromMeta = (code) => {
  if (!_.isString(code)) {
    throw new Error(`Invalid code: ${code}`)
  } else if (!_.isString(FanoTable.c.metaUrl)) {
    throw new Error(`Invalid 'metaUrl' format`)
  }
  get(`${FanoTable.c.metaUrl}?${qs.stringify({ code })}`)
    .then(json => {
      if (Array.isArray(_.get(json, 'list'))) {
        FanoTable.fromJson(json.list)
      } else {
        throw new Error(`Invalid 'metaUrl' format`)
      }
    })
    .catch(e => { throw e })
}

export default FanoTable
