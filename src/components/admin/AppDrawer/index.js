import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { createStyleSheet } from 'jss-theme-reactor';
import shallowEqual from 'recompose/shallowEqual';
import { List, ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Text from 'material-ui/Text';
import Divider from 'material-ui/Divider';
import customPropTypes from 'material-ui/utils/customPropTypes';
// import AppDrawerNavItem from './AppDrawerNavItem';
import SvgIcon from 'material-ui/SvgIcon';

const IconDashboard = (props) => (
  <SvgIcon {...props}>
    <path d="M13,3V9H21V3M13,21H21V11H13M3,21H11V15H3M3,13H11V3H3V13Z" />
  </SvgIcon>
);

const IconCategories = (props) => (
  <SvgIcon {...props}>
    <path d="M22,4H14L12,2H6A2,2 0 0,0 4,4V16A2,2 0 0,0 6,18H22A2,2 0 0,0 24,16V6A2,2 0 0,0 22,4M2,6H0V11H0V20A2,2 0 0,0 2,22H20V20H2V6Z" />
  </SvgIcon>
);

const IconShops = (props) => (
  <SvgIcon {...props}>
    <path d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z" />
  </SvgIcon>
);

const IconVendors = (props) => (
  <SvgIcon {...props}>
    <path d="M16.23,18L12,15.45L7.77,18L8.89,13.19L5.16,9.96L10.08,9.54L12,5L13.92,9.53L18.84,9.95L15.11,13.18L16.23,18M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
  </SvgIcon>
);

const IconProducts = (props) => (
  <SvgIcon {...props}>
    <path d="M12,13A5,5 0 0,1 7,8H9A3,3 0 0,0 12,11A3,3 0 0,0 15,8H17A5,5 0 0,1 12,13M12,3A3,3 0 0,1 15,6H9A3,3 0 0,1 12,3M19,6H17A5,5 0 0,0 12,1A5,5 0 0,0 7,6H5C3.89,6 3,6.89 3,8V20A2,2 0 0,0 5,22H19A2,2 0 0,0 21,20V8C21,6.89 20.1,6 19,6Z" />
  </SvgIcon>
);

const IconUsers = (props) => (
  <SvgIcon {...props}>
    <path d="M16,13C15.71,13 15.38,13 15.03,13.05C16.19,13.89 17,15 17,16.5V19H23V16.5C23,14.17 18.33,13 16,13M8,13C5.67,13 1,14.17 1,16.5V19H15V16.5C15,14.17 10.33,13 8,13M8,11A3,3 0 0,0 11,8A3,3 0 0,0 8,5A3,3 0 0,0 5,8A3,3 0 0,0 8,11M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5A3,3 0 0,0 13,8A3,3 0 0,0 16,11Z" />
  </SvgIcon>
);

const IconSettings = (props) => (
  <SvgIcon {...props}>
    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z" />
  </SvgIcon>
);

export const styleSheet = createStyleSheet('AppDrawer', (theme) => {
  return {
    paper: {
      width: '250px',
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      color: theme.palette.text.secondary,
      '&:hover': {
        textDecoration: 'none',
        color: theme.palette.primary[500],
      },
    },
    listItem: {
      color: theme.palette.text.primary,
      paddingBottom: 12,
      paddingTop: 12,
      '&.active $listItemIcon': {
        color: theme.palette.accent['A200'],
      },
    },
    listItemIcon: {
      color: theme.palette.text.secondary,
    },
    [theme.breakpoints.up('lg')]: {
      paper: {
        backgroundColor: 'transparent',
        borderRight: '0 !important',
        height: 'calc(100vh - 64px)',
        top: '64px',
        zIndex: 1000
      },
      toolbar: {
        display: 'none'
      }
    }
  };
});

const AppDrawer = (props, context) =>  {

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   return (
  //     !shallowEqual(props, nextProps) ||
  //     !shallowEqual(state, nextState) ||
  //     !shallowEqual(context, nextContext)
  //   );
  // }

  const classes = context.styleManager.render(styleSheet);

  return (
    <Drawer
      className={props.className}
      paperClassName={classes.paper}
      open={props.open}
      onRequestClose={props.onRequestClose}
      docked={props.docked}
    >
      <div className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.title} to="/" onClick={props.onRequestClose}>
            <Text type="title">Material UI</Text>
          </Link>
          <Divider absolute />
        </Toolbar>

        <List>
          <ListItem to="/admin" component={Link} className={classes.listItem} activeClassName="active" onlyActiveOnIndex={true} button>
            <ListItemIcon className={classes.listItemIcon}><IconDashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem to="/admin/categories" component={Link} className={classes.listItem} activeClassName="active" button>
            <ListItemIcon className={classes.listItemIcon}><IconCategories /></ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItem>
          <ListItem to="/admin/shop" component={Link} className={classes.listItem} activeClassName="active" button>
            <ListItemIcon className={classes.listItemIcon}><IconShops /></ListItemIcon>
            <ListItemText primary="Shops" />
          </ListItem>
          <ListItem to="/admin/vendors" component={Link} className={classes.listItem} activeClassName="active" button>
            <ListItemIcon className={classes.listItemIcon}><IconVendors /></ListItemIcon>
            <ListItemText primary="Vendors" />
          </ListItem>
          <ListItem to="/admin/products" component={Link} className={classes.listItem} activeClassName="active" button>
            <ListItemIcon className={classes.listItemIcon}><IconProducts /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem to="/admin/users" component={Link} className={classes.listItem} activeClassName="active" button>
            <ListItemIcon className={classes.listItemIcon}><IconUsers /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </List>
        <Divider style={{ marginRight: 0 }} />
        <List>
          <ListItem to="/admin/settings" component={Link} className={classes.listItem} activeClassName="active" button>
            <ListItemIcon className={classes.listItemIcon}><IconSettings /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  className: PropTypes.string,
  docked: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

AppDrawer.contextTypes = {
  theme: customPropTypes.muiRequired,
  styleManager: customPropTypes.muiRequired,
}

export default AppDrawer
