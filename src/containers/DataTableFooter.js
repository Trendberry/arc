import React, { Component, PropTypes } from 'react'

import { DataTableFooter } from 'components'

import { categoryList } from 'store/actions'

class DataTableFooterContainer extends Component {
  constructor(props, context) {
    super(props, context)

    const { count } = props
    const { router } = context
    const { _page, _limit } = router.location.query
    const page = _page || 1
    const limit = _limit || 15

    const startIndex = limit * (page - 1) + 1
    const endIndex = (count >= limit * page) ? (limit * page) : count

    const prev = router.location
    const next = router.location

    (page > 1) && (linkPrev.query._page = page - 1)
    (endIndex < count) && (linkNext.query._page = page + 1)

    this.state = {
      _page: page,
      _limit: limit,
      anchorEl: undefined,
      open: false,
      selectedIndex: 0,
      linkPrev: {},
      linkNext: {}
    }
  }

  handleRequestOpen = (event) => this.setState({
    open: true,
    anchorEl: event.currentTarget
  })

  handleRequestClose = () => this.setState({ open: false })

  handlePagination = (query) => {
    const { store, router } = this.context

    this.setState({ ...query })

    this.props.getData({ store, ...{ ...router, query } })

    const params = Object.assign({}, query)
    params._page === 1 && delete params._page
    params._limit === 15 && delete params._limit

    const location = {
      ...router.location,
      query: params
    }

    // const linkPrev = {
    //   ...location,
    //   ...{ query: { page: (_page - 1) }}
    // }

    // const linkNext = {
    //   ...location,
    //   ...{ query: { page: (_page + 1) }}
    // }

    // this.setState({
    //   linkPrev,
    //   linkNext
    // })

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

    this.handleRequest(query)
  }

  handleClickPrevPage = () => {
    const query = this.context.router.location.query || {}
    const { _page, _limit } = this.state
    query._page = parseInt(_page) - 1

    this.handlePagination(query)
  }

  handleClickNextPage = () => {
    const query = this.context.router.location.query || {}
    const { _page, _limit } = this.state
    query._page = parseInt(_page) + 1

    this.handlePagination(query)
  }

  render() {
    const { _limit, _page, anchorEl, open, selectedIndex, linkPrev, linkNext } = this.state
    const { count } = this.props

    const startIndex = _limit * (_page - 1) + 1
    const endIndex = (count >= _limit * _page) ? (_limit * _page) : count

    return <DataTableFooter
      {...this.props}
      {...{ count, startIndex, endIndex, anchorEl, open, selectedIndex, linkPrev, linkNext }}

      onClickPrevPage={this.handleClickPrevPage}
      onClickNextPage={this.handleClickNextPage}

      handleRequestClose={this.handleRequestClose}
      handleRequestOpen={this.handleRequestOpen}
      handleMenuItemClick={this.handleMenuItemClick}

    />
  }
}

DataTableFooterContainer.propTypes = {
  limitOptions: PropTypes.arrayOf(PropTypes.number)
}

DataTableFooterContainer.defaultProps = {
  limitOptions: [15, 30, 45]
}

DataTableFooterContainer.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object
}

export default DataTableFooterContainer
