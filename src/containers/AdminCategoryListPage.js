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
    return new Promise((resolve, reject) => {
      store.dispatch(categoryList.request(15, resolve, reject))
    })
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    limit: PropTypes.number
  }

  static defaultProps = {
    limit: 15
  }

  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    const { list } = this.props
    return <AdminCategoryListPage {...{ list }} />
  }
}

const mapStateToProps = (state, ownProps)  => {
 return ({
    list: fromEntities.getList(state, 'category', fromCategory.getList(state))
  })
}

export default connect(mapStateToProps)(AdminCategoryListPageContainer)
