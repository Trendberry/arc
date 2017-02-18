import React from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'

const styles = createStyleSheet('NotFoundPage', (theme) => ({
  '@keyframes floating': {
    '0%': { transform: 'translate3d(0, 0, 0)' },
    '45%': { transform: 'translate3d(0, -10%, 0)' },
    '55%': { transform: 'translate3d(0, -10%, 0)' },
    '100%': { transform: 'translate3d(0, 0, 0)' },
  },
  '@keyframes floatingShadow': {
    '0%': { transform: 'scale(1)' },
    '45%': { transform: 'scale(0.85)' },
    '55%': { transform: 'scale(0.85)' },
    '100%': { transform: 'scale(1)' },
  },
  container: {
    color: theme.palette.text.secondary,
    fontSize: '16px',
    height: 'calc(100vh - 80px)',
    position: 'relative',
    textAlign: 'center',
    '& h1': {
      fontSize: '32px',
      marginTop: '32px'
    },
  },
  booWrapper: {
    width: '100%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    paddingTop: '64px',
    paddingBottom: '64px'
  },
  boo: {
    width: '160px',
    height: '184px',
    backgroundColor: theme.palette.background.contentFrame,
    marginLeft: 'auto',
    marginRight: 'auto',
    // border: '3.39394px solid #9b9b9b',
    borderBottom: '0',
    overflow: 'hidden',
    borderRadius: '80px 80px 0 0',
    boxShadow: `-16px 0 0 0 ${theme.palette.text.lightDivider} inset`,
    position: 'relative',
    paddingBottom: '32px',
    animation: 'floating 3s ease-in-out infinite',
    '&:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '-18.82353px',
      bottom: '-8.31169px',
      width: 'calc(100% + 32px)',
      height: '32px',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '32px 32px',
      backgroundPosition: 'left bottom',
      backgroundImage: `linear-gradient(-45deg, ${theme.palette.background.default} 16px, transparent 0),
                        linear-gradient(45deg, ${theme.palette.background.default} 16px, transparent 0)`
    },
  },
  booFace: {
    backgroundColor: theme.palette.text.secondary,
    borderRadius: 5,
    bottom: 56,
    height: 3.2,
    left: '50%',
    position: 'absolute',
    transform: 'translateX(-50%)',
    width: 24,
    '&:before, &:after': {
      backgroundColor: theme.palette.text.secondary,
      borderRadius: '50%',
      bottom: 40,
      content: '""',
      display: 'block',
      height: 6,
      position: 'absolute',
      width: 6,
    },
    '&:before': {
      left: -24
    },
    '&:after': {
      right: -24
    },
  },
  booShadow: {
    animation: 'floatingShadow 3s ease-in-out infinite',
    backgroundColor: theme.palette.text.divider,
    borderRadius: '50%',
    height: 16,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 40,
    width: 128,
  }
}))

const NotFoundPage = (props, context) => {

  const classes = context.styleManager.render(styles)

  return (
    <div>
      <div className={classes.container}>
        <div className={classes.booWrapper}>
          <div className={classes.boo}>
            <div className={classes.booFace}></div>
          </div>
          <div className={classes.booShadow}></div>

          <h1>Whoops!</h1>
          <p>
            We couldn't find the page you
            <br />
            were looking for.
          </p>
        </div>
      </div>
    </div>
  )
}

NotFoundPage.contextTypes = {
  theme: customPropTypes.muiRequired,
  styleManager: customPropTypes.muiRequired,
}

export default NotFoundPage
