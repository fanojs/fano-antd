import React from 'react'
import { Radio } from 'antd'
import _ from 'lodash'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

export default field => {
  const { props } = field
  const itemProps = { name: field.name }
  const options = []
  if (_.isArray(props.options)) {
    for (const option of props.options) {
      if (props.showButtonStyle) {
        options.push(<RadioButton key={option.value} value={option.value}>{option.label}</RadioButton>)
      } else {
        options.push(<Radio key={option.value} value={option.value}>{option.label}</Radio>)
      }
    }
  }
  return (<RadioGroup {...itemProps}>{options}</RadioGroup>)
}
