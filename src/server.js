/* eslint-disable no-console */
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
import { env, port, ip, basename } from 'config'
import { setCsrfToken } from 'store/actions'
import Html from 'components/Html'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import createPalette from 'material-ui/styles/palette';
import createMuiTheme from 'material-ui/styles/theme';
import { blue, pink } from 'material-ui/styles/colors';

const router = new Router()

router.use(csrf({ cookie: true }))

const createStyleManager = () => (
  MuiThemeProvider.createDefaultContext({
    theme: createMuiTheme({
      palette: createPalette({
        primary: blue,
        accent: pink,
        type: 'light',
      }),
    }),
  })
)

router.use((req, res, next) => {
  if (env === 'development') {
    global.webpackIsomorphicTools.refresh()
  }

  const location = req.url.replace(basename, '')
  const memoryHistory = createMemoryHistory({ basename })
  const store = configureStore({}, memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  store.dispatch(setCsrfToken(req.csrfToken()))

  match({ history, routes, location }, (error, redirectLocation, renderProps) => {
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

      // Create a styleManager instance.
      const { styleManager, theme } = createStyleManager()

      const content = renderToString(
        <Provider store={store}>
          <MuiThemeProvider styleManager={styleManager} theme={theme}>
            <RouterContext {...renderProps} />
          </MuiThemeProvider>
        </Provider>
      )

      const styles = styleManager.sheetsToString() //.replace(/[\n|\s]+/g, ' ') //styleSheet.rules().map(rule => rule.cssText).join('\n')
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
    console.info(`Listening on http://${ip}:${port}`)
  }
})

export default app
