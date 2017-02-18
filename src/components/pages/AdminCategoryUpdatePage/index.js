import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

import { PageTemplate, Header, Footer } from 'components'
import { AdminCategoryForm } from 'containers'

const AdminCategoryUpdatePage = ({ id }) => {
  return (
    <div>
      <Helmet title="Category Update Page" />
      <AdminCategoryForm id={id} />
    </div>
  )
}

AdminCategoryUpdatePage.propTypes = {
  id: PropTypes.any.isRequired
}

export default AdminCategoryUpdatePage
