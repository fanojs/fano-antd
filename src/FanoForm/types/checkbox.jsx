
import React from 'react'
import qs from 'qs'
import { Checkbox } from 'antd'
import _ from 'lodash'
import { get } from '../../utils/request'
import { getProps } from '../../utils/form'

const CheckboxGroup = Checkbox.Group

export default class FanoFormCheckbox extends React.Component {
  constructor (props) {
    super(props)
    const { url, dict, options = [], max } = props.injectProps.field.props
    this.state = {
      url,
      dict,
      options,
      max,
      multi: true,
      plainValues: options.map(o => o.value)
    }
    this.state.disabledOptions = this.getDisabledOptions(this.state.plainValues, this.props.value)
    this.onChange = this.onChange.bind(this)
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

  componentDidMount () {
    const { dictUrl } = this.props.injectProps.c
    if (_.isEmpty(this.state.options)) {
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
            options: json.list,
            plainValues: json.list.map(o => o.value)
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

  render () {
    const { options, disabledOptions } = this.state
    const props = getProps(this.props, [
      'disabled'
    ])
    const children = []
    for (const option of options) {
      const { label, value } = option
      const disabled = disabledOptions.indexOf(value) >= 0
      children.push(<Checkbox key={value} value={value} disabled={disabled}>{label}</Checkbox>)
    }
    props.onChange = this.onChange
    return (
      <CheckboxGroup {...props}>{children}</CheckboxGroup>
    )
  }
}
