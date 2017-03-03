import React, { PropTypes } from 'react'
import Field from 'redux-form/lib/Field'
import { createStyleSheet } from 'jss-theme-reactor'
import customPropTypes from 'material-ui/utils/customPropTypes'
import Paper from 'material-ui/Paper'
// import SvgIcon from 'material-ui/SvgIcon'
import Toolbar from 'material-ui/Toolbar'
import Text from 'material-ui/Text'
// import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import Layout from 'material-ui/Layout'
import Button from 'material-ui/Button'

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

const AdminCategoryForm = ({ id, handleSubmit, submitting }, context) => {
  const toolabrClasses = context.styleManager.render(toolbarStyleSheet)
  const classes = context.styleManager.render(styleSheet)

  return (
    <div>
      {/* {loading && <CircularProgress />} */}
      <Paper elevation={2}>
        <form method="POST" onSubmit={handleSubmit}>

          <Toolbar className={toolabrClasses.root}>
            <div className={toolabrClasses.title}>
              <Text type="title">{id ? 'Update' : 'Create a '} category</Text>
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
            <Layout item sm={6}>
              <div className={classes.fieldRow}>
                <Field name="name" label="Name" component={renderTextField} />
              </div>
              <div className={classes.fieldRow}>
                {/* <Field name="description" label="Description" component={renderTextAreaField} /> */}
                <Field name="description" label="Description" component={renderTextField} />
              </div>
            </Layout>
            <Layout item sm={6} />
            <Button primary type="submit" disabled={submitting}>{id ? 'Update' : 'Create'}</Button>
          </Layout>

          {/* <Field name="description" label="Description" type="textarea" component={ReduxField} /> */}
          {/* <Button type="submit" disabled={submitting}>{id ? 'Update' : 'Create'}</Button> */}
        </form>
      </Paper>
    </div>
  )
}

AdminCategoryForm.contextTypes = {
  styleManager: customPropTypes.muiRequired,
}

AdminCategoryForm.propTypes = {
  id: PropTypes.any,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
}

AdminCategoryForm.defaultProps = {
  id: null,
}

export default AdminCategoryForm
