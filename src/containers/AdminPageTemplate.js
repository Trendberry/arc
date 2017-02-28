import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Text from 'material-ui/Text';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import withWidth, { isWidthUp } from 'material-ui/utils/withWidth';
import MenuIcon from 'material-ui/svg-icons/menu';
import LightbulbOutlineIcon from 'material-ui/svg-icons/lightbulb-outline';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { AdminPageTemplate } from 'components'
import { fromStatus } from 'store/selectors'
// import shallowEqual from 'react-redux/lib/utils/shallowEqual'

import NProgress from 'nprogress'

class AdminPageTemplateContainer extends Component {
  constructor(props) {
    super(props)
    // console.log('constructor')
  }

  static propTypes = {
    children: PropTypes.node.isRequired,
    // dispatch: PropTypes.func.isRequired,
    // width: PropTypes.string.isRequired,
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
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleToggleShade = () => {
    // this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
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
      trickleSpeed: 200
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
      loading
    } = this.props;

    // let drawerDocked = isWidthUp('lg', width);
    let drawerDocked = true;
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
    );
  }
}

const mapStateToProps = (state) => ({
  loading: fromStatus.isLoading(state)
})

export default connect(mapStateToProps)(AdminPageTemplateContainer)
