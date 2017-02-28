import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose';

import { fromEntities, fromCategory, fromStatus } from 'store/selectors'
import { categoryList, CATEGORY_LIST } from 'store/actions'
import { AdminCategoryListPage } from 'components'

class AdminCategoryListPageContainer extends Component {
  constructor(props){
    super(props)
  }

  static get({ store, location: { query } }) {
    query || (query = {})
    query._limit || (query._limit = 15)
    query._order || (query._order = 'DESC')

    return new Promise((resolve, reject) => {
      store.dispatch(categoryList.request(query, resolve, reject))
    })
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number.isRequired,
    limit: PropTypes.number
  }

  static defaultProps = {
    limit: 15
  }

  render() {
    const { list, count } = this.props
    const getList = this.constructor.get
    return <AdminCategoryListPage {...{ list, count, getList }} />
  }
}

const mapStateToProps = (state, ownProps)  => {
 return ({
    list: fromEntities.getList(state, 'category', fromCategory.getList(state)),
    count: fromCategory.getCount(state)
  })
}

export default connect(mapStateToProps)(AdminCategoryListPageContainer)
