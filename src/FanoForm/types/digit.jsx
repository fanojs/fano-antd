import React from 'react'
import { InputNumber } from 'antd'
import _ from 'lodash'

export default class FanoFormDigit extends React.Component {
  render () {
    const f = this.props
    const props = Object.assign(_.pick(f.props, [
      'placeholder',
      'max',
      'min',
      'step',
      'precision',
      'disabled'
    ]), _.get(f, 'componentProps', {}))
    return (
      <InputNumber {...props} />
    )
  }
}
