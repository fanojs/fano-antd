import _ from 'lodash'

export function getProps (rawProps, supportProps, defaultProps) {
  const { field } = rawProps.injectProps
  const props = _.omit(rawProps, 'injectProps')
  const fanoProps = _.pick(field.props, supportProps)
  Object.assign(props, fanoProps, field.nativeProps, defaultProps)
  return props
}
