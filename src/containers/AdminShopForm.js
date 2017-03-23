import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { fromForm, fromEntities } from 'store/selectors'
import { shopCreateRequest, shopDetailReadRequest, shopUpdateRequest } from 'store/actions'
import { createValidator, required } from 'services/validation'

import { AdminShopForm } from 'components'

// const AdminShopFormContainer = props => <AdminShopForm {...props} />

class AdminShopFormContainer extends Component {
  static propTypes = {
    id: PropTypes.any,
  }

  static defaultProps = {
    id: null,
  }

  state = {
    anchorEl: undefined,
    open: false,
    selectedIndex: 0,
  }

  render() {
    return (
      <AdminShopForm
        {...this.props}
      />
    )
  }
}

const onSubmit = (data, dispatch, state) => new Promise((resolve, reject) => {
  if (data._id) {
    dispatch(shopUpdateRequest(data._id, data, resolve, reject))
  } else {
    dispatch(shopCreateRequest(data, resolve, reject))
  }
})

const validate = createValidator({
  name: [required],
  // description: [required],
})

const mapStateToProps = (state, { id }) => {
  if (id) {
    return ({
      initialValues: {
        ...fromEntities.getDetail(state, 'shop', id),
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

export const config = {
  form: 'AdminShopForm',
  fields: ['name', 'description'],
  enableReinitialize: true,
  destroyOnUnmount: true,
  onSubmit,
  validate,
}

export default connect(mapStateToProps)(reduxForm(config)(AdminShopFormContainer))
