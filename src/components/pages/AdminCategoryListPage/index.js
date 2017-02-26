import React from 'react'
import Helmet from 'react-helmet'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import { easing, durations } from 'material-ui/styles/transitions'
import dateFormat from 'dateformat'

import { DataTable } from 'containers'

const styleSheet = createStyleSheet('AdminCategoryListPage', (theme) => {
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
        width: 8
      },

      '& > span': {
        display: 'inline-block',
        maxWidth: 0,
        opacity: 0,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transition: `all ${durations.standard}ms ${easing.easeOut}`,
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
        maxWidth: 150
      }
    },

  }
})

const AdminCategoryListPage = (props, context) => {
  const { list } = props
  const classes = context.styleManager.render(styleSheet)

  const columnData = [
    { id: 'altName', numeric: false, padding: false, label: 'Name' },
    { id: 'created', numeric: false, padding: true, label: 'Created', style: { width: '1%' } },
  ]

  list.map(listItem => {
    let { name, created } = listItem
    listItem.altName = {__html: `
      <span class="${classes.name}">
        ${listItem.ancestors.map(ancestor => {
          return `<span class="${classes.ancestor}"><span>${ancestor.name}</span></span>`
        }).join('')}
        ${name}
      </span>
    `}

    let date = new Date(created)
    listItem.created = dateFormat(date, 'hh:MM TT mm/dd/yyyy')

    return listItem
  })

  return (
    <div>
      <Helmet title="Categories" />
      <DataTable title="Categories" columnData={columnData} data={list} />
    </div>
  )
}

AdminCategoryListPage.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default AdminCategoryListPage
