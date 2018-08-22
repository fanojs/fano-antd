import React from 'react'
import { Input } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormText extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled'
    ])
    return (
      <Input {...props} />
    )
  }
}
