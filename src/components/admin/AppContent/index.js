import React, { PropTypes } from 'react'
import classNames from 'classnames'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
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
  }
})

const AppContent = (props, context) => {
  const { className, children } = props
  const classes = context.styleManager.render(styleSheet)

  return (
    <ReactCSSTransitionGroup
      className={classNames(classes.content, className)}
      component="div"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={275}
      transitionName={{
        enter: 'enter',
        enterActive: 'enter-active',
        leave: 'leave',
        leaveActive: 'leave-active',
        appear: 'appear',
        appearActive: 'appear-active',
      }}
    >
      {/* <div key={location.pathname}>{children}</div> */}
      {/* {loading ? <CircularProgress /> : <div key={location.pathname}>{children}</div>} */}
      {React.cloneElement(children, {
        key: context.router.location.pathname,
      })}
    </ReactCSSTransitionGroup>
  )
}

AppContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

AppContent.contextTypes = {
  router: PropTypes.object.isRequired,
  styleManager: customPropTypes.muiRequired,
}

export default AppContent
