import React from 'react'
import qs from 'qs'
import { Radio } from 'antd'
import _ from 'lodash'
import { get } from '../../utils/request'
import { getProps } from '../../utils/form'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class FanoFormRadio extends React.Component {
  constructor (props) {
    super(props)
    const { url, dict, options = [], showButtonStyle = false } = _.get(props, 'injectProps.field.props', {})
    this.state = {
      url,
      dict,
      options,
      showButtonStyle
    }
  }

  componentDidMount () {
    const { dictUrl } = this.props.injectProps
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
    get(url)
      .then(json => {
        if (Array.isArray(_.get(json, 'list'))) {
          this.setState({
            options: json.list
          })
        } else {
          throw new Error(`Invalid 'url' format`)
        }
      })
      .catch(e => { throw e })
  }

  render () {
    const { options, showButtonStyle } = this.state
    const props = getProps(this.props, [
      'placeholder',
      'disabled'
    ])
    const children = []
    for (const o of options) {
      if (showButtonStyle) {
        children.push(<RadioButton key={o.value} value={o.value}>{o.label}</RadioButton>)
      } else {
        children.push(<Radio key={o.value} value={o.value}>{o.label}</Radio>)
      }
    }

    console.log(this.props, props)
    return (
      <RadioGroup {...props}>{children}</RadioGroup>
    )
  }
}
