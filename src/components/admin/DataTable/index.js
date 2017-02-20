import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from 'material-ui/utils/customPropTypes';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import { DataTableHead } from 'containers'
import { DataTableToolbar } from 'components'

const styleSheet = createStyleSheet('DataTable', () => ({
  paper: {
    width: '100%',
    marginTop: 30,
  },
}));

const DataTable = (props, context) => {
  const classes = context.styleManager.render(styleSheet);

  const {
    data,
    order,
    orderBy,
    selected,

    columnData,

    handleSelectAllClick,
    handleRequestSort,
    isSelected,
    handleClick,
    handleKeyDown

  } = props

  return (
    <Paper elevation={2} className={classes.paper}>
      <DataTableToolbar numSelected={selected.length} />
      <Table>
        <DataTableHead
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          columnData={columnData}
        />
        <TableBody>
          {data.map((n) => {
            const isNSelected = isSelected(n.id);
            return (
              <TableRow
                hover
                onClick={(event) => handleClick(event, n.id)}
                onKeyDown={(event) => handleKeyDown(event, n.id)}
                role="checkbox"
                aria-checked={isNSelected}
                tabIndex="-1"
                key={n.id}
                selected={isNSelected}
              >
                <TableCell checkbox>
                  <Checkbox checked={isNSelected} />
                </TableCell>
                <TableCell padding={false}>{n.name}</TableCell>
                <TableCell numeric>{n.calories}</TableCell>
                <TableCell numeric>{n.fat}</TableCell>
                <TableCell numeric>{n.carbs}</TableCell>
                <TableCell numeric>{n.protein}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

DataTable.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

export default DataTable
