import React from 'react'
import Helmet from 'react-helmet'

import { AdminCategoryList } from 'containers'

const AdminCategoryListPage = () => {
  return (
    <div>
      <Helmet title="Posts Page" />
      <AdminCategoryList limit={15} />
    </div>
  )
}

export default AdminCategoryListPage
