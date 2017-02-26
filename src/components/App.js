import React, { Component, PropTypes } from 'react'
import Helmet from 'react-helmet'

class App extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  }

  componentDidMount(){
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { children, location } = this.props

    return (
      <div>
        <Helmet
          title="Atomic React"
          titleTemplate="ARc - %s"
          meta={[
            { name: 'description', content: 'React starter kit based on Atomic Design with React Router v4, Webpack, Redux, Server Side Rendering and more.' },
            { property: 'og:site_name', content: 'ARc' },
            { property: 'og:image', content: 'https://diegohaz.github.io/arc/thumbnail.png' },
            { property: 'og:image:type', content: 'image/png' },
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' }
          ]}
          link={[
            { rel: 'icon', href: 'https://diegohaz.github.io/arc/icon.png' }
          ]}
        />
        {children}
      </div>
    )
  }
}

export default App
