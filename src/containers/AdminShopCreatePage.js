import React, { Component } from 'react'
import submit from 'redux-form-submit'

import { AdminShopCreatePage } from 'components'
import { config } from './AdminCategoryForm'

class AdminShopCreatePageContainer extends Component {
  static post({ req, store }) {
    return Promise.all([
      this.get({ store }),
      store.dispatch(submit(config, req.body)),
    ])
  }

  render() {
    return <AdminShopCreatePage />
  }
}

export default AdminShopCreatePageContainer
