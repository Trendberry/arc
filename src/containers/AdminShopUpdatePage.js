import React, { Component, PropTypes } from 'react'
import submit from 'redux-form-submit'
import { shopDetailReadRequest } from 'store/actions'

import { AdminShopUpdatePage } from 'components'
import { config } from './AdminShopForm'

class AdminShopUpdatePageContainer extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
  }

  static post({ req, store }) {
    return Promise.all([
      this.get({ store }),
      store.dispatch(submit(config, req.body)),
    ])
  }

  static get({ store, ...props }) {
    return new Promise((resolve, reject) => {
      store.dispatch(shopDetailReadRequest(props.params.id, resolve, reject))
    })
  }

  render() {
    const props = this.props
    return <AdminShopUpdatePage id={props.params.id} />
  }
}

export default AdminShopUpdatePageContainer
