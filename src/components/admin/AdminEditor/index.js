import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Editor, EditorState, RichUtils, convertFromHTML, ContentState } from 'draft-js'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'

// import { stateFromHTML } from 'draft-js-import-html'


// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote': return 'AdminEditor-blockquote';
    default: return null;
  }
}

class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {

    const { classes } = this.props

    let className = classes.styleButton;
    if (this.props.active) {
      className += ` ${classes.activeButton}`;
    }

    return (
      <span className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </span>
    );
  }
}

const BLOCK_TYPES = [
  {label: 'H1', style: 'header-one'},
  {label: 'H2', style: 'header-two'},
  {label: 'H3', style: 'header-three'},
  {label: 'H4', style: 'header-four'},
  {label: 'H5', style: 'header-five'},
  {label: 'H6', style: 'header-six'},
  {label: 'Blockquote', style: 'blockquote'},
  {label: 'UL', style: 'unordered-list-item'},
  {label: 'OL', style: 'ordered-list-item'},
  {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
  const {editorState, classes} = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={classes.controls}>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          classes={classes}
        />
      )}
    </div>
  );
};

var INLINE_STYLES = [
  {label: 'Bold', style: 'BOLD'},
  {label: 'Italic', style: 'ITALIC'},
  {label: 'Underline', style: 'UNDERLINE'},
  {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  const { classes } = props
  return (
    <div className={classes.controls}>
      {INLINE_STYLES.map(type =>
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          classes={classes}
        />
      )}
    </div>
  );
};

const styleSheet = createStyleSheet('AdminEditor', (theme) => {
  return {
    root: {
      background: '#fff',
      border: '1px solid #ddd',
      fontFamily: '\'Georgia\', serif',
      fontSize: '14px',
      padding: '15px',
    },

    editor: {
      borderTop: '1px solid #ddd',
      cursor: 'text',
      fontSize: '16px',
      marginTop: '10px',
    },

    // 'editor .public-DraftEditorPlaceholder-root',
    'editor .public-DraftEditor-content': {
      margin: '0 -15px -15px',
      padding: '15px',
    },

    'editor .public-DraftEditor-content': {
      minHeight: '100px',
    },

    hidePlaceholder: {
    },

    'hidePlaceholder .public-DraftEditorPlaceholder-root': {
      display: 'none',
    },

    'editor blockquote': {
      borderLeft: '5px solid #eee',
      color: '#666',
      fontFamily: '\'Hoefler Text\', \'Georgia\', serif',
      fontStyle: 'italic',
      margin: '16px 0',
      padding: '10px 20px',
    },

    'editor .public-DraftStyleDefault-pre': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '\'Inconsolata\', \'Menlo\', \'Consolas\', monospace',
      fontSize: '16px',
      padding: '20px',
    },

    controls: {
      fontFamily: '\'Helvetica\', sans-serif',
      fontSize: '14px',
      marginBottom: '5px',
      userSelect: 'none',
    },

    styleButton: {
      color: '#999',
      cursor: 'pointer',
      marginRight: '16px',
      padding: '2px 0',
    },

    activeButton: {
      color: '#5890ff',
    },
  }
})

class AdminEditor extends React.Component {
  constructor(props) {
    super(props);

    const blocksFromHTML = convertFromHTML(props.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    )

    this.state = {
      editorState: !props.content ? EditorState.createEmpty() : EditorState.createWithContent(state)
    }

    this.focus = () => this.refs.editor.focus();
    this.onChange = (editorState) => this.setState({editorState});

    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
  }

  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }

  _toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  render() {
    const { editorState } = this.state;
    const classes = this.context.styleManager.render(styleSheet);

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = classes.editor;
    var contentState = editorState.getCurrentContent();
    if (!contentState.hasText()) {
      if (contentState.getBlockMap().first().getType() !== 'unstyled') {
        className += ` ${classes.hidePlaceholder}`;
      }
    }

    return (
      <div className={classes.root}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockType}
          classes={classes}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
          classes={classes}
        />
        <div className={className} onClick={this.focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder="Tell a story..."
            ref="editor"
            spellCheck={true}
          />
        </div>
      </div>
    );
  }
}

AdminEditor.contextTypes = {
  theme: customPropTypes.muiRequired,
  styleManager: customPropTypes.muiRequired,
}

export default AdminEditor
