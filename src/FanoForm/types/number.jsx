import React from 'react'
import { InputNumber } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormNumber extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'max',
      'min',
      'step',
      'disabled'
    ], {
      precision: 0
    })
    return (
      <InputNumber {...props} />
    )
  }
}
