/* eslint-disable no-console */
import 'babel-polyfill'
import React from 'react'
import serialize from 'serialize-javascript'
import csrf from 'csurf'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createMemoryHistory, RouterContext, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router } from 'express'
import express from 'services/express'
import routes from 'routes'
import configureStore from 'store/configure'
import { port, ip, basename } from 'config'
import { setCsrfToken } from 'store/actions'
import Html from 'components/Html'
import { styleManager } from 'mui'

const router = new Router()

router.use(csrf({ cookie: true }))

router.use((req, res, next) => {
  const location = req.url.replace(basename, '')
  const memoryHistory = createMemoryHistory({ basename })
  const store = configureStore({}, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  store.dispatch(setCsrfToken(req.csrfToken()))

  match({ history, routes: routes(store), location }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    }

    if (error || !renderProps) {
      return next(error)
    }

    const fetchData = () => new Promise((resolve, reject) => {
      const method = req.method.toLowerCase()
      const { params, location, components } = renderProps
      const promises = []

      components.forEach((component) => {
        if (component) {
          while (component && !component[method]) {
            // eslint-disable-next-line no-param-reassign
            component = component.WrappedComponent
          }
          component &&
          component[method] &&
          promises.push(component[method]({ req, res, params, location, store }))
        }
      })

      Promise.all(promises).then(resolve).catch(reject)
    })

    const render = (store) => {
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )

      const styles = styleManager.sheetsToString()
      const initialState = store.getState()
      const assets = global.webpackIsomorphicTools.assets()
      const state = `window.__INITIAL_STATE__ = ${serialize(initialState)}`
      const markup = <Html {...{ styles, assets, state, content }} />
      const doctype = '<!doctype html>\n'
      const html = renderToStaticMarkup(markup)

      res.send(doctype + html)
    }

    return fetchData().then(() => {
      render(configureStore(store.getState(), memoryHistory))
    }).catch((err) => {
      console.log(err)
      res.status(500).end()
    })
  })
})

const app = express(router)

app.listen(port, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info(`local: http://${ip}:${port}`)
  }
})

export default app
