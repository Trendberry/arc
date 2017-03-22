import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'

import customPropTypes from 'material-ui/utils/customPropTypes'
import IconButton from 'material-ui/IconButton'
import Text from 'material-ui/Text'
import Toolbar from 'material-ui/Toolbar'

import { SearchWidget } from 'containers'

const styleSheet = createStyleSheet('DataTableToolbar', (theme) => {
  return {
    root: { paddingRight: 12 },
    highlight: (
      theme.palette.type === 'light' ? {
        color: theme.palette.accent[500],
        backgroundColor: theme.palette.accent[50],
      } : {
        color: theme.palette.accent[50],
        backgroundColor: theme.palette.accent[500],
      }
    ),
    subheading: {
      color: theme.palette.accent[500],
    },
    spacer: { flex: '1 1 100%' },
    actions: {
      flex: '0 0 auto',
      color: theme.palette.text.secondary,
      marginRight: -10,
      whiteSpace: 'nowrap',
    },
    title: { flex: '0 0 auto' },
  }
})

const DataTableToolbar = (props, context) => {
  const { numSelected, title, getData, children } = props
  const classes = context.styleManager.render(styleSheet)
  let classNames = classes.root

  if (numSelected > 0) {
    classNames += ` ${classes.highlight}`
  }

  return (
    <Toolbar className={classNames}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Text className={classes.subheading} type="subheading">{numSelected} selected</Text>
        ) : (
          <Text type="title">{title}</Text>
        )}
      </div>
      <div className={classes.spacer} />
      {numSelected > 0 ? (
        <div className={classes.actions}>
          <IconButton>delete</IconButton>
        </div>
      ) : (
        <div className={classes.actions}>
          <SearchWidget getData={getData} />
          {children}
        </div>
      )}
    </Toolbar>
  )
}

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
}

DataTableToolbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

export default DataTableToolbar
