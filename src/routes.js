import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import { AdminPageTemplate, AdminCategoryListPage, AdminCategoryCreatePage, AdminCategoryUpdatePage, NotFoundPage } from 'containers'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />

    <Route path="/admin" component={AdminPageTemplate}>
      <IndexRoute component={HomePage} />

      <Route path="categories">
        <IndexRoute component={AdminCategoryListPage} />
        <Route path="create" component={AdminCategoryCreatePage} />
        <Route path=":id/update" component={AdminCategoryUpdatePage} />
      </Route>

      <Route path="*" component={NotFoundPage} />
    </Route>

  </Route>
)

export default routes
