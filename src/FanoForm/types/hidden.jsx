import React from 'react'
import { Input } from 'antd'
import { getProps } from '../../utils/form'

export default class FanoFormHidden extends React.Component {
  render () {
    const props = getProps(this.props, null, {
      type: 'hidden'
    })
    return (
      <Input {...props} />
    )
  }
}
