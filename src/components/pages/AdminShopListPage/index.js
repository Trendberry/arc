import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import Helmet from 'react-helmet'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import { easing, duration } from 'material-ui/styles/transitions'
import IconButton from 'material-ui/IconButton';
import ModeEditIcon from 'material-ui/svg-icons/mode-edit';
import dateFormat from 'dateformat'
import SvgIcon from 'material-ui/SvgIcon'

const DotsVertIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
  </SvgIcon>
)

const IconAdd = (props) => (
  <SvgIcon {...props}>
    <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
  </SvgIcon>
)

import { DataTable } from 'containers'

const styleSheet = createStyleSheet('Name', (theme) => {
  return {
    ancestor: {
      color: theme.palette.text.secondary,
      display: 'inline-block',
      verticalAlign: 'top',
      '&:after': {
        background: theme.palette.text.divider,
        borderRadius: '50%',
        display: 'inline-block',
        content: '""',
        height: 8,
        marginRight: 8,
        verticalAlign: 'baseline',
        width: 8,
      },
      '& > span': {
        display: 'inline-block',
        maxWidth: 0,
        opacity: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transition: `all ${duration.standard}ms ${easing.easeOut}`,
        verticalAlign: 'top',
      },
    },
    name: {
      display: 'inline-block',
      margin: -12,
      padding: 12,
      verticalAlign: 'top',
      '&:hover $ancestor span': {
        opacity: 1,
        marginRight: 8,
        maxWidth: 150,
      },
    },
    actions: {
      opacity: 0,
    },
    'tr:hover $actions': {
      opacity: 1,
    },
  }
})

const actionsStyleSheet = createStyleSheet('Actions', (theme) => {
  return {
    actions: {
      opacity: 0,
      'tr:hover &': {
        opacity: 1,
      },
    },
  }
})

const Actions = (props, context) => {
  const classes = context.styleManager.render(actionsStyleSheet)
  const { listItem } = props

  return (
    <div className={classes.actions}>
      <IconButton component={Link} to={`/admin/shops/edit/${listItem._id}`}><ModeEditIcon /></IconButton>
      <IconButton><DotsVertIcon /></IconButton>
    </div>
  )
}

Actions.propTypes = {
  listItem: PropTypes.object.isRequired,
}

Actions.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

const AdminShopListPage = (props) => {
  const { list, count, getList, title } = props

  const columnData = [
    { id: 'name', numeric: false, padding: false, label: 'Name' },
    // { id: 'created', numeric: false, padding: true, label: 'Created', style: { width: '1%' } },
    { id: 'actions', numeric: false, padding: false, label: '', style: { width: '1%' } },
  ]

  const data = []

  list.forEach(listItem => {
    const { name, created } = listItem
    const date = created ? new Date(created) : new Date()

    data.push({
      ...listItem,
      created: dateFormat(date, 'hh:MM TT mm/dd/yyyy'),
      actions: <Actions listItem={listItem} />,
    })
  })


  return (
    <div>
      <Helmet title={title} />
      <DataTable title={title} {...{ columnData, data, getData: getList, count }} toolbarChildren={<IconButton component={Link} to="/admin/shops/create"><IconAdd /></IconButton>} />
    </div>
  )
}

AdminShopListPage.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  getList: PropTypes.func.isRequired,
  list: PropTypes.array,
}

AdminShopListPage.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default AdminShopListPage
