import React from 'react'
import { InputNumber } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormDigit extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'max',
      'min',
      'step',
      'precision',
      'disabled'
    ])
    return (
      <InputNumber {...props} />
    )
  }
}
