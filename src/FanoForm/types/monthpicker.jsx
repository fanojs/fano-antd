import React from 'react'
import { DatePicker } from 'antd'
import { getProps } from '../../utils/form'

const { MonthPicker } = DatePicker

export default class FanoFormMonthPicker extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled',
      'allowClear',
      'format',
      'disabledDate'
    ])
    return (
      <MonthPicker {...props} />
    )
  }
}
