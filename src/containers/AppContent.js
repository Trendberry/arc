import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router'
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
import { AppContent } from 'components'
import { fromStatus } from 'store/selectors'
import shallowEqual from 'react-redux/lib/utils/shallowEqual'

class AppContentContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }

  // static propTypes = {
  //   children: PropTypes.node.isRequired,
  //   // width: PropTypes.string.isRequired,
  // }

  // static propTypes = {
  //   loading: PropTypes.bool,
  // }


  // shouldComponentUpdate(nextProps, nextState) {
  //   return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  // }

  render() {
  // console.log(this.props.loading)
    return (
        <AppContent {...this.props} />
    );
  }
}

const mapStateToProps = (state) => ({
  loading: fromStatus.isLoading(state)
})

export default connect(mapStateToProps)(AppContentContainer)
