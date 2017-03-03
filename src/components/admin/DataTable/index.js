import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
// import keycode from 'keycode'
import customPropTypes from 'material-ui/utils/customPropTypes'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Checkbox from 'material-ui/Checkbox'

import { DataTableHead, DataTableFooter } from 'containers'
import { DataTableToolbar } from 'components'

const styleSheet = createStyleSheet('DataTable', () => ({
  paper: {
    width: '100%',
  },
}))

const DataTable = (props, context) => {
  const classes = context.styleManager.render(styleSheet)
  const {
    columnData,
    data,
    selected,
    count,
    getData,
    handleSelectAllClick,
    isSelected,
    handleCheckboxClick,
    // handleKeyDown,
    title,
  } = props

  return (
    <Paper elevation={2} className={classes.paper}>
      <DataTableToolbar title={title} numSelected={selected.length} />
      <Table>
        <DataTableHead {...{ getData, columnData, handleSelectAllClick }} />
        <TableBody>
          {data.length > 0 && data.map((n) => {
            const isNSelected = isSelected(n._id)
            return (
              <TableRow
                hover
                // onClick={(event) => handleClick(event, n._id)}
                // onKeyDown={(event) => handleKeyDown(event, n._id)}
                role="checkbox"
                aria-checked={isNSelected}
                tabIndex="-1"
                key={n._id}
                selected={isNSelected}
              >
                <TableCell checkbox>
                  <Checkbox checked={isNSelected} onClick={(event) => handleCheckboxClick(event, n._id)} />
                </TableCell>
                {columnData.map(({ id, numeric, padding, style }) => {
                  let content
                  if (React.isValidElement(n[id])) {
                    content = React.cloneElement(n[id])
                  } else if (typeof props.cell === 'function') {
                    content = n[id]()
                  } else {
                    content = n[id]
                  }
                  return (
                    <TableCell key={id} padding={padding} numeric={numeric} style={style}>{content}</TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <DataTableFooter {...{ getData, count }} />
    </Paper>
  )
}

DataTable.propTypes = {
  columnData: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  getData: PropTypes.func.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleCheckboxClick: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

DataTable.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

export default DataTable
