import React, { PureComponent, PropTypes } from 'react'
import { DataTableHead } from 'components'

class DataTableHeadContainer extends PureComponent {
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

  handleSort = (nextParams) => {
    const { store, router } = this.context

    const params = { ...router.location.query, ...nextParams }
    params._sort === '_id' && delete params._sort
    params._order = params._order.toUpperCase()

    const location = {
      pathname: router.location.pathname,
      query: params,
    }

    this.setState({ ...nextParams }, () => {
      this.props.getData({ store, ...{ ...router, location } })
      router.push(location)
    })
  }

  handleRequestSort = (event, property) => {
    let order = 'desc'

    if (this.state._sort === property && this.state._order === 'desc') {
      order = 'asc'
    }

    this.handleSort({
      _order: order,
      _sort: property,
    })
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
