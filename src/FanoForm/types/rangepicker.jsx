import React from 'react'
import { DatePicker } from 'antd'
import { getProps } from '../../utils/form'

const { RangePicker } = DatePicker

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
    if (!Array.isArray(props.placeholder)) {
      delete props.placeholder
    }
    return (
      <RangePicker {...props} />
    )
  }
}
