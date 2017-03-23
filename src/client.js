import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createHistory } from 'history'
import { match, Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'

import routes from 'routes'

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__
const baseHistory = useRouterHistory(createHistory)({ basename })
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

// We create this wrapper so that we only import react-hot-loader for a
// development build.  Small savings. :)
const ReactHotLoader =
  process.env.NODE_ENV === 'development'
  ? AppContainer
  : ({ children }) => React.Children.only(children)

const renderApp = () => {
  match({ history, routes: routes(store) }, (error, redirectLocation, renderProps) => {
    render(
      <ReactHotLoader>
        <Provider store={store}>
          <Router key={Math.random()} {...renderProps} />
        </Provider>
      </ReactHotLoader>,
      root
    )
  })
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    renderApp()
  })
}

renderApp()
