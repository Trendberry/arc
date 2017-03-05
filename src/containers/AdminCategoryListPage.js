import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fromEntities, fromCategory } from 'store/selectors'
import { categoryList } from 'store/actions'
import { AdminCategoryListPage } from 'components'

class AdminCategoryListPageContainer extends Component {
  static get({ store, location: { query } }) {
    const params = { ...query }
    if (!params._limit) params._limit = 15

    return new Promise((resolve, reject) => {
      store.dispatch(categoryList.request(params, resolve, reject))
    })
  }

  static contextTypes = {
    handleSetTitle: PropTypes.func.isRequired,
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      title: 'Categories',
    }
  }

  componentWillMount() {
    this.context.handleSetTitle(this.state.title)
  }

  render() {
    const { list, count } = this.props
    const getList = this.constructor.get
    return <AdminCategoryListPage {...{ list, count, getList, title: this.state.title }} />
  }
}

const mapStateToProps = (state) => {
  return ({
    list: fromEntities.getList(state, 'category', fromCategory.getList(state)),
    count: fromCategory.getCount(state),
  })
}

export default connect(mapStateToProps)(AdminCategoryListPageContainer)
