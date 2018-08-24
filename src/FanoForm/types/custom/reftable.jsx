import React from 'react'
import { Input, Icon } from 'antd'
import { getProps } from '../../../utils/form'

export default class FanoFormRefTable extends React.Component {
  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    console.log(111)
  }

  render () {
    const props = getProps(this.props, [
      'placeholder',
      'disabled'
    ])
    return (
      <Input
        {...props}
        addonAfter={<Icon type={'search'} onClick={this.onClick} style={{ cursor: 'pointer' }} />}
        readOnly
      />
    )
  }
}
