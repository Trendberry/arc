import React, { Component } from 'react'
import { Editor, EditorState, RichUtils, Modifier } from 'draft-js'
import { getSelectedBlocksMetadata, setBlockData } from 'draftjs-utils'
import { stateToHTML } from 'draft-js-export-html'
// import { stateFromHTML } from 'draft-js-import-html'
// import { stateFromElement } from 'draft-js-import-element'

import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import SvgIcon from 'material-ui/SvgIcon'
import Button from 'material-ui/Button'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/Menu/MenuItem'

const DraftRichEditorStyleSheet = createStyleSheet('DraftRichEditor', (theme) => ({
  root: {
    border: `1px solid ${theme.palette.text.divider}`,
  },
  toolabr: {
    backgroundColor: theme.palette.text.lightDivider,
    borderBottom: `1px solid ${theme.palette.text.divider}`,
    height: 56,
  },
  divider: {
    borderRight: `1px solid ${theme.palette.text.divider}`,
    display: 'inline-flex',
    height: 32,
    marginLeft: 12,
    marginRight: 12,
  },
  editor: {
    '& .public-DraftEditorPlaceholder-root, & .public-DraftEditor-content': {
      // margin: '0 -16px -16px',
      padding: 16,
    },
  },
  hidePlaceholder: {
    '& .public-DraftEditorPlaceholder-root': {
      display: 'none',
    },
  },
}))

class DraftRichEditor extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
    theme: customPropTypes.muiRequired,
  }

  constructor(props) {
    super(props)
    this.state = { editorState: EditorState.createEmpty() }

    this.focus = () => this.refs.editor.focus()
    this.onChange = (editorState) => {

      let options = {
        blockStyleFn: (block) => {
          if (block.getData().get('text-align')) {
            return {
              style: {
                textAlign: block.getData().get('text-align')
              }
            }
          }
        }
      }

      const html = stateToHTML(editorState.getCurrentContent(), options)
      this.setState({
        editorState,
        html,
      })
    }

    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.onTab = (e) => this._onTab(e)
    this.toggleBlockType = (type) => this._toggleBlockType(type)
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style)
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  _onTab(e) {
    const maxDepth = 4
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth))
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    )
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    )
  }

  render() {
    const classes = this.context.styleManager.render(DraftRichEditorStyleSheet)
    const { editorState, html } = this.state


    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = classes.editor
    var contentState = editorState.getCurrentContent()
    // var contentState = stateFromHTML('<div></div>')
    // var contentState = stateFromElement('<div></div>')
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ` ${classes.hidePlaceholder}`
      }
    }


    return (
      <div className={classes.root}>
        <Toolbar className={classes.toolabr} gutters={false}>
          <BlockStyleMenuControls
            blockTypes={BLOCK_TYPES}
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <div className={classes.divider} style={{ marginLeft: 0 }} />
          <InlineStyleControls
            blockTypes={INLINE_STYLES}
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
          <div className={classes.divider} />
          <AlignStyleControls
            blockTypes={ALIGN_STYLES}
            editorState={editorState}
            onChange={this.onChange}
          />
          <div className={classes.divider}/>
          <BlockStyleControls
            blockTypes={LIST_BLOCK_TYPES}
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
        </Toolbar>
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            onTab={this.onTab}
            placeholder="Description"
            ref="editor"
            spellCheck={true}
          />
          <textarea value={html} />
        </div>
      </div>
    )
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
  ALIGNLEFT: {
    display: 'block',
    textAlign: 'left',
  },
  ALIGNRIGHT: {
    display: 'block',
    textAlign: 'right',
  },
  ALIGNCENTER: {
    display: 'block',
    textAlign: 'center',
  },
  ALIGNJUSTIFY: {
    display: 'block',
    textAlign: 'justify',
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'RichEditor-blockquote'
    default: return null
  }
}

class StyleButton extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    let className = 'RichEditor-styleButton'
    if (this.props.active) {
      className += ' RichEditor-activeButton'
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    )
  }
}

const BLOCK_TYPES = [
  { label: 'Paragraph', style: 'unstyled' },
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  // { label: 'Unstyled', style: 'unstyled' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'Code Block', style: 'code-block' },
]


const IconBulletedList = (props) => (
  <SvgIcon {...props}>
    <path d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
  </SvgIcon>
)

const IconNumbersList = (props) => (
  <SvgIcon {...props}>
    <path d="M7,13H21V11H7M7,19H21V17H7M7,7H21V5H7M2,11H3.8L2,13.1V14H5V13H3.2L5,10.9V10H2M3,8H4V4H2V5H3M2,17H4V17.5H3V18.5H4V19H2V20H5V16H2V17Z" />
  </SvgIcon>
)

const LIST_BLOCK_TYPES = [
  { label: 'UL', style: 'unordered-list-item', icon: IconBulletedList },
  { label: 'OL', style: 'ordered-list-item', icon: IconNumbersList },
]

const BlockStyleControls = (props) => {
  const { editorState, blockTypes } = props
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <div className="RichEditor-controls">
      {blockTypes.map((type) =>
        <ToggleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </div>
  )
}

const ToggleButtonStyleSheet = createStyleSheet('ToggleButton', (theme) => ({
  button: {
    color: theme.palette.text.icon,
  },
  active: {
    color: theme.palette.text.secondary,
  },
}))

class ToggleButton extends React.Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    const classes = this.context.styleManager.render(ToggleButtonStyleSheet)

    let className = classes.button
    if (this.props.active) {
      className += ` ${classes.active}`
    }

    const Icon = this.props.icon

    return (
      <IconButton className={className} onMouseDown={this.onToggle}>
        { this.props.icon ? <Icon /> : this.props.label}
      </IconButton>
    )
  }
}


const IconBold = (props) => (
  <SvgIcon {...props}>
    <path d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
  </SvgIcon>
)

const IconItalic = (props) => (
  <SvgIcon {...props}>
    <path d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
  </SvgIcon>
)

const IconUnderline = (props) => (
  <SvgIcon {...props}>
    <path d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z" />
  </SvgIcon>
)

const IconAlignLeft = (props) => (
  <SvgIcon {...props}>
    <path d="M3,3H21V5H3V3M3,7H15V9H3V7M3,11H21V13H3V11M3,15H15V17H3V15M3,19H21V21H3V19Z" />
  </SvgIcon>
)

const IconAlignRight = (props) => (
  <SvgIcon {...props}>
    <path d="M3,3H21V5H3V3M9,7H21V9H9V7M3,11H21V13H3V11M9,15H21V17H9V15M3,19H21V21H3V19Z" />
  </SvgIcon>
)

const IconAlignCenter = (props) => (
  <SvgIcon {...props}>
    <path d="M3,3H21V5H3V3M7,7H17V9H7V7M3,11H21V13H3V11M7,15H17V17H7V15M3,19H21V21H3V19Z" />
  </SvgIcon>
)

const IconAlignJustify = (props) => (
  <SvgIcon {...props}>
    <path d="M3,3H21V5H3V3M3,7H21V9H3V7M3,11H21V13H3V11M3,15H21V17H3V15M3,19H21V21H3V19Z" />
  </SvgIcon>
)

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: IconBold },
  { label: 'Italic', style: 'ITALIC', icon: IconItalic },
  { label: 'Underline', style: 'UNDERLINE', icon: IconUnderline },
  // { label: 'Monospace', style: 'CODE' },
]

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle()
  const { blockTypes } = props
  return (
    <div className="RichEditor-controls">
      {blockTypes.map(type =>
        <ToggleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      )}
    </div>
  )
}

class StyleMenuItem extends React.Component {
  constructor() {
    super()
    this.onToggle = (e) => {
      e.preventDefault()
      this.props.onToggle(this.props.style)
    }
  }

  render() {
    return (
      <MenuItem onMouseUp={this.props.onMouseUp} onMouseDown={this.onToggle} selected={this.props.active}>
        {this.props.label}
      </MenuItem>
    )
  }
}

const IconMenuDown = (props) => (
  <SvgIcon {...props}>
    <path d="M7,10L12,15L17,10H7Z" />
  </SvgIcon>
)

const IconMenuUp = (props) => (
  <SvgIcon {...props}>
    <path d="M7,15L12,10L17,15H7Z" />
  </SvgIcon>
)

const BlockStyleMenuControlsStyleSheet = createStyleSheet('BlockStyleMenuControls', () => ({
  button: {
    fontSize: '16px',
    fontWeight: 400,
    height: 56,
    paddingLeft: 24,
    paddingRight: 16,
    textTransform: 'none',
  },
}))

class BlockStyleMenuControls extends Component {
  static contextTypes = {
    styleManager: customPropTypes.muiRequired,
  }

  state = {
    anchorEl: undefined,
    open: false,
  }

  handleClick = (event) => this.setState({
    open: true,
    anchorEl: event.currentTarget,
  })

  handleRequestClose = () => {
    this.setState({ open: false })
  }

  render() {
    const classes = this.context.styleManager.render(BlockStyleMenuControlsStyleSheet)
    const { editorState, blockTypes } = this.props
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    const currentType = blockTypes.find((element) => {
      return element.style === blockType
    })

    return (
      <div className="RichEditor-controls">
        <Button
          className={classes.button}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {currentType ? currentType.label : 'Typography'}

          {!this.state.open ? <IconMenuDown /> : <IconMenuUp />}
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.handleRequestClose}
        >
          {blockTypes.map((type, index) =>
            <StyleMenuItem
              key={index}
              active={type.style === blockType}
              label={type.label}
              onToggle={this.props.onToggle}
              onMouseUp={this.handleRequestClose}
              style={type.style}
            />
          )}
        </Menu>
      </div>
    )
  }
}

var ALIGN_STYLES = [
  { label: 'Align Left', style: 'left', icon: IconAlignLeft },
  { label: 'Align Center', style: 'center', icon: IconAlignCenter },
  { label: 'Align Right', style: 'right', icon: IconAlignRight },
  { label: 'Justify', style: 'justify', icon: IconAlignJustify },
]

class  AlignStyleControls extends React.Component {
  state = {
    currentTextAlignment: undefined,
  }

  componentWillReceiveProps(properties) {
    if (properties.editorState !== this.props.editorState) {
      this.setState({
        currentTextAlignment: getSelectedBlocksMetadata(properties.editorState).get('text-align'),
      });
    }
  }

  addBlockAlignmentData = (value) => {
    const { editorState, onChange } = this.props;
    const { currentTextAlignment } = this.state;
    if (currentTextAlignment !== value) {
      onChange(setBlockData(editorState, { 'text-align': value }));
    } else {
      onChange(setBlockData(editorState, { 'text-align': undefined }));
    }
  }

  render() {
    const { blockTypes } = this.props
    return (
      <div className="RichEditor-controls">
        {blockTypes.map(type =>
          <ToggleButton
            key={type.label}
            active={type.style === this.state.currentTextAlignment}
            label={type.label}
            onToggle={this.addBlockAlignmentData}
            style={type.style}
            icon={type.icon}
          />
        )}
      </div>
    )
  }
}





export default DraftRichEditor
