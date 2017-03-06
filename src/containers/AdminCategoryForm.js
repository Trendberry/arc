import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { fromForm, fromEntities } from 'store/selectors'
import { categoryCreate, categoryRead, categoryUpdate } from 'store/actions'
import { createValidator, required } from 'services/validation'

import { AdminCategoryForm } from 'components'

// const AdminCategoryFormContainer = props => <AdminCategoryForm {...props} />

class AdminCategoryFormContainer extends Component {
  static propTypes = {
    id: PropTypes.any,
    request: PropTypes.func.isRequired,
  }

  static defaultProps = {
    id: null,
  }

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 0,
  }

  componentWillMount() {
    if (this.props.id) {
      this.props.request()
    }
  }

  render() {
    return (
      <AdminCategoryForm
        {...this.props}
      />
    )
  }
}

const onSubmit = (data, dispatch, state) => new Promise((resolve, reject) => {
  if (data._id) {
    return dispatch(categoryUpdate.request(state.initialValues, data, resolve, reject))
  }
  return dispatch(categoryCreate.request(data, resolve, reject))
})

const validate = createValidator({
  name: [required],
  // description: [required],
})

const mapStateToProps = (state, { id }) => {
  if (id) {
    return ({
      initialValues: {
        ...fromEntities.getDetail(state, 'category', id),
        _csrf: fromForm.getCsrfToken(state),
      },
    })
  }
  return ({
    initialValues: {
      _csrf: fromForm.getCsrfToken(state),
    },
  })
}

const mapDispatchToProps = (dispatch, { id }) => ({
  request: () => dispatch(categoryRead.request(id)),
})

export const config = {
  form: 'AdminCategoryForm',
  fields: ['name', 'description'],
  // enableReinitialize: true,
  destroyOnUnmount: true,
  onSubmit,
  validate,
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm(config)(AdminCategoryFormContainer))
