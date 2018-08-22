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

  getRequiredRule (required) {
    const rule = { required: true }
    if (_.isString(required)) {
      rule.message = required
    }
    return rule
  }

  componentDidMount () {
    this.setFieldsValue(this.props.values)
  }

  getFieldControl (field) {
    const FanoFormType = this.props.c.types[field.type]
    if (FanoFormType) {
      return <FanoFormType injectProps={{ field, c: this.props.c, getFieldsValue: this.getFieldsValue }} />
    }
    throw new Error(`Invalid type: "${field.name} => ${field.type}"`)
  }

  getFieldLabel (field, needMark) {
    const text = <span key={'label'} className={`${styles.formItemText} fano-form-item-label-text`}>{field.label}</span>
    const mark = <span key={'requiredMark'} className={`${styles.requiredMark} fano-form-item-required-mark`}>*</span>
    const colonGetter = (mark = ':') => <span key={'colon'} className={`${styles.formItemColon} fano-form-item-colon`}>{mark}</span>

    const label = [text]
    if (field.props.required ||
      (field.props.requiredMark === true || needMark === true)) {
      label.unshift(mark)
    }
    if (_.isEmpty(field.props.colon) || field.props.colon === true) {
      label.push(colonGetter())
    } else {
      label.push(colonGetter(null))
    }
    return label
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

  /**
   * 设置字段错误信息
   * requiredMark:boolean - 是否显示必填
   * validateStatus:string - 校验状态，可选 'success', 'warning', 'error', 'validating'
   * hasFeedback:boolean - 用于给输入框添加反馈图标
   * help:string - 设置校验文案
   */
  setFieldsError (errors) {
    if (_.isPlainObject(errors)) {
      const { fieldsError } = this.state
      Object.assign(fieldsError, errors)
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

      const fieldError = _.pick(fieldsError[field.name], ['requiredMark', 'validateStatus', 'hasFeedback', 'help'])
      const fieldLabel = this.getFieldLabel(field, fieldError.requiredMark)
      const fieldControl = this.getFieldControl(field)
      const formItemProps = {
        className: `${styles.formItem} fano-form-item`,
        label: <span className={`${styles.formItemLabel} fano-form-item-label`}>{fieldLabel}</span>,
        colon: false
      }
      const formItemOptions = {
        rules: [],
        initialValue: field.props.defaultValue
      }
      if (field.props.required) {
        formItemOptions.rules.push(this.getRequiredRule(field.props.required))
      }
      Object.assign(formItemProps, fieldError)
      cols.push(
        <Col key={i} {...colProps}>
          <FormItem {...formItemProps}>
            <div className={`${styles.formItemCtrl} fano-form-item`}>
              {getFieldDecorator(field.name, formItemOptions)(fieldControl)}
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

  getDefaultFooter () {
    return (
      <div className={styles.footer}>
        <Button>取消</Button>
        <Button type={'primary'} onClick={this.handleSubmit}>确定</Button>
      </div>
    )
  }

  render () {
    return (
      <Form layout={'inline'}>
        <Row>{this.renderFields()}</Row>
        <Row>
          <Col>
            {this.props.footer === undefined ? this.getDefaultFooter() : this.props.footer}
          </Col>
        </Row>
      </Form>
    )
  }
}

export default Form.create()(DynamicForm)
