import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { AdminShopForm } from 'containers'

const AdminShopUpdatePage = ({ id }) => {
  return (
    <div>
      <Helmet title="Edit shop" />
      <AdminShopForm id={id} />
    </div>
  )
}

AdminShopUpdatePage.propTypes = {
  id: PropTypes.any.isRequired,
}

export default AdminShopUpdatePage
