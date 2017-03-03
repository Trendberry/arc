import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createHistory } from 'history'
import match from 'react-router/lib/match'
import Router from 'react-router/lib/Router'
import useRouterHistory from 'react-router/lib/useRouterHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'

import { MuiThemeProvider, styleManager, theme } from 'mui'

import routes from 'routes'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__
const baseHistory = useRouterHistory(createHistory)({ basename })
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

// Create a styleManager instance.

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

if (module.hot) {
  module.hot.accept('routes', () => {
    renderApp()
  })
}

renderApp()
