import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import createMuiTheme from 'material-ui/styles/theme'
import createPalette from 'material-ui/styles/palette'
import { blue, pink } from 'material-ui/styles/colors'

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

const { styleManager, theme } = createStyleManager()

export { MuiThemeProvider, styleManager, theme }
