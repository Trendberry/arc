import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'
import { MuiThemeProvider, styleManager, theme } from 'mui'

class App extends Component {

  static propTypes = {
    children: PropTypes.any,
  }

  componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render() {
    const { children } = this.props

    return (
      <div>
        <Helmet
          title="Trendberry"
          titleTemplate="Trendberry | %s"
          meta={[
            { name: 'description', content: 'Shops catalog' },
            { property: 'og:site_name', content: 'ARc' },
            { property: 'og:image', content: '/thumbnail.png' },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
          ]}
          link={[
            { rel: 'icon', href: '/icon.png' },
          ]}
        />
        <MuiThemeProvider styleManager={styleManager} theme={theme}>{children}</MuiThemeProvider>
      </div>
    )
  }
}

export default App
