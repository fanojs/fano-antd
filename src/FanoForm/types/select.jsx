
import React from 'react'
import qs from 'qs'
import { Select } from 'antd'
import _ from 'lodash'
import { get } from '../../utils/request'
import { getProps } from '../../utils/form'

const SelectOption = Select.Option
const OptGroup = Select.OptGroup

export default class FanoFormSelect extends React.Component {
  constructor (props) {
    super(props)
    const { url, dict, options = [], max, remoteSearch } = props.injectProps.field.props
    this.state = {
      url,
      dict,
      options,
      max,
      remoteSearch,
      disabledOptions: [],
      plainValues: options.map(o => o.value),
      transformed: this.transformProps()
    }
    this.state.multi = !!this.state.transformed.multi
    this.onChange = this.onChange.bind(this)
    this.onSearch = this.onSearch.bind(this)
  }

  transformProps () {
    const props = { multi: true }
    const { max, allowCreate, allowInput } = this.props.injectProps.field.props
    if (_.isNumber(max)) {
      if (max > 1) {
        props.mode = 'multiple'
        if (allowCreate === true) {
          props.mode = 'tags'
        }
      }
    } else {
      props.mode = 'multiple'
    }

    if (allowInput === true) {
      props.showSearch = true
    }
    props.multi = ['multiple', 'tags'].includes(props.mode)
    return props
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
          this.setState({
            options: json.list,
            plainValues: json.list.map(o => o.value)
          })
        } else {
          throw new Error(`Invalid 'url' format`)
        }
      })
      .catch(e => { throw e })
  }

  onChange (value, option) {
    const { max, multi } = this.state
    if (multi === true) {
      let disabledOptions = []
      if (_.isNumber(max)) {
        if (value.length === max) {
          disabledOptions = _.difference(this.state.plainValues, value)
        }
        if (value.length > max) {
          value = this.props.value
        }
      }
      this.setState({ disabledOptions })
    }
    return this.props.onChange(value, option)
  }

  onSearch (value) {
    this.fetchOptions(`${this.state.url}?${qs.stringify({
      cond: JSON.stringify({ value }, null, 0)
    })}`)
  }

  render () {
    const { options, disabledOptions, transformed, remoteSearch, multi } = this.state
    const props = getProps(this.props, [
      'placeholder',
      'allowClear',
      'disabled'
    ])
    Object.assign(props, transformed)
    const children = []
    for (const option of options) {
      const { label, value, children: groupChildren } = option
      const disabled = disabledOptions.indexOf(value) >= 0
      if (Array.isArray(groupChildren)) {
        const groupItems = []
        for (const item of groupChildren) {
          groupItems.push(
            <SelectOption key={item.value} value={item.value} disabled={disabled}>{item.label}</SelectOption>
          )
        }
        children.push(
          <OptGroup key={label} label={label}>{groupItems}</OptGroup>
        )
      } else {
        children.push(
          <SelectOption key={value} value={value} disabled={disabled}>{label}</SelectOption>
        )
      }
    }
    if (multi === true) {
      props.onChange = this.onChange
    }
    if (remoteSearch === true) {
      props.onSearch = this.onSearch
    }
    return (
      <Select {...props}>{children}</Select>
    )
  }
}
