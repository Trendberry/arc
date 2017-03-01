import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { categoryList } from 'store/actions'

import { DataTable } from 'components'

class DataTableContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      data: props.data
    }
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      return this.setState({ selected: this.state.data.map((n) => n._id) });
    }
    return this.setState({ selected: [] });
  }

  handleKeyDown = (event, _id) => {
    if (keycode(event) === 'space') {
      this.handleCheckboxClick(event, _id);
    }
  }

  handleCheckboxClick = (event, _id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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
  }

  isSelected = (_id) => {
    return this.state.selected.indexOf(_id) !== -1;
  }

  componentWillReceiveProps(nextProps){
    this.setState({ data: nextProps.data })
  }

  render() {

    const { title, columnData, getData, count } = this.props
    const { selected, data } = this.state

    return (
      <DataTable
        {...this.props}
        {...{ selected, data }}

        handleSelectAllClick={this.handleSelectAllClick}
        isSelected={this.isSelected}
        handleCheckboxClick={this.handleCheckboxClick}
        handleKeyDown={this.handleKeyDown}
      />
    )
  }
}

export default DataTableContainer
