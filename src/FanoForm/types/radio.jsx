import React from 'react'
import { Radio } from 'antd'
import _ from 'lodash'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class FanoFormRadio extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      options: _.get(props, 'options', [])
    }
  }
  render () {
    const f = this.props
    const props = Object.assign(_.get(f, 'componentProps', {}), {
      name: f.name
    })
    const children = []
    if (_.isArray(f.props.options)) {
      for (const option of f.props.options) {
        if (f.props.showButtonStyle) {
          children.push(<RadioButton key={option.value} value={option.value}>{option.label}</RadioButton>)
        } else {
          children.push(<Radio key={option.value} value={option.value}>{option.label}</Radio>)
        }
      }
    }
    return (
      <RadioGroup {...props}>{children}</RadioGroup>
    )
  }
}
