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

class AdminPageTemplateContainer extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    // width: PropTypes.string.isRequired,
  };

  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  };

  state = {
    drawerOpen: false,
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ drawerOpen: !this.state.drawerOpen });
  };

  handleToggleShade = () => {
    this.props.dispatch({ type: 'TOGGLE_THEME_SHADE' });
  };

  render() {
    const {
      children,
      // width,
      location,
      loading
    } = this.props;

    // console.log(location)

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
        loading={loading}
      >
        {children}
      </AdminPageTemplate>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: fromStatus.isLoading(state)
})

export default compose(
  // withWidth(),
  connect(mapStateToProps),
)(AdminPageTemplateContainer);
