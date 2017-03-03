import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import compose from 'recompose/compose'
// import withWidth, { isWidthUp } from 'material-ui/utils/withWidth'
import customPropTypes from 'material-ui/utils/customPropTypes'
import { AdminPageTemplate } from 'components'
import { fromStatus } from 'store/selectors'
// import shallowEqual from 'react-redux/lib/utils/shallowEqual'

import NProgress from 'nprogress'

class AdminPageTemplateContainer extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  }

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  state = {
    drawerOpen: false,
  }

  // componentDidMount() {


  // }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('prev ' + prevProps.loading)
  // }


  handleDrawerClose = () => {
    this.setState({ drawerOpen: false })
  }

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen })
  }

  handleToggleShade = () => {
    // this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' })
  }

  render() {
    const canUseDOM = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )

    canUseDOM &&
    this.props.loading &&
    NProgress.configure({
      showSpinner: false,
      speed: 500,
      trickleSpeed: 200,
    }) &&
    NProgress.start()

    canUseDOM &&
    !this.props.loading &&
    NProgress.done()

    // console.log('render')
    const {
      children,
      // width,
      location,
    } = this.props

    // let drawerDocked = isWidthUp('lg', width)
    const drawerDocked = true
    return (
      <AdminPageTemplate
        handleDrawerToggle={this.handleDrawerToggle}
        handleToggleShade={this.handleToggleShade}
        handleDrawerClose={this.handleDrawerClose}
        drawerDocked={drawerDocked}
        drawerOpen={this.state.drawerOpen}
        location={location}
      >
        {children}
      </AdminPageTemplate>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: fromStatus.isLoading(state),
})

export default connect(mapStateToProps)(AdminPageTemplateContainer)
