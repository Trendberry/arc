import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createPalette from 'material-ui/styles/palette'
import createMuiTheme from 'material-ui/styles/theme'
import { blue, pink } from 'material-ui/styles/colors'

import getRoutes from 'routes'

const { pathname, search, hash } = window.location
const location = `${pathname}${search}${hash}`

// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__
const baseHistory = useRouterHistory(createHistory)({ entries: [location], basename })
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

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

const routes = getRoutes(store)

// Create a styleManager instance.
const { styleManager, theme } = createStyleManager();

const renderApp = (renderProps) => (
  <AppContainer>
    <MuiThemeProvider styleManager={styleManager} theme={theme}>
      <Provider store={store}>
        <Router {...renderProps} />
      </Provider>
    </MuiThemeProvider>
  </AppContainer>
)

match({ history, routes, location }, (error, redirectLocation, renderProps) => {

console.log('-------------------client-------------------')
console.log(location)
console.log(renderProps.location)
console.log('-------------------client-------------------')
  render(renderApp(renderProps), root)
})

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
