import React, { Component } from 'react'

import { DataTableHead } from 'components'

class DataTableHeadContainer extends Component {
  createSortHandler = (property) => {
    return (event) => this.props.onRequestSort(event, property)
  }

  render() {
    return <DataTableHead {...this.props} createSortHandler={this.createSortHandler} />
  }
}

export default DataTableHeadContainer
