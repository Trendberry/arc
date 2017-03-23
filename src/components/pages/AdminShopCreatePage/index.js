import React from 'react'
import Helmet from 'react-helmet'

import { AdminShopForm } from 'containers'

const AdminShopCreatePage = () => {
  return (
    <div>
      <Helmet title="Create Shop" />
      <AdminShopForm />
    </div>
  )
}

export default AdminShopCreatePage
