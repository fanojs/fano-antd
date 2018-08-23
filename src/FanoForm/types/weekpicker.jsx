import React from 'react'
import { DatePicker } from 'antd'
import { getProps } from '../../utils/form'

const { WeekPicker } = DatePicker

export default class FanoFormWeekPicker extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled',
      'allowClear',
      'format',
      'disabledDate'
    ])
    return (
      <WeekPicker {...props} />
    )
  }
}
