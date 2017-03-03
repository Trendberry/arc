import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import { easing, duration } from 'material-ui/styles/transitions'
import dateFormat from 'dateformat'

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

  }
})

const Name = (props, context) => {
  const classes = context.styleManager.render(styleSheet)
  const { listItem } = props

  return (
    <span className={classes.name}>
      {listItem.ancestors.map(ancestor => {
        return <span key={ancestor._id} className={classes.ancestor}><span>{ancestor.name}</span></span>
      })}
      {listItem.name}
    </span>
  )
}

Name.propTypes = {
  listItem: PropTypes.object.isRequired,
}

Name.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

const AdminCategoryListPage = (props) => {
  const { list, count, getList } = props

  const columnData = [
    { id: 'name', numeric: false, padding: false, label: 'Name' },
    { id: 'created', numeric: false, padding: true, label: 'Created', style: { width: '1%' } },
  ]

  const data = []

  list.forEach(listItem => {
    const { name, created } = listItem
    const date = new Date(created)

    data.push({
      ...listItem,
      name: <Name listItem={listItem} name={name} />,
      created: dateFormat(date, 'hh:MM TT mm/dd/yyyy'),
    })
  })

  return (
    <div>
      <Helmet title="Categories" />
      <DataTable title="Categories" {...{ columnData, data, getData: getList, count }} />
    </div>
  )
}

AdminCategoryListPage.propTypes = {
  count: PropTypes.number,
  getList: PropTypes.func.isRequired,
  list: PropTypes.array,
}

AdminCategoryListPage.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default AdminCategoryListPage
