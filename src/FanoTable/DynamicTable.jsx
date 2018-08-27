import React from 'react'
import { Table } from 'antd'
import styles from './DynamicTable.less'

export default class DynamicTable extends React.Component {
  render () {
    const { columns } = this.props.config
    const { values } = this.props
    return (
      <div className={styles.container}>
        <Table dataSource={values} columns={columns} />
      </div>
    )
  }
}
