import React, { Component, PropTypes } from 'react'
import { DataTableHead } from 'components'

class DataTableHeadContainer extends Component {
  constructor(props, context) {
    super(props, context)

    const { _order, _sort } = context.router.location.query
    const order = (_order && _order.toLowerCase()) || 'asc'
    const sort = _sort || '_id'

    this.state = {
      _order: order,
      _sort: sort,
    }
  }

  handleSort = (query) => {
    const { store, router } = this.context

    this.setState({ ...query })

    query._order.toUpperCase()

    this.props.getData({ store, ...{ ...router, query } })

    const params = Object.assign({}, query)
    params._sort === '_id' && delete params._sort
    params._page === 1 && delete params._page
    params._limit === 15 && delete params._limit

    router.push({
      ...router.location,
      query: params,
    })
  }

  handleRequestSort = (event, property) => {
    const query = this.context.router.location.query || {}

    let _order = 'desc'

    if (this.state._sort === property && this.state._order === 'desc') {
      _order = 'asc'
    }

    query._order = _order
    query._sort = property

    this.handleSort(query)
  }

  render() {
    const { _order, _sort } = this.state
    const { columnData, handleSelectAllClick } = this.props

    return (
      <DataTableHead
        {...{ _order, _sort }}
        {...{ columnData, handleSelectAllClick }}
        handleRequestSort={this.handleRequestSort}
      />
    )
  }
}

DataTableHeadContainer.propTypes = {
  columnData: PropTypes.array.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
}

DataTableHeadContainer.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object,
}

export default DataTableHeadContainer
