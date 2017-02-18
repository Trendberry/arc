import React from 'react'
import Helmet from 'react-helmet'

import { AdminCategoryForm } from 'containers'

const AdminCategoryCreatePage = () => {
  return (
    <div>
      <Helmet title="Category Create Page" />
      <AdminCategoryForm />
    </div>
  )
}

export default AdminCategoryCreatePage
