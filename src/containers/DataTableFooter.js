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
      totalPages: Math.ceil(props.count / limit),
      anchorEl: undefined,
      open: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalPages: Math.ceil(nextProps.count / this.state._limit),
    })
  }

  handleRequestOpen = (event) => this.setState({
    open: true,
    anchorEl: event.currentTarget,
  })

  handleRequestClose = () => this.setState({ open: false })

  handlePagination = (nextParams) => {
    const { store, router } = this.context

    const params = { ...router.location.query, ...nextParams }
    params._page === 1 && delete params._page
    params._limit === this.props.limitOptions[0] && delete params._limit

    const location = {
      pathname: router.location.pathname,
      query: params,
    }

    this.setState({ ...nextParams }, () => {
      this.props.getData({ store, ...{ ...router, location } })
      router.push(location)
    })
  }

  handleMenuItemClick = (event, index) => {
    const limit = this.props.limitOptions[index]

    this.setState({
      open: false,
      totalPages: Math.ceil(this.props.count / limit),
    })

    this.handlePagination({
      _limit: limit,
      _page: 1,
    })
  }

  handleClickPrevPage = (event) => {
    const { _page } = this.state
    if (_page === 1) return

    const page = parseInt(_page, 10) - 1
    this.handlePagination({ _page: page })
    event.preventDefault()
  }

  handleClickNextPage = (event) => {
    const { _page, totalPages } = this.state
    if (_page === totalPages) return

    const page = parseInt(_page, 10) + 1
    this.handlePagination({ _page: page })
    event.preventDefault()
  }

  render() {
    const { _limit, _page, anchorEl, open, totalPages } = this.state
    const { count } = this.props

    const startIndex = (_limit * (_page - 1)) + 1
    const endIndex = (count >= _limit * _page) ? (_limit * _page) : count

    const hasPrev = _page > 1
    const hasNext = _page < totalPages

    return (
      <DataTableFooter
        {...this.props}
        {...{ _limit, _page, count, startIndex, endIndex, anchorEl, open, hasPrev, hasNext }}

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
