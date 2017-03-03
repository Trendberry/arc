import React, { PropTypes } from 'react'
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from 'material-ui/Table'
import Checkbox from 'material-ui/Checkbox'

const DataTableHead = (props) => {
  const {
    _order,
    _sort,
    columnData,
    handleSelectAllClick,
    handleRequestSort,
  } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ paddingRight: 12, width: '1%' }} checkbox>
          <Checkbox onChange={handleSelectAllClick} />
        </TableCell>

        {columnData.map((column) => {
          return (
            <TableCell key={column.id} numeric={column.numeric} padding={column.padding}>
              <TableSortLabel
                active={_sort === column.id}
                direction={_order}
                onClick={(event) => handleRequestSort(event, column.id)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          )
        }, this)}
      </TableRow>
    </TableHead>
  )
}

DataTableHead.propTypes = {
  columnData: PropTypes.array.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  handleSelectAllClick: PropTypes.func.isRequired,
  _order: PropTypes.string.isRequired,
  _sort: PropTypes.string.isRequired,
}

export default DataTableHead
