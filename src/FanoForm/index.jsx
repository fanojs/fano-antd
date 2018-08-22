import React from 'react'
import qs from 'qs'
import _ from 'lodash'
import { get } from '../utils/request'
import DynamicForm from './DynamicForm'
import text from './types/text'
import hidden from './types/hidden'
import digit from './types/digit'
import number from './types/number'
import radio from './types/radio'
import password from './types/password'

class FanoForm { }

FanoForm.c = {
  types: {
    text,
    password,
    hidden,
    number,
    digit,
    radio
  }
}

/**
 * 全局配置
 * @param {*} options 配置项
 */
FanoForm.config = (options) => {
  if (_.isPlainObject(options)) {
    _.merge(FanoForm.c, options)
  } else {
    throw new Error(`Invalid options`)
  }
}

/**
 * 使用JSON配置生成表单
 * @param {*} json JSON配置
 */
FanoForm.fromJson = (json) => {
  return (
    class FanoComponent extends React.Component {
      constructor (props) {
        super(props)
        this.combineFieldExpand()
        this.wrappedComponentRef = this.wrappedComponentRef.bind(this)
      }

      getFieldsValue () {
        return this.formRef.getFieldsValue()
      }

      setFieldsValue (values) {
        return this.formRef.setFieldsValue(values)
      }

      setFieldsError (errors) {
        return this.formRef.setFieldsError(errors)
      }

      combineFieldExpand () {
        const { fieldExpand } = this.props
        if (!_.isPlainObject(fieldExpand)) {
          return
        }
        for (const field of json.fields) {
          const expand = fieldExpand[field.name]
          if (_.isPlainObject(expand)) {
            Object.assign(field, expand)
          }
        }
      }

      wrappedComponentRef (inst) {
        this.formRef = inst
      }

      render () {
        return (
          <DynamicForm {...this.props}
            types={FanoForm.c.types}
            config={json}
            wrappedComponentRef={this.wrappedComponentRef}
          />
        )
      }
    }
  )
}

/**
 * 通过URL获取配置后再生成表单
 * @param {*} url 配置URL
 */
FanoForm.fromUrl = (url) => {
  if (!_.isString(url)) {
    throw new Error(`Invalid 'url': ${url}`)
  }
  get(url)
    .then(json => {
      if (Array.isArray(_.get(json, 'list'))) {
        FanoForm.fromJson(json.list)
      } else {
        throw new Error(`Invalid 'url' format`)
      }
    })
    .catch(e => { throw e })
}

/**
 * 通过元数据编码获取配置后再生成表单
 * @param {*} code 元数据编码
 */
FanoForm.fromMeta = (code) => {
  if (!_.isString(code)) {
    throw new Error(`Invalid code: ${code}`)
  } else if (!_.isString(FanoForm.c.metaUrl)) {
    throw new Error(`Invalid 'metaUrl' format`)
  }
  get(`${FanoForm.c.metaUrl}?${qs.stringify({ code })}`)
    .then(json => {
      if (Array.isArray(_.get(json, 'list'))) {
        FanoForm.fromJson(json.list)
      } else {
        throw new Error(`Invalid 'metaUrl' format`)
      }
    })
    .catch(e => { throw e })
}

/**
 * 注入自定义的控件类型
 * @param {*} code 类型编码
 * @param {*} fn 类型函数
 */
FanoForm.injectType = (code, fn) => {
  if (_.isString(code) && _.isFunction(fn)) {
    FanoForm.c.types.code = fn
    return true
  }
  return false
}

export default FanoForm
