import React, { PropTypes } from 'react'
import { createStyleSheet } from 'jss-theme-reactor'
import classNames from 'classnames'
import customPropTypes from 'material-ui/utils/customPropTypes'
import FormControl from 'material-ui/Form/FormControl'
import Input from 'material-ui/Input'
import InputLabel from 'material-ui/Input/InputLabel'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/Menu/MenuItem'
import MenuList from 'material-ui/Menu/MenuList'
import SvgIcon from 'material-ui/SvgIcon'

const IconMenuDown = (props) => (
  <SvgIcon {...props}>
    <path d="M7,10L12,15L17,10H7Z" />
  </SvgIcon>
)

const styleSheetCustomInput = createStyleSheet('CustomInput', (theme) => {
  return {
    root: {
      borderBottom: `1px solid ${theme.palette.text.divider}`,
    },
    input: {
      cursor: 'pointer',
      position: 'relative',
      zIndex: 2,
    },
    icon: {
      color: theme.palette.text.secondary,
      position: 'absolute',
      right: 0,
      top: 4,
      zIndex: 1,
    },
  }
})

const CustomInput = (props, context) => {
  const classes = context.styleManager.render(styleSheetCustomInput)
  return (
    <div className={classes.root}>
      <input {...props} className={classNames(props.className, classes.input)} />
      <input {...props} type="hidden" />
      <IconMenuDown className={classes.icon} />
    </div>
  )
}

CustomInput.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}


const styleSheet = createStyleSheet('AutocompleteSelect', (theme) => {
  return {
    searchItem: {
      backgroundColor: 'transparent !important',
      borderBottom: `1px solid ${theme.palette.text.divider}`,
      marginBottom: 8,
      marginTop: -8,
      padding: 0,
    },
    searchInput: {
      margin: 0,
      padding: 16,
    },
  }
})

const AutocompleteSelect = (props, context) => {
  const classes = context.styleManager.render(styleSheet)
  const { options,
    anchorEl,
    open,
    handleClickListItem,
    handleRequestClose,
    handleMenuItemClick,
    selectedIndex,
    onInputChange,
    searchInput
  } = props

  return (
    <FormControl onFocus={(event) => {event.preventDefault(); return false}}>
      <InputLabel htmlFor="parent">
        Parent
      </InputLabel>
      <Input
        id="parent"
        readOnly
        value={selectedIndex > -1 ? options[selectedIndex].value : ''}
        component={CustomInput}
        underline={false}
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="When device is locked"
        onClick={handleClickListItem}
      >
      </Input>

      <Menu
        id="lock-menu"
        className={classes.menu}
        open={open}
        anchorEl={anchorEl}
        onRequestClose={handleRequestClose}
      >
        <MenuItem className={classes.searchItem}>
          <Input ref={searchInput} underline={false} className={classes.searchInput} onChange={(event) => onInputChange(event)} />
        </MenuItem>
        <MenuItem onClick={(event) => handleMenuItemClick(event, -1)}>
          None
        </MenuItem>
        {/*<MenuList>*/}
          {options.map((option, index) => {
            return (
              <MenuItem
                key={index}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option.value}
              </MenuItem>
            );
          })}
        {/*</MenuList>*/}
      </Menu>
    </FormControl>
  )
}

AutocompleteSelect.propTypes = {
  open: PropTypes.bool,
  options: PropTypes.array,
  onInputChange: PropTypes.func.isRequired,
}

AutocompleteSelect.defaultProps = {
  open: false,
  options: [],
}

AutocompleteSelect.contextTypes = {
  styleManager: customPropTypes.muiRequired,
  theme: customPropTypes.muiRequired,
}

export default AutocompleteSelect
