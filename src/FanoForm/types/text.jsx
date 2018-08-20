import React from 'react'
import { Input } from 'antd'

export default field => {
  const { props } = field
  const itemProps = {
    autoComplete: field.name
  }
  if (props.placeholder) {
    itemProps.placeholder = props.placeholder
  }
  return <Input {...itemProps} />
}
