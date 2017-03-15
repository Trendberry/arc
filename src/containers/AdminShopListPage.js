import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fromEntities, fromShop } from 'store/selectors'
import { shopList } from 'store/actions'
import { AdminShopListPage } from 'components'

class AdminShopListPageContainer extends Component {
  static get({ store, location: { query } }) {
    const params = { ...query }
    if (!params._limit) params._limit = 15

    return new Promise((resolve, reject) => {
      store.dispatch(shopList.request(params, resolve, reject))
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
      title: 'Shops',
    }
  }

  componentWillMount() {
    this.context.handleSetTitle(this.state.title)
  }

  render() {
    const { list, count } = this.props
    const getList = this.constructor.get
    return <AdminShopListPage {...{ list, count, getList, title: this.state.title }} />
  }
}

const mapStateToProps = (state) => {
  return ({
    list: fromEntities.getList(state, 'shop', fromShop.getList(state)),
    count: fromShop.getCount(state),
  })
}

export default connect(mapStateToProps)(AdminShopListPageContainer)
