import React, { Component, PropTypes } from 'react';
import { createStyleSheet } from 'jss-theme-reactor';
import keycode from 'keycode';
import customPropTypes from 'material-ui/utils/customPropTypes';

import { categoryList } from 'store/actions'

import { DataTable } from 'components'

class DataTableContainer extends Component {

  state = {
    _order: this.context.router.location.query._order.toLowerCase() || 'asc',
    _sort: this.context.router.location.query._sort || 'date',
    _page: this.context.router.location.query._page || 1,
    selected: [],
    data: this.props.data,
  }

  handleRequestSort = (event, property) => {
    const _sort = property;
    let _order = 'desc';

    if (this.state._sort === property && this.state._order === 'desc') {
      _order = 'asc';
    }

    this.setState({ _order, _sort });

    const query = this.context.router.location.query
    _sort && (query._sort = _sort)
    _order && (query._order = _order.toUpperCase())

    this.context.router.push({
      ...this.context.router.location,
      query
    })

    this.props.getData({ store: this.context.store, ...{ ...this.context.router, query} })

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

    const { title, columnData, getData } = this.props
    const {  _order, _sort, selected, data } = this.state

    return (
      <DataTable

        title={title}
        columnData={columnData}

        _order={_order}
        _sort={_sort}
        selected={selected}
        data={this.state.data}

        {...{ getData }}

        handleSelectAllClick={this.handleSelectAllClick}
        handleRequestSort={this.handleRequestSort}
        isSelected={this.isSelected}
        handleCheckboxClick={this.handleCheckboxClick}
        handleKeyDown={this.handleKeyDown}
      />
    );
  }
}

DataTableContainer.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object
}

export default DataTableContainer
