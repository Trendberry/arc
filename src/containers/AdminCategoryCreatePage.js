import React, { Component } from 'react'
import submit from 'redux-form-submit'

import { AdminCategoryCreatePage } from 'components'
import { config } from './AdminCategoryForm'

class AdminCategoryCreatePageContainer extends Component {
  static post({ req, store }) {
    return Promise.all([
      this.get({ store }),
      store.dispatch(submit(config, req.body))
    ])
  }

  render() {
    return <AdminCategoryCreatePage />
  }
}

export default AdminCategoryCreatePageContainer
