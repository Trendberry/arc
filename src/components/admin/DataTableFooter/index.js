import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import { createStyleSheet } from 'jss-theme-reactor'
import classNames from 'classnames'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Text from 'material-ui/Text'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'
import { Menu, MenuItem } from 'material-ui/Menu'

const IconPrev = (props) => (
  <SvgIcon {...props}>
    <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
  </SvgIcon>
)

const IconNext = (props) => (
  <SvgIcon {...props}>
    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
  </SvgIcon>
)

const IconCaret = (props) => (
  <SvgIcon {...props}>
    <path d="M7,10L12,15L17,10H7Z" />
  </SvgIcon>
)

const toolbarStyleSheet = createStyleSheet('DataTableFooter', (theme) => {
  return {
    toolbar: { paddingRight: 12 },
    spacer: { flex: '1 1 100%' },
    pagination: {
      color: theme.palette.text.secondary,
      marginRight: -10,
      whiteSpace: 'nowrap',
      '& > *': {
        verticalAlign: 'top',
      },
    },
    text: {
      display: 'inline-block',
      lineHeight: '24px',
      padding: '12px 20px',
    },
    pages: {
      position: 'absolute',
      right: 36,
    },
    label: {
      marginRight: 8,
    },
    title: { flex: '0 0 auto' },
  }
})

const DataTableFooter = (props, context) => {
  const classes = context.styleManager.render(toolbarStyleSheet)

  const {
    startIndex, endIndex, anchorEl, open, selectedIndex, count,
    hasPrev,
    hasNext,
    prevPageLink,
    nextPageLink,
    limitOptions,
    onClickPrevPage,
    onClickNextPage,
    handleRequestClose,
    handleRequestOpen,
    handleMenuItemClick,
  } = props

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.spacer} />
      <div className={classes.pagination}>
        <Text className={classNames(classes.text, classes.label)} type="caption">Rows per page</Text>
        <IconButton onClick={handleRequestOpen}>
          <Text className={classes.pages} type="caption">{limitOptions[selectedIndex]}</Text><IconCaret />
        </IconButton>
        <Text className={classes.text} type="caption">{startIndex}-{endIndex} of {count}</Text>
        <IconButton component={hasPrev ? Link : 'span'} to={prevPageLink} onClick={hasPrev ? onClickPrevPage : () => false} disabled={startIndex === 1}><IconPrev /></IconButton>
        <IconButton component={hasNext ? Link : 'span'} to={nextPageLink} onClick={hasNext ? onClickNextPage : () => false} disabled={endIndex === count}><IconNext /></IconButton>
      </div>
      <Menu
        {...{ anchorEl, open }}
        onRequestClose={handleRequestClose}
      >
        {limitOptions.map((option, index) => {
          return (
            <MenuItem
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          )
        })}
      </Menu>
    </Toolbar>
  )
}

DataTableFooter.propTypes = {
  hasPrev: PropTypes.bool.isRequired,
  hasNext: PropTypes.bool.isRequired,
  prevPageLink: PropTypes.any.isRequired,
  nextPageLink: PropTypes.any.isRequired,
  onClickPrevPage: PropTypes.func.isRequired,
  onClickNextPage: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  handleMenuItemClick: PropTypes.func.isRequired,
  anchorEl: PropTypes.object,
  count: PropTypes.number,
  startIndex: PropTypes.number,
  endIndex: PropTypes.number,
  limitOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  open: PropTypes.bool,
  selectedIndex: PropTypes.number,
  location: PropTypes.object,
}

DataTableFooter.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

export default DataTableFooter
