import React from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Layout from 'material-ui/Layout'
import Paper from 'material-ui/Paper'

import { AdminLoginPageTemplate } from 'components'

const styleSheet = createStyleSheet('AdminLoginPage', (theme) => {
  return {
    root: {
      backgroundColor: theme.palette.primary[500],
      flexGrow: 1,
    },
    demo: {
      height: 240,
    },
    paper: {
      padding: 12,
      height: '100%',
    },
    control: {
      padding: 12,
    },
  };
});

const AdminLoginPage = (props, context) => {
  const classes = context.styleManager.render(styleSheet)

  return (
    <Layout container className={classes.root}>
      <Paper className={classes.paper}>Hello World</Paper>
    </Layout>
  )
}

AdminLoginPage.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default AdminLoginPage
