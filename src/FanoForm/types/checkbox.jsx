
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
    const { url, dict, options = [], showButtonStyle = false, max, min } = props.injectProps.field.props
    this.state = {
      url,
      dict,
      options,
      showButtonStyle,
      max,
      min,
      disabledOptions: [],
      plainValues: options.map(o => o.value)
    }
    this.onChange = this.onChange.bind(this)
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

  onChange (checkedValues) {
    const { max } = this.state
    let disabledOptions = []
    if (_.isNumber(max)) {
      if (checkedValues.length === max) {
        disabledOptions = _.difference(this.state.plainValues, checkedValues)
      }
      if (checkedValues.length > max) {
        checkedValues = this.props.value
      }
    }
    this.setState({ disabledOptions })
    return this.props.onChange(checkedValues)
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
