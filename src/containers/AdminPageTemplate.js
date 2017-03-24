import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth'
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

  static childContextTypes = {
    handleSetTitle: PropTypes.func,
  }

  state = {
    drawerOpen: false,
    title: 'Trendberry',
  }

  getChildContext() {
    return {
      handleSetTitle: this.handleSetTitle,
    }
  }

  // componentWillReceiveProps() {
  //   this.setState({ title: 'Trendberry' })
  // }

  handleSetTitle = (title) => {
    this.setState({ title })
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

    const {
      children,
      width,
      location,
    } = this.props

    const widths = width || 'lg'

    let drawerDocked = isWidthUp('lg', widths)

    return (
      <AdminPageTemplate
        handleDrawerToggle={this.handleDrawerToggle}
        handleToggleShade={this.handleToggleShade}
        handleDrawerClose={this.handleDrawerClose}
        drawerDocked={drawerDocked}
        drawerOpen={drawerDocked || this.state.drawerOpen}
        location={location}
        title={this.state.title}
      >
        {children}
      </AdminPageTemplate>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: fromStatus.isLoading(state),
})

export default compose(
  withWidth(),
  connect(mapStateToProps),
)(AdminPageTemplateContainer)
