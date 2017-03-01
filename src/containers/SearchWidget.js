import React, { Component } from 'react'

import { SearchWidget } from 'components'

class SearchWidgetContainer extends Component {

  state = {
    open: false,
  }

  handleRequestOpen = (event) => {
    this.state.open === false && this.searchInput.focus()
    this.setState({ open: true })
  }

  handleRequestClose = () => {
    this.setState({ open: false })
    this.searchInput.input.value = ''
  }

  handleInputBlur = (event) => {
    const { value } = event.target
    if (value === '') this.setState({ open: false })
  }

  render() {
    return <SearchWidget
    {...this.props}
    {...{
      open: this.state.open,
      onRequestOpen: this.handleRequestOpen,
      onRequestClose: this.handleRequestClose,
      onInputBlur: this.handleInputBlur
    }}
    searchInput={(input) => { this.searchInput = input }}
    />
  }
}

export default SearchWidgetContainer
