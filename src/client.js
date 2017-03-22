import 'babel-polyfill'
import 'react-hot-loader/patch'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import { match, Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'

import routes from 'routes'

import { MuiThemeProvider, styleManager, theme } from 'mui'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__
const baseHistory = useRouterHistory(createHistory)({ basename })
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

const renderApp = () => {
  match({ history, routes: routes(store), location }, (error, redirectLocation, renderProps) => {
    render(
      <AppContainer>
        <MuiThemeProvider styleManager={styleManager} theme={theme}>
          <Provider store={store}>
            <Router key={Math.random()} {...renderProps} />
          </Provider>
        </MuiThemeProvider>
      </AppContainer>,
      root,
    )
  })
}

renderApp()

if (module.hot) {
  module.hot.accept('routes', () => {
    renderApp()
  })
}

