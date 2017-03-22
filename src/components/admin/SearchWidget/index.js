import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import classNames from 'classnames'
import customPropTypes from 'material-ui/utils/customPropTypes'
import IconButton from 'material-ui/IconButton'
import Input from 'material-ui/Input/Input'

import IconSearch from 'material-ui-icons/Search'
import IconClose from 'material-ui-icons/Close'

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
  const { open, searchInput, onRequestOpen, onRequestClose, onInputBlur, onInputChange, inputValue } = props
  const classes = context.styleManager.render(styleSheet)

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={onRequestOpen}>
        <IconSearch />
      </IconButton>
      <div className={classNames(classes.field, { [classes.open]: open })}>
        <Input className={classes.input} value={inputValue} ref={searchInput} onBlur={(event) => onInputBlur(event)} onChange={(event) => onInputChange(event)} />
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
  onInputChange: PropTypes.func.isRequired,
  searchInput: PropTypes.func.isRequired,
  inputValue: PropTypes.string,
}

SearchWidget.defultProps = {
  open: false,
  inputValue: '',
}

SearchWidget.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default SearchWidget
