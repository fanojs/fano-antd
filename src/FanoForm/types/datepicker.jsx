import React from 'react'
import { DatePicker } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormDatePicker extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled',
      'allowClear',
      'format',
      'disabledDate',
      'showTime'
    ])
    return (
      <DatePicker {...props} />
    )
  }
}
