import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import classNames from 'classnames'

import customPropTypes from 'material-ui/utils/customPropTypes'
import IconButton from 'material-ui/IconButton'
import Input from 'material-ui/Input/Input'
import SvgIcon from 'material-ui/SvgIcon'

const IconSearch = (props) => (
  <SvgIcon {...props}>
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
  </SvgIcon>
)

const IconClose = (props) => (
  <SvgIcon {...props}>
    <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
  </SvgIcon>
)

const styleSheet = createStyleSheet('SearchWidget', (theme) => {
  return {
    root: {
      display: 'inline-flex',

      // flexDirection: 'row',
      // flexWrap: 'nowrap',
      // justifyContent: 'flex-start',
      // alignContent: 'stretch',
      alignItems: 'center',
    },
    field: {
      overflow: 'hidden',
      padding: '8px 0',
      transition: `width ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
      width: 0,
    },
    open: {
      width: 240,
    },
    input: {
      width: 240,
    },
    button: {
      verticalAlign: 'middle',
    },
    close: {
      display: 'none',
      marginLeft: -32,
      animation: `search-widget-appear ${theme.transitions.duration.short}ms ${theme.transitions.easing.easeInOut}`,
    },
    visible: {
      display: 'inline-flex',
    },
    '@keyframes search-widget-appear': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },
  }
})

const SearchWidget = (props, context) => {
  const { open, searchInput, onRequestOpen, onRequestClose, onInputBlur, initialValue } = props
  const classes = context.styleManager.render(styleSheet)

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={onRequestOpen}>
        <IconSearch />
      </IconButton>
      <div className={classNames(classes.field, { [classes.open]: open })}>
        <Input className={classes.input} value={initialValue} ref={searchInput} onBlur={(event) => onInputBlur(event)} />
      </div>
      <IconButton className={classNames(classes.button, classes.close, { [classes.visible]: open })} onClick={onRequestClose}>
        <IconClose />
      </IconButton>
    </div>
  )
}


SearchWidget.propTypes = {
  open: PropTypes.bool,
  onRequestOpen: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onInputBlur: PropTypes.func.isRequired,
  searchInput: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
}

SearchWidget.defultProps = {
  open: false,
  initialValue: '',
}

SearchWidget.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default SearchWidget
