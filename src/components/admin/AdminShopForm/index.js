import React, { PropTypes } from 'react'
import { Field } from 'redux-form'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Paper from 'material-ui/Paper'
import Toolbar from 'material-ui/Toolbar'
import Text from 'material-ui/Text'
// import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Layout from 'material-ui/Layout'
import Button from 'material-ui/Button'

import Input from 'material-ui/Input'
import InputLabel from 'material-ui/Input/InputLabel'
import FormControl from 'material-ui/Form/FormControl'
import Menu from 'material-ui/Menu/Menu'
import MenuItem from 'material-ui/Menu/MenuItem'

import { DraftRichEditor } from 'components'
import { AutocompleteSelect } from 'containers'

const toolbarStyleSheet = createStyleSheet('Toolbar', (theme) => {
  return {
    root: { paddingRight: 12 },
    spacer: { flex: '1 1 100%' },
    actions: { color: theme.palette.text.secondary },
    title: { flex: '0 0 auto' },
  }
})

const styleSheet = createStyleSheet('Layout', () => {
  return {
    root: {
      margin: 0,
      padding: 12,
    },
    fieldRow: {
      paddingTop: 16,
    },
  }
})

const renderTextField = props => {
  return (
    <TextField
      error={props.error}
      label={props.label}
      defaultValue={props.label}
      inputProps={props.input}
    />
  )
}

renderTextField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
}

const renderTextAreaField = props => {
  return (
    <TextField
      error={props.error}
      label={props.label}
      defaultValue={props.label}
      inputProps={{ ...props.input, component: 'textarea' }}
    />
  )
}

renderTextAreaField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
}

const AdminShopForm = (props, context) => {
  const toolabrClasses = context.styleManager.render(toolbarStyleSheet)
  const classes = context.styleManager.render(styleSheet)
  const {
    id,
    handleSubmit,
    submitting,
   } = props

  return (
    <div>
      <Paper elevation={2}>
        <form method="POST" onSubmit={handleSubmit}>

          <Toolbar className={toolabrClasses.root}>
            <div className={toolabrClasses.title}>
              <Text type="title">{id ? 'Update' : 'Create a '} shop</Text>
            </div>
            <div className={toolabrClasses.spacer} />
            <div className={toolabrClasses.actions}>
              {/* <IconButton>
                <IconAdd />
              </IconButton> */}
            </div>
          </Toolbar>

          <Field name="_csrf" type="hidden" component="input" />

          <Layout container gutter={24} className={classes.root}>
            <Layout item sm={8}>
              <div className={classes.fieldRow}>
                <Field name="name" label="Name" component={renderTextField} />
              </div>
              <div className={classes.fieldRow}>
                <DraftRichEditor />
              </div>
              <div className={classes.fieldRow}>
                <Field name="description" label="Description" component={renderTextAreaField} />
              </div>
              <div className={classes.fieldRow}>
                <Field name="lastUpdate" label="Last Update" component={renderTextField} />
              </div>
              <div className={classes.fieldRow}>
                <Field name="feedUrl" label="Feed URL" component={renderTextField} />
              </div>
            </Layout>
            <Layout item sm={4}>
              <div className={classes.fieldRow}>
                <Field name="slug" label="Slug" component={renderTextField} />
              </div>
              <div className={classes.fieldRow}>
                <Field name="meta[title]" label="Meta Title" component={renderTextField} />
              </div>
              <div className={classes.fieldRow}>
                <Field name="meta[description]" label="Meta Description" component={renderTextAreaField} />
              </div>
            </Layout>
            <Button primary type="submit" disabled={submitting}>{id ? 'Update' : 'Create'}</Button>
          </Layout>
        </form>
      </Paper>
    </div>
  )
}

AdminShopForm.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

AdminShopForm.propTypes = {
  id: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
}

AdminShopForm.defaultProps = {
  id: null,
}

export default AdminShopForm
