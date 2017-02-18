import React, { Component } from 'react'
import { categoryList } from 'store/actions'

import { AdminCategoryListPage } from 'components'

class AdminCategoryListPageContainer extends Component {
  static get({ store }) {
    return new Promise((resolve, reject) => {
      store.dispatch(categoryList.request(15, resolve, reject))
    })
  }

  render() {
    return <AdminCategoryListPage />
  }
}

export default AdminCategoryListPageContainer
