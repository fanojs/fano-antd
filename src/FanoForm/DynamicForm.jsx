import React from 'react'
import _ from 'lodash'
import { Form, Row, Col, Button } from 'antd'
import styles from './DynamicForm.less'

const FormItem = Form.Item

class DynamicForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fieldsError: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // 添加必填校验
  addRequiredRule (rules, required) {
    if (required) {
      const rule = { required: true }
      if (_.isString(required)) {
        rule.message = required
      }
      rules.push(rule)
    }
  }

  componentDidMount () {
    this.setFieldsValue(this.props.values)
  }

  getFieldControl (field) {
    const FanoFormType = this.props.types[field.type]
    if (FanoFormType) {
      return <FanoFormType {...field} />
    }
    throw new Error(`Invalid type: "${field.name} => ${field.type}"`)
  }

  getColProps (colCount) {
    if (!_.isNumber(colCount) || !_.isFinite(colCount)) {
      colCount = 4
    }
    switch (colCount) {
      case 4:
        return { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 }
      case 3:
        return { xs: 24, sm: 12, md: 12, lg: 8 }
      case 2:
        return { xs: 24, sm: 12 }
      case 1:
        return { xs: 24 }
      default:
        return { xs: 24, sm: 12, md: 12, lg: 8, xl: 6 }
    }
  }

  setFieldsValue (values) {
    if (_.isPlainObject(values)) {
      return !!this.props.form.setFieldsValue(values)
    }
    return false
  }

  getFieldsValue (fieldNames) {
    return this.props.form.getFieldsValue(fieldNames)
  }

  getFieldsProps (fieldNames = []) {
    if (!Array.isArray(fieldNames)) {
      console.warn('argument must be a array')
      return {}
    }
    const { config } = this.props
    const fields = _.chain(config.fields)
      .filter(f => _.isEmpty(fieldNames) || fieldNames.includes(f.name))
      .groupBy('name')
      .mapValues(v => _.head(v))
      .value()
    return fields
  }

  setFieldsError (data) {
    // requiredMark:boolean - 是否显示必填
    // validateStatus:string - 校验状态，可选 'success', 'warning', 'error', 'validating'
    // hasFeedback:boolean - 用于给输入框添加反馈图标
    // help:string - 设置校验文案
    if (_.isPlainObject(data)) {
      const { fieldsError } = this.state
      Object.assign(fieldsError, data)
      this.setState({ fieldsError })
      return true
    }
    return false
  }

  renderFields () {
    const { config, form } = this.props
    const { fieldsError } = this.state
    const { fields, colCount = 4 } = config
    const colProps = this.getColProps(colCount)
    const { getFieldDecorator } = form
    const cols = []
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      field.props = _.isPlainObject(field.props) ? field.props : {}
      field.props.placeholder = field.props.placeholder || field.label
      const fieldOptions = {
        rules: [],
        initialValue: field.props.defaultValue
      }
      this.addRequiredRule(fieldOptions.rules, field.props.required)
      const errorProps = _.pick(fieldsError[field.name], ['requiredMark', 'validateStatus', 'hasFeedback', 'help'])

      const formItemLabelText = <span key={'label'} className={`${styles.formItemLabelText} fano-form-item-label-text`}>{field.label}</span>
      const formItemRequiredMark = <span key={'requiredMark'} className={`${styles.requiredMark} fano-form-item-required-mark`}>*</span>
      const formItemColon = (mark = ':') => <span key={'colon'} className={`${styles.formItemColon} fano-form-item-colon`}>{mark}</span>

      const labelContainer = [formItemLabelText]
      if (field.props.required || (field.props.requiredMark === true || errorProps.requiredMark === true)) {
        labelContainer.unshift(formItemRequiredMark)
      }
      if (_.isEmpty(field.props.colon) || field.props.colon === true) {
        labelContainer.push(formItemColon())
      } else {
        labelContainer.push(formItemColon(null))
      }
      cols.push(
        <Col key={i} {...colProps}>
          <FormItem
            className={`${styles.formItem} fano-form-item`}
            label={<span className={`${styles.formItemLabel} fano-form-item-label`}>{labelContainer}</span>}
            colon={false}
            {...errorProps}
          >
            <div className={`${styles.formItemCtrl} fano-form-item`}>
              {getFieldDecorator(field.name, fieldOptions)(
                this.getFieldControl(field)
              )}
            </div>
          </FormItem>
        </Col>
      )
    }
    return cols
  }

  handleSubmit (e) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  render () {
    console.log(this.refs)
    return (
      <Form layout={'inline'}>
        <Row>{this.renderFields()}</Row>
        <Row>
          <Col>
            <div className={styles.footer}>
              <Button>取消</Button>
              <Button type={'primary'} onClick={this.handleSubmit}>确定</Button>
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(DynamicForm)
