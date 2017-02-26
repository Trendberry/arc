import React, { Component, PropTypes } from 'react'

import NProgress from 'nprogress'

import { DataTableFooter } from 'components'

import { categoryList } from 'store/actions'

class DataTableFooterContainer extends Component {

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 0,
  }

  handleClickListItem = (event) => this.setState({ open: true, anchorEl: event.currentTarget })

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, open: false })

    // NProgress.start()

    // return new Promise((resolve, reject) => {
    //   this.context.store.dispatch(categoryList.request(this.props.paginationOptions[index], resolve, reject))
    // })
    // .then(result => {
    //   NProgress.done()
    // })

}

  handleRequestClose = () => this.setState({ open: false })

  // shouldComponentUpdate(nextProps, nextState) {
  //   new Promise((resolve, reject) => {
  //     this.context.store.dispatch(categoryList.request(nextProps.paginationOptions[nextState.selectedIndex]))
  //   })
  //   return true
  // }

  render() {

    // console.log(this.context)

    return <DataTableFooter
      {...this.props}

      paginationAnchorEl={this.state.anchorEl}
      paginationOopen={this.state.open}
      paginationSelectedIndex={this.state.selectedIndex}
      paginationHandleRequestClose={this.handleRequestClose}
      paginationHandleClickListItem={this.handleClickListItem}
      paginationHandleMenuItemClick={this.handleMenuItemClick}

    />
  }
}

DataTableFooterContainer.propTypes = {
  paginationOptions: PropTypes.array
}

DataTableFooterContainer.defaultProps = {
  paginationOptions: [15, 30, 45]
}

DataTableFooterContainer.contextTypes = {
  store: PropTypes.object
}

export default DataTableFooterContainer
