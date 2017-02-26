import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { createHistory } from 'history'
import { Router, useRouterHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { basename } from 'config'
import configureStore from 'store/configure'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createPalette from 'material-ui/styles/palette'
import createMuiTheme from 'material-ui/styles/theme'
import { blue, pink } from 'material-ui/styles/colors'

import routes from 'routes'

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

// Create a styleManager instance.
const { styleManager, theme } = createStyleManager();

const renderApp = () => {
  match({ history, routes: routes(store), location }, (error, redirectLocation, renderProps) => {

    console.log('-------------------client-------------------')
    console.log(location)
    console.log(renderProps.location)
    console.log('-------------------client-------------------')

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
