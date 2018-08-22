import React from 'react'
import { Input } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormPassword extends React.Component {
  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled'
    ], {
      type: 'password'
    })
    return (
      <Input {...props} />
    )
  }
}
