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
    onSelectAllClick,
    createSortHandler
  } = props

  return (
    <TableHead>
      <TableRow>
        <TableCell style={{ paddingRight: 12, width: '1%' }} checkbox>
          <Checkbox onChange={onSelectAllClick} />
        </TableCell>

        {columnData.map((column) => {
          return (
            <TableCell key={column.id} numeric={column.numeric} padding={column.padding}>
              <TableSortLabel
                active={_sort === column.id}
                direction={_order}
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
  _order: PropTypes.string.isRequired,
  _sort: PropTypes.string.isRequired,
}

export default DataTableHead
