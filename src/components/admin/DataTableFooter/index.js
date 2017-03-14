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
    toolbar: { paddingRight: 2 },
    spacer: { flex: '1 1 100%' },
    pagination: {
      color: theme.palette.text.secondary,
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
    _limit,
    _page,
    anchorEl,
    count,
    endIndex,
    handleMenuItemClick,
    handleRequestClose,
    handleRequestOpen,
    hasNext,
    hasPrev,
    limitOptions,
    onClickNextPage,
    onClickPrevPage,
    open,
    startIndex,
  } = props

  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.spacer} />
      <div className={classes.pagination}>
        <Text className={classNames(classes.text, classes.label)} type="caption">Rows per page</Text>
        <IconButton onClick={handleRequestOpen}>
          <Text className={classes.pages} type="caption">{_limit}</Text><IconCaret />
        </IconButton>
        <Text className={classes.text} type="caption">{count && `${startIndex}-${endIndex}`} of {count}</Text>
        {hasPrev ?
          <IconButton component={Link} to={hasPrev && (location => ({ ...location, query: { ...location.query, _page: _page - 1 } }))} onClick={(event) => onClickPrevPage(event)}><IconPrev /></IconButton> :
          <IconButton component={'span'} disabled><IconPrev /></IconButton>
        }
        {hasNext ?
          <IconButton component={Link} to={hasNext && (location => ({ ...location, query: { ...location.query, _page: _page + 1 } }))} onClick={(event) => onClickNextPage(event)}><IconNext /></IconButton> :
          <IconButton component={'span'} disabled><IconNext /></IconButton>
        }
      </div>
      <Menu
        {...{ anchorEl, open }}
        onRequestClose={handleRequestClose}
      >
        {limitOptions.map((option, index) => {
          return (
            <MenuItem
              key={option}
              selected={option === _limit}
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
  _limit: PropTypes.number.isRequired,
  _page: PropTypes.number.isRequired,
  anchorEl: PropTypes.object,
  count: PropTypes.number,
  endIndex: PropTypes.number,
  handleMenuItemClick: PropTypes.func.isRequired,
  handleRequestClose: PropTypes.func.isRequired,
  handleRequestOpen: PropTypes.func.isRequired,
  hasNext: PropTypes.bool.isRequired,
  hasPrev: PropTypes.bool.isRequired,
  limitOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  location: PropTypes.object,
  onClickNextPage: PropTypes.func.isRequired,
  onClickPrevPage: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  startIndex: PropTypes.number,
}

DataTableFooter.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

export default DataTableFooter
