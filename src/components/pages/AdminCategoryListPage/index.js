import React from 'react'
import Helmet from 'react-helmet'

import { DataTable } from 'containers'

const AdminCategoryListPage = () => {
  return (
    <div>
      <Helmet title="Posts Page" />
      {/*<AdminCategoryList limit={15} />*/}
      <DataTable />
    </div>
  )
}

export default AdminCategoryListPage
