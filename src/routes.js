import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import { AdminPageTemplate, AdminCategoryListPage, AdminCategoryCreatePage, AdminCategoryUpdatePage, NotFoundPage } from 'containers'

const getRoutes = (store) => {

  const fetchData = (nextState, replace, callback) => {
    const Component = nextState.routes[nextState.routes.length - 1].component
    const canUseDOM = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )

    if(typeof Component.get === 'function' && canUseDOM) {
      Component.get({ store, ...nextState })
        .then(result => {
          callback()
        })
        .catch(error => {
          callback(error)
        })
    } else {
      callback()
    }
  }

  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomePage} />

      <Route path="/admin" component={AdminPageTemplate}>
        <IndexRoute component={HomePage} />

        <Route path="categories">
          <IndexRoute component={AdminCategoryListPage} onEnter={fetchData} />
          <Route path="create" component={AdminCategoryCreatePage} />
          <Route path=":id/update" component={AdminCategoryUpdatePage} />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Route>

    </Route>
  )
}

export default getRoutes
