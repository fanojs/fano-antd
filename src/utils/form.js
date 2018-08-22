import _ from 'lodash'

export function getProps (rawProps, supportProps, defaultProps) {
  const { field } = rawProps.injectProps
  const props = _.omit(rawProps, 'injectProps')
  const componentProps = _.get(field, 'componentProps')
  const fanoProps = _.pick(field.props, supportProps)
  Object.assign(props, fanoProps, componentProps, defaultProps)
  return props
}
