import React from 'react'
import { createStyleSheet } from 'jss-theme-reactor';
import customPropTypes from 'material-ui/utils/customPropTypes';
import Text from 'material-ui/Text';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/menu';
import LightbulbOutlineIcon from 'material-ui/svg-icons/lightbulb-outline';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { AppDrawer, AppContent } from 'components'
import { CircularProgress } from 'material-ui/Progress';

const styleSheet = createStyleSheet('PageTemplateContainer', (theme) => {
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
        overflowY: 'scroll'
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

      '.example-enter': {
        height: 0,
        opacity: 0,
        transition: 'all .275s .275s cubic-bezier(0.0, 0.0, 0.2, 1)',
        transform: 'translateY(100px)',
      },
      '.example-enter.example-enter-active': {
        opacity: 1,
        transform: 'translateY(0)',
      },
      '.example-leave': {
        height: 0,
        opacity: 1,
        transition: 'all .275s cubic-bezier(0.4, 0.0, 0.2, 1)',
        transform: 'translateY(0)',
      },
      '.example-leave.example-leave-active': {
        opacity: 0,
        transform: 'translateY(100px)',
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
      marginLeft: 24,
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
        width: '250px',
      },
      appBarShift: {
        // width: 'calc(100% - 250px)',
      },
      navIconHide: {
        // display: 'none',
      },
    },
  };
});

const AdminPageTemplate = (props, context) =>  {
  const {
    handleDrawerToggle,
    handleToggleShade,
    handleDrawerClose,
    children,
    drawerDocked,
    drawerOpen,
    location,
    loading
  } = props

  console.log(loading)

  const classes = context.styleManager.render(styleSheet);
  const title = ''

  let navIconClassName = classes.navIcon;
  let appBarClassName = classes.appBar;

  if (title === null) { // home route, don't shift app bar or dock drawer
    // drawerDocked = false;
    appBarClassName += ` ${classes.appBarHome}`;
  } else {
    navIconClassName += ` ${classes.navIconHide}`;
    appBarClassName += ` ${classes.appBarShift}`;
  }

  return (
    <div className={classes.PageTemplateContainer}>
      <AppBar className={appBarClassName}>
        <Toolbar>
          <IconButton contrast onClick={handleDrawerToggle} className={navIconClassName}>
            <MenuIcon />
          </IconButton>
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
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={550}
          transitionLeaveTimeout={275}
        >
          {/*<div key={location.pathname}>{children}</div>*/}
          {/*{loading ? <CircularProgress /> : <div key={location.pathname}>{children}</div>}*/}
          {React.cloneElement(children, {
            key: location.pathname
          })}
          </ReactCSSTransitionGroup>
      </AppContent>
    </div>
  )
}

AdminPageTemplate.contextTypes = {
  theme: customPropTypes.muiRequired,
  styleManager: customPropTypes.muiRequired,
}

export default AdminPageTemplate
