import React from 'react'
import { Radio } from 'antd'
import _ from 'lodash'
import { getProps } from '../../utils/form'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default class FanoFormRadio extends React.Component {
  render () {
    const { options = [], showButtonStyle = false } = _.get(this, 'props.field.props', {})
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
    return (
      <RadioGroup {...props}>{children}</RadioGroup>
    )
  }
}
