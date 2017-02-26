import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from 'components/App'
import { HomePage } from 'components'
import { AdminPageTemplate, AdminCategoryListPage, AdminCategoryCreatePage, AdminCategoryUpdatePage, NotFoundPage } from 'containers'

import NProgress from 'nprogress'


const getRoutes = (store) => {

  const fetchData = (nextState, replace, callback) => {
    const Component = nextState.routes[nextState.routes.length - 1].component
    const canUseDOM = !!(
      typeof window !== 'undefined' &&
      window.document &&
      window.document.createElement
    )

    if(typeof Component.get === 'function' && canUseDOM) {
      canUseDOM &&
      NProgress.configure({
        showSpinner: false,
        speed: 500,
        trickleSpeed: 200
      }) &&
      NProgress.start()

      Component.get({ store, ...nextState })
        .then(result => {
          canUseDOM && NProgress.done()
          callback()
        })
        .catch(error => {
          canUseDOM && NProgress.done()
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
          <IndexRoute component={AdminCategoryListPage} />
          <Route path="create" component={AdminCategoryCreatePage} />
          <Route path=":id/update" component={AdminCategoryUpdatePage} />
        </Route>

        <Route path="*" component={NotFoundPage} />
      </Route>

    </Route>
  )
}

export default getRoutes
