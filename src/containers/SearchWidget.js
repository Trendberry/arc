import React, { Component, PropTypes } from 'react'
import { SearchWidget } from 'components'

let searchTimeout

class SearchWidgetContainer extends Component {
  constructor(props, context) {
    super(props, context)

    const { q } = context.router.location.query
    const searchString = q || ''

    this.state = {
      open: searchString.length > 0,
      q: searchString,
    }
  }

  handleSearch = (value, clear) => {
    const { store, router } = this.context
    const params = { ...router.location.query, q: value }
    delete params._page
    if (clear) delete params.q

    const location = {
      pathname: router.location.pathname,
      query: params,
    }

    this.props.getData({ store, ...{ ...router, location } })
    router.push(location)
  }

  handleRequestOpen = () => {
    this.state.open === false && this.searchInput.focus()
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    clearTimeout(searchTimeout)
    this.setState({ open: false, q: '' }, () => {
      this.handleSearch('', true)
    })
  }

  handleInputChange = (event) => {
    const { value } = event.target
    this.setState({ q: value }, () => {
      clearTimeout(searchTimeout)
      if (value.length && value.length < 3) return
      searchTimeout = setTimeout(() => this.handleSearch(value), 500)
    })
  }

  handleInputBlur = (event) => {
    const { value } = event.target
    if (value === '') {
      this.setState({ open: false })
    }
  }

  render() {
    return (
      <SearchWidget
        {...this.props}
        {...{
          open: this.state.open,
          onRequestOpen: this.handleRequestOpen,
          onRequestClose: this.handleRequestClose,
          onInputBlur: this.handleInputBlur,
          onInputChange: this.handleInputChange,
        }}
        inputValue={this.state.q}
        searchInput={(input) => { this.searchInput = input }}
      />
    )
  }
}

SearchWidgetContainer.propTypes = {
  getData: PropTypes.func.isRequired,
}

SearchWidgetContainer.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object,
}

export default SearchWidgetContainer
