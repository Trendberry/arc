import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Text from 'material-ui/Text'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui/svg-icons/menu'
import LightbulbOutlineIcon from 'material-ui/svg-icons/lightbulb-outline'

import { AppDrawer, AppContent } from 'components'

const styleSheet = createStyleSheet('AdminPageTemplate', (theme) => {
  return {
    '@global': {
      html: {
        boxSizing: 'border-box',
      },
      '*, *:before, *:after': {
        boxSizing: 'inherit',
      },
      body: {
        margin: 0,
        background: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        lineHeight: '1.2',
        overflowX: 'hidden',
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale', // Antialiasing.
        overflowY: 'scroll',
      },
      a: {
        color: theme.palette.accent.A400,
        textDecoration: 'none',
      },
      'a:hover': {
        textDecoration: 'underline',
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
        width: 'auto',
      },

      '.enter': {
        height: 0,
        opacity: 0,
        transition: 'all .275s .275s cubic-bezier(0.0, 0.0, 0.2, 1)',
        transform: 'translateY(100px)',
      },
      '.enter.enter-active': {
        opacity: 1,
        transform: 'translateY(0)',
      },
      '.leave': {
        height: 0,
        opacity: 1,
        transition: 'all .275s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: 'translateY(0)',
      },
      '.leave.leave-active': {
        opacity: 0,
        transform: 'translateY(100px)',
      },

      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        background: theme.palette.accent.A100,
        position: 'fixed',
        zIndex: 9999,
        top: 0,
        left: 0,
        width: '100%',
        height: 2,
      },
      '#nprogress .peg': {
        display: 'block',
        position: 'absolute',
        right: 0,
        width: 100,
        height: '100%',
        boxShadow: `0 0 10px ${theme.palette.accent.A100}, 0 0 5px ${theme.palette.accent.A100}`,
        opacity: 1,
        transform: 'rotate(3deg) translate(0px, -4px)',
      },
      '#nprogress .spinner': {
        display: 'block',
        position: 'fixed',
        zIndex: 9999,
        top: 15,
        right: 15,
      },
      '#nprogress .spinner-icon': {
        width: 18,
        height: 18,
        boxSizing: 'border-box',
        border: 'solid 2px transparent',
        borderTopColor: '#29d',
        borderLeftColor: '#29d',
        borderRadius: '50%',
        animation: 'nprogress-spinner 400ms linear infinite',
      },
      '.nprogress-custom-parent': {
        overflow: 'hidden',
        position: 'relative',
      },
      '.nprogress-custom-parent #nprogress .spinner, .nprogress-custom-parent #nprogress .bar': {
        position: 'absolute',
      },
      '@keyframes nprogress-spinner': {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },

      // '.example2-enter': {
      //   opacity: 0.01,
      //   transition: 'all .275s cubic-bezier(0.0, 0.0, 0.2, 1)',
      //   transform: 'translateY(100px)',
      // },
      // '.example2-enter.example2-enter-active': {
      //   opacity: 1,
      //   transform: 'translateY(0)',
      // },
      // '.example2-leave': {
      //   transition: 'translateY .275s cubic-bezier(0.4, 0.0, 0.2, 1)',
      //   transform: 'translateY(0)',
      // },
      // '.example2-leave.example2-leave-active': {
      //   transform: 'translateY(-100px)',
      // },

    },
    PageTemplateContainer: {
      display: 'flex',
      alignItems: 'stretch',
      minHeight: '100vh',
      width: '100%',
    },
    navIcon: {
      marginLeft: -12,
    },
    grow: {
      flex: '1 1 100%',
    },
    toggleShade: {
      marginRight: -12,
    },
    title: {
      marginLeft: 12,
      flex: '0 0 auto',
    },
    subTitle: {
      borderLeft: `1px solid ${theme.palette.shades.dark.text.icon}`,
      fontWeight: 300,
      marginLeft: 24,
      paddingLeft: 24,
      flex: '0 0 auto',
    },
    appBar: {
      left: 'auto',
      right: 0,
      transition: theme.transitions.create('width'),
    },
    appBarHome: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      drawer: {
        width: 250,
      },
      appBarShift: {
        // width: 'calc(100% - 250px)',
      },
      navIconHide: {
        // display: 'none',
      },
    },
  }
})

const AdminPageTemplate = (props, context) => {
  const {
    handleDrawerToggle,
    handleToggleShade,
    handleDrawerClose,
    children,
    drawerDocked,
    drawerOpen,
    title,
  } = props

  const classes = context.styleManager.render(styleSheet)

  let navIconClassName = classes.navIcon
  let appBarClassName = classes.appBar

  if (title === null) { // home route, don't shift app bar or dock drawer
    // drawerDocked = false
    // appBarClassName += ` ${classes.appBarHome}`
  } else {
    navIconClassName += ` ${classes.navIconHide}`
    appBarClassName += ` ${classes.appBarShift}`
  }

  return (
    <div className={classes.PageTemplateContainer}>
      <AppBar className={appBarClassName}>
        <Toolbar>
          <IconButton contrast onClick={handleDrawerToggle} className={navIconClassName}>
            <MenuIcon />
          </IconButton>
          {/* <Text className={classes.title} type="title" colorInherit>Trendberry</Text> */}
          {title !== null && (
            <Text className={classes.title} type="title" colorInherit>
              {title}
            </Text>
          )}
          <div className={classes.grow} />
          <IconButton contrast onClick={handleToggleShade} className={classes.toggleShade}>
            <LightbulbOutlineIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppDrawer
        className={classes.drawer}
        docked={drawerDocked}
        onRequestClose={handleDrawerClose}
        open={drawerOpen}
      />
      <AppContent>
        {children}
      </AppContent>
    </div>
  )
}

AdminPageTemplate.propTypes = {
  handleDrawerToggle: PropTypes.func.isRequired,
  handleToggleShade: PropTypes.func.isRequired,
  handleDrawerClose: PropTypes.func.isRequired,
  children: PropTypes.element,
  drawerDocked: PropTypes.bool,
  drawerOpen: PropTypes.bool,
  title: PropTypes.string,
}

AdminPageTemplate.defaultProps = {
  title: null,
}

AdminPageTemplate.contextTypes = {
  theme: customPropTypes.muiRequired,
  styleManager: customPropTypes.muiRequired,
}

export default AdminPageTemplate
