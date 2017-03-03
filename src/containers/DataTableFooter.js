import React, { Component, PropTypes } from 'react'
import { DataTableFooter } from 'components'

class DataTableFooterContainer extends Component {
  constructor(props, context) {
    super(props, context)

    const { router } = context
    const { _page, _limit } = router.location.query
    const page = _page || 1
    const limit = parseInt(_limit, 10) || props.limitOptions[0]

    const params = { ...router.location.query }
    params._page === 1 && delete params._page
    params._limit === props.limitOptions[0] && delete params._limit

    this.state = {
      _page: page,
      _limit: limit,
      anchorEl: undefined,
      open: false,
      selectedIndex: 0,
      location: {
        pathname: router.location.pathname,
        query: params,
      },
    }
  }

  componentWillReceiveProps() {
    const { pathname, query } = this.context.router.location

    this.setState({
      location: {
        pathname,
        query,
      },
    })
  }

  handleRequestOpen = (event) => this.setState({
    open: true,
    anchorEl: event.currentTarget,
  })

  handleRequestClose = () => this.setState({ open: false })

  handlePagination = (query) => {
    const { store, router } = this.context

    this.props.getData({ store, ...{ ...router, query } })

    const params = { ...query }
    params._page === 1 && delete params._page
    params._limit === this.props.limitOptions[0] && delete params._limit

    const location = {
      pathname: router.location.pathname,
      query: params,
    }

    this.setState({ ...query, location })

    router.push(location)
  }

  handleMenuItemClick = (event, index) => {
    const query = this.context.router.location.query || {}
    query._limit = this.props.limitOptions[index]
    query._page = 1

    this.setState({
      selectedIndex: index,
      open: false,
    })

    this.handlePagination(query)
  }

  handleClickPrevPage = () => {
    const query = this.context.router.location.query || {}
    const { _page } = this.state
    query._page = parseInt(_page, 10) - 1

    this.handlePagination(query)
  }

  handleClickNextPage = () => {
    const query = this.context.router.location.query || {}
    const { _page } = this.state
    query._page = parseInt(_page, 10) + 1

    this.handlePagination(query)
  }

  render() {
    const { _limit, _page, anchorEl, open, selectedIndex, location } = this.state
    const { count } = this.props

    const startIndex = (_limit * (_page - 1)) + 1
    const endIndex = (count >= _limit * _page) ? (_limit * _page) : count

    const hasPrev = startIndex > 1
    const hasNext = endIndex < count

    const prevPageLink = hasPrev && {
      ...location,
      query: {
        ...location.query,
        _page: parseInt(location.query._page || 1, 10) - 1,
      },
    }
    prevPageLink.query && prevPageLink.query._page === 1 && delete prevPageLink.query._page

    const nextPageLink = hasNext && {
      ...location,
      query: {
        ...location.query,
        _page: parseInt(location.query._page || 1, 10) + 1,
      },
    }

    return (
      <DataTableFooter
        {...this.props}
        {...{ count, startIndex, endIndex, anchorEl, open, selectedIndex, hasPrev, hasNext, prevPageLink, nextPageLink }}

        onClickPrevPage={this.handleClickPrevPage}
        onClickNextPage={this.handleClickNextPage}

        handleRequestClose={this.handleRequestClose}
        handleRequestOpen={this.handleRequestOpen}
        handleMenuItemClick={this.handleMenuItemClick}
      />
    )
  }
}

DataTableFooterContainer.propTypes = {
  count: PropTypes.number.isRequired,
  getData: PropTypes.func.isRequired,
  limitOptions: PropTypes.arrayOf(PropTypes.number),
}

DataTableFooterContainer.defaultProps = {
  limitOptions: [15, 30, 45],
}

DataTableFooterContainer.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

export default DataTableFooterContainer
