import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Text from 'material-ui/Text'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'

const toolbarStyleSheet = createStyleSheet('DataTableToolbar', (theme) => {
  return {
    root: { paddingRight: 12 },
    highlight: (
      theme.palette.type === 'light' ? {
        color: theme.palette.accent[800],
        backgroundColor: theme.palette.accent[50],
      } : {
        color: theme.palette.accent[50],
        backgroundColor: theme.palette.accent[800],
      }
    ),
    spacer: { flex: '1 1 100%' },
    actions: { color: theme.palette.text.secondary },
    title: { flex: '0 0 auto' },
  }
})

const DataTableToolbar = (props, context) => {
  const { numSelected } = props;
  const classes = context.styleManager.render(toolbarStyleSheet);
  let classNames = classes.root;

  if (numSelected > 0) {
    classNames += ` ${classes.highlight}`;
  }

  return (
    <Toolbar className={classNames}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Text type="subheading">{numSelected} selected</Text>
        ) : (
          <Text type="title">Nutrition</Text>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <IconButton>delete</IconButton>
        ) : (
          <IconButton>filter_list</IconButton>
        )}
      </div>
    </Toolbar>
  );
}

DataTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

DataTableToolbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};

export default DataTableToolbar
