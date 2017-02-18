import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { createStyleSheet } from 'jss-theme-reactor'
import keycode from 'keycode'
import customPropTypes from 'material-ui/utils/customPropTypes'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from 'material-ui/Table'
import Toolbar from 'material-ui/Toolbar'
import Text from 'material-ui/Text'
import IconButton from 'material-ui/IconButton'
import Paper from 'material-ui/Paper'
import SvgIcon from 'material-ui/SvgIcon'
import { CircularProgress } from 'material-ui/Progress'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const IconAdd = (props) => (
  <SvgIcon {...props}>
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </SvgIcon>
);

const toolbarStyleSheet = createStyleSheet('EnhancedTableToolbar', (theme) => {
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
  };
});

function EnhancedTableToolbar(props, context) {
  const { numSelected } = props;
  const classes = context.styleManager.render(toolbarStyleSheet);
  let classNames = classes.root;

  if (numSelected > 0) {
    classNames += ` ${classes.highlight}`;
  }

  return (
    <Toolbar className={classNames}>
      <div className={classes.title}>
        <Text type="title">Categories</Text>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <IconButton to="/admin/categories/create" component={Link}>
          <IconAdd />
        </IconButton>
      </div>
    </Toolbar>
  );
}

EnhancedTableToolbar.contextTypes = {
  styleManager: customPropTypes.muiRequired,
};


const AdminCategoryList = ({ list, loading, ...props }) => {
  return (
    /*<ReactCSSTransitionGroup
        component="div"
        transitionName="example2"
        transitionEnterTimeout={550}
        transitionLeaveTimeout={275}
      >
      {loading ?
        <CircularProgress key="loading" style={{ position: 'absolute' }} /> :*/
        <Paper key="paper" elevation={2}>
          <EnhancedTableToolbar />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell style={{ width: '1%' }}>Created</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((category) => {
                return (
                  <TableRow key={category._id}>
                    <TableCell>
                      <Link to={`/admin/categories/${category._id}/update`}>{category.name}</Link>
                    </TableCell>
                    <TableCell>{category.created}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
    //   }
    // </ReactCSSTransitionGroup>
  )
}
      // {list.map(category => <DIV key={category._id}>{category.name}</DIV>)}

AdminCategoryList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool
}

export default AdminCategoryList
