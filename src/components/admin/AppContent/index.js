import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const styleSheet = createStyleSheet('AppContent', (theme) => {
  return {
    content: theme.mixins.gutters({
      paddingBottom: 24,
      paddingTop: 92,
      flex: '1 1 100%',
      maxWidth: '100%',
      margin: '0 auto',
    }),
    // [theme.breakpoints.up(948)]: {
    //   content: {
    //     maxWidth: 900,
    //   },
    // },
  };
});

const AppContent = (props, context) => {
  const { className, children, location, loading } = props;
  const classes = context.styleManager.render(styleSheet);

  // let loading2 = loading || true

  return (
    <ReactCSSTransitionGroup
      className={classNames(classes.content, className)}
      component="div"
      transitionEnterTimeout={loading === true ? 10000 : 500}
      transitionLeaveTimeout={loading === true ? 10000 : 275}

       transitionName={{
        enter: 'enter',
        enterActive: `enter-active${loading === true ? ' loading' : ''}`,
        leave: 'leave',
        leaveActive: `leave-active${loading === true ? ' loading' : ''}`,
        appear: 'appear',
        appearActive: 'appear-active'
      }}
    >
      {/*<div key={location.pathname}>{children}</div>*/}
      {/*{loading ? <CircularProgress /> : <div key={location.pathname}>{children}</div>}*/}
      {React.cloneElement(children, {
        key: location.pathname
      })}
    </ReactCSSTransitionGroup>
  )
}

AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

AppContent.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

export default AppContent
