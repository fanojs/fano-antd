import React, { Fragment } from 'react'

export const If = props => {
  return props.cond ? <Fragment>{props.children}</Fragment> : null
}
