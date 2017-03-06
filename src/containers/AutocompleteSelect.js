import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import keycode from 'keycode'
import api from 'services/api'
import { AutocompleteSelect } from 'components'

let searchTimeout

class AutocompleteSelectContainer extends Component {
  static propTypes = {
    request: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      anchorEl: undefined,
      open: false,
      selectedIndex: -1,
      options: [],
    }
  }

  handleSearch = (query) => {
    const categories = api.get('/categories/', { params : { q: query, _expand: 'parent' } })

    categories.then((result) => {
      this.setState({
        selectedIndex: -1,
        options: Array.from(result.data, item => ({ key: item._id, value: item.name })),
      })
    })
  }

  handleInputChange = (event) => {
    const { value } = event.target
    clearTimeout(searchTimeout)
    if (value.length && value.length < 3) return
    searchTimeout = setTimeout(() => this.handleSearch(value), 500)
  }

  handleClickListItem = (event) => this.setState({
    open: true,
    anchorEl: event.currentTarget,
  })

  handleMenuItemClick = (event, index) => this.setState({
    selectedIndex: index,
    open: false,
  })

  handleRequestClose = () => this.setState({
    open: false,
  })

  render() {
    return (
      <AutocompleteSelect
        {...{
          open: this.state.open,
          anchorEl: this.state.anchorEl,
          selectedIndex: this.state.selectedIndex,
          options: this.state.options,
          handleClickListItem: this.handleClickListItem,
          handleMenuItemClick: this.handleMenuItemClick,
          handleRequestClose: this.handleRequestClose,
          onInputChange: this.handleInputChange,
        }}
        searchInput={(input) => { this.searchInput = input }}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  request: (query) => dispatch(categoryList.request({ q: query })),
})

export default connect(null, mapDispatchToProps)(AutocompleteSelectContainer)
