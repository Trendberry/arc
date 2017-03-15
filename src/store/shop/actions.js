export const SHOP_CREATE = 'SHOP_CREATE'
export const SHOP_CREATE_REQUEST = 'SHOP_CREATE_REQUEST'
export const SHOP_CREATE_SUCCESS = 'SHOP_CREATE_SUCCESS'
export const SHOP_CREATE_FAILURE = 'SHOP_CREATE_FAILURE'

export const shopCreateRequest = (data, resolve, reject) => ({
  type: SHOP_CREATE_REQUEST,
  data,
  resolve,
  reject,
})

export const shopCreateSuccess = detail => ({
  type: SHOP_CREATE_SUCCESS,
  detail,
})

export const shopCreateFailure = error => ({
  type: SHOP_CREATE_FAILURE,
  error,
})

export const SHOP_LIST_READ = 'SHOP_LIST_READ'
export const SHOP_LIST_READ_REQUEST = 'SHOP_LIST_READ_REQUEST'
export const SHOP_LIST_READ_SUCCESS = 'SHOP_LIST_READ_SUCCESS'
export const SHOP_LIST_READ_FAILURE = 'SHOP_LIST_READ_FAILURE'

export const shopListReadRequest = (params, resolve, reject) => ({
  type: SHOP_LIST_READ_REQUEST,
  params,
  resolve,
  reject,
})

export const shopListReadSuccess = (list, count) => ({
  type: SHOP_LIST_READ_SUCCESS,
  list,
  count,
})

export const shopListReadFailure = error => ({
  type: SHOP_LIST_READ_FAILURE,
  error,
})

export const SHOP_DETAIL_READ = 'SHOP_DETAIL_READ'
export const SHOP_DETAIL_READ_REQUEST = 'SHOP_DETAIL_READ_REQUEST'
export const SHOP_DETAIL_READ_SUCCESS = 'SHOP_DETAIL_READ_SUCCESS'
export const SHOP_DETAIL_READ_FAILURE = 'SHOP_DETAIL_READ_FAILURE'

export const shopDetailReadRequest = (needle, resolve, reject) => ({
  type: SHOP_DETAIL_READ_REQUEST,
  needle,
  resolve,
  reject,
})

export const shopDetailReadSuccess = (needle, detail) => ({
  type: SHOP_DETAIL_READ_SUCCESS,
  needle,
  detail,
})

export const shopDetailReadFailure = (needle, error) => ({
  type: SHOP_DETAIL_READ_FAILURE,
  needle,
  error,
})

export const SHOP_UPDATE = 'SHOP_UPDATE'
export const SHOP_UPDATE_REQUEST = 'SHOP_UPDATE_REQUEST'
export const SHOP_UPDATE_SUCCESS = 'SHOP_UPDATE_SUCCESS'
export const SHOP_UPDATE_FAILURE = 'SHOP_UPDATE_FAILURE'

export const shopUpdateRequest = (needle, data, resolve, reject) => ({
  type: SHOP_UPDATE_REQUEST,
  needle,
  data,
  resolve,
  reject,
})

export const shopUpdateSuccess = (needle, detail) => ({
  type: SHOP_UPDATE_SUCCESS,
  needle,
  detail,
})

export const shopUpdateFailure = (needle, error) => ({
  type: SHOP_UPDATE_FAILURE,
  needle,
  error,
})

export const SHOP_DELETE = 'SHOP_DELETE'
export const SHOP_DELETE_REQUEST = 'SHOP_DELETE_REQUEST'
export const SHOP_DELETE_SUCCESS = 'SHOP_DELETE_SUCCESS'
export const SHOP_DELETE_FAILURE = 'SHOP_DELETE_FAILURE'

export const shopDeleteRequest = (needle, resolve, reject) => ({
  type: SHOP_DELETE_REQUEST,
  needle,
  resolve,
  reject,
})

export const shopDeleteSuccess = needle => ({
  type: SHOP_DELETE_SUCCESS,
  needle,
})

export const shopDeleteFailure = (needle, error) => ({
  type: SHOP_DELETE_FAILURE,
  needle,
  error,
})
