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
    order,
    orderBy,
    columnData,
    onSelectAllClick,
    createSortHandler
  } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell checkbox>
          <Checkbox onChange={onSelectAllClick} />
        </TableCell>

        {columnData.map((column) => {
          return (
            <TableCell key={column.id} numeric={column.numeric} padding={column.padding}>
              <TableSortLabel
                active={orderBy === column.id}
                direction={order}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            </TableCell>
          )
        }, this)}
      </TableRow>
    </TableHead>
  );
}

DataTableHead.propTypes = {
  columnData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    numeric: PropTypes.bool,
    padding: PropTypes.bool,
    label: PropTypes.string
  })).isRequired,
  createSortHandler: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

export default DataTableHead
