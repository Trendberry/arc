import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { DataTable } from 'components'

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

const columnData = [
  { id: 'name', numeric: false, padding: false, label: 'Dessert (100g serving)' },
  { id: 'calories', numeric: true, padding: true, label: 'Calories' },
  { id: 'fat', numeric: true, padding: true, label: 'Fat (g)' },
  { id: 'carbs', numeric: true, padding: true, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, padding: true, label: 'Protein (g)' },
];


class DataTableContainer extends Component {

  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    data: [
      createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
      createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
      createData('Eclair', 262, 16.0, 24, 6.0),
      createData('Cupcake', 305, 3.7, 67, 4.3),
      createData('Gingerbread', 356, 16.0, 49, 3.9),
    ],
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    const data = this.state.data.sort(
      (a, b) => (
        order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]
      ),
    );

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      return this.setState({ selected: this.state.data.map((n) => n.id) });
    }
    return this.setState({ selected: [] });
  };

  handleKeyDown = (event, id) => {
    if (keycode(event) === 'space') {
      this.handleClick(event, id);
    }
  }

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  isSelected = (id) => {
    return this.state.selected.indexOf(id) !== -1;
  }


  render() {
    const columnData = [
      { id: 'name', numeric: false, padding: false, label: 'Dessert (100g serving)' },
      { id: 'calories', numeric: true, padding: true, label: 'Calories' },
      { id: 'fat', numeric: true, padding: true, label: 'Fat (g)' },
      { id: 'carbs', numeric: true, padding: true, label: 'Carbs (g)' },
      { id: 'protein', numeric: true, padding: true, label: 'Protein (g)' },
    ];

    return (
      <DataTable
        {...this.state}
        {...this.props}

        columnData={columnData}

        handleSelectAllClick={this.handleSelectAllClick}
        handleRequestSort={this.handleRequestSort}
        isSelected={this.isSelected}
        handleClick={this.handleClick}
        handleKeyDown={this.handleKeyDown}
      />
    );
  }
}


export default DataTableContainer
