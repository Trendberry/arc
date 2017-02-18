import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fromEntities, fromCategory, fromStatus } from 'store/selectors'
import { categoryList, CATEGORY_LIST } from 'store/actions'

import { AdminCategoryList } from 'components'

class AdminCategoryListContainer extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.object).isRequired,
    limit: PropTypes.number,
    loading: PropTypes.bool,
    request: PropTypes.func.isRequired
  }

  static defaultProps = {
    limit: 15
  }

  componentDidMount() {
    this.props.request()
  }

  render() {
    const { list, loading } = this.props
    return <AdminCategoryList {...{ list, loading }} />
  }
}

const mapStateToProps = (state) => ({
  list: fromEntities.getList(state, 'category', fromCategory.getList(state)),
  loading: fromStatus.isLoading(state, CATEGORY_LIST)
})

const mapDispatchToProps = (dispatch, { limit }) => ({
  request: () => dispatch(categoryList.request(limit))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminCategoryListContainer)
