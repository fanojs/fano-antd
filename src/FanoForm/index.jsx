import React from 'react'
import qs from 'qs'
import _ from 'lodash'
import { get } from '../utils/request'
import DynamicForm from './DynamicForm'

/**
 * 表单组件
 */
class FanoForm {
}

FanoForm.c = {}

/**
 * 全局配置
 * @param {*} options 配置项
 */
FanoForm.config = (options) => {
  if (!_.isEmpty(options) && _.isObject(options) && !Array.isArray(options)) {
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
  return props => <DynamicForm {...props} config={json} />
}

/**
 * 通过URL获取配置后再生成表单
 * @param {*} url 配置URL
 */
FanoForm.fromUrl = (url) => {
  if (!_.isString(url)) {
    throw new Error(`Invalid url: ${url}`)
  }
  get(url)
    .then(json => FanoForm.fromJson(json))
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
    throw new Error(`Invalid metaUrl`)
  }
  get(`${FanoForm.c.metaUrl}?${qs.stringify({ code })}`)
    .then(json => FanoForm.fromJson(json))
    .catch(e => { throw e })
}

/**
 * 注入自定义的控件类型
 * @param {*} code 类型编码
 * @param {*} fn 类型函数
 */
FanoForm.injectType = (code, fn) => {

}

export default FanoForm
