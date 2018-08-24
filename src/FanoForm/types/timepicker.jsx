import React from 'react'
import { TimePicker } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormTimePicker extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled',
      'allowClear',
      'format'
    ])
    return (
      <TimePicker {...props} />
    )
  }
}
