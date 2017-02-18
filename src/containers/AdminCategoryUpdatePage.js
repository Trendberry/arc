import React, { Component, PropTypes } from 'react'
import submit from 'redux-form-submit'
import { categoryRead } from 'store/actions'

import { AdminCategoryUpdatePage } from 'components'
import { config } from './AdminCategoryForm'

class AdminCategoryUpdatePageContainer extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  }

  static post({ req, store }) {
    return Promise.all([
      this.get({ store }),
      store.dispatch(submit(config, req.body))
    ])
  }

  static get({ store, ...props }) {
    return new Promise((resolve, reject) => {
      store.dispatch(categoryRead.request(props.params.id, resolve, reject))
    })
  }

  render() {
    const props = this.props
    return <AdminCategoryUpdatePage id={props.params.id} />
  }
}

export default AdminCategoryUpdatePageContainer
