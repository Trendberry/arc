export const SHOP_LIST = 'SHOP_LIST'
export const SHOP_LIST_REQUEST = 'SHOP_LIST_REQUEST'
export const SHOP_LIST_SUCCESS = 'SHOP_LIST_SUCCESS'
export const SHOP_LIST_FAILURE = 'SHOP_LIST_FAILURE'
export const SHOP_CREATE = 'SHOP_CREATE'
export const SHOP_CREATE_REQUEST = 'SHOP_CREATE_REQUEST'
export const SHOP_CREATE_SUCCESS = 'SHOP_CREATE_SUCCESS'
export const SHOP_CREATE_FAILURE = 'SHOP_CREATE_FAILURE'
export const SHOP_READ = 'SHOP_READ'
export const SHOP_READ_REQUEST = 'SHOP_READ_REQUEST'
export const SHOP_READ_SUCCESS = 'SHOP_READ_SUCCESS'
export const SHOP_READ_FAILURE = 'SHOP_READ_FAILURE'
export const SHOP_UPDATE = 'SHOP_UPDATE'
export const SHOP_UPDATE_REQUEST = 'SHOP_UPDATE_REQUEST'
export const SHOP_UPDATE_SUCCESS = 'SHOP_UPDATE_SUCCESS'
export const SHOP_UPDATE_FAILURE = 'SHOP_UPDATE_FAILURE'
export const SHOP_DELETE = 'SHOP_DELETE'
export const SHOP_DELETE_REQUEST = 'SHOP_DELETE_REQUEST'
export const SHOP_DELETE_SUCCESS = 'SHOP_DELETE_SUCCESS'
export const SHOP_DELETE_FAILURE = 'SHOP_DELETE_FAILURE'

export const shopList = {
  request: (params, resolve, reject) => ({ type: SHOP_LIST_REQUEST, params, resolve, reject }),
  success: (list, count) => ({ type: SHOP_LIST_SUCCESS, list, count }),
  failure: (error) => ({ type: SHOP_LIST_FAILURE, error }),
}

export const shopCreate = {
  request: (data, resolve, reject) => ({ type: SHOP_CREATE_REQUEST, data, resolve, reject }),
  success: (data) => ({ type: SHOP_CREATE_SUCCESS, data }),
  failure: (error) => ({ type: SHOP_CREATE_FAILURE, error }),
}

export const shopRead = {
  request: (id, resolve, reject) => ({ type: SHOP_READ_REQUEST, id, resolve, reject }),
  success: (data) => ({ type: SHOP_READ_SUCCESS, data }),
  failure: (error) => ({ type: SHOP_READ_FAILURE, error }),
}

export const shopUpdate = {
  request: (data, newData, resolve, reject) => ({ type: SHOP_UPDATE_REQUEST, data, newData, resolve, reject }),
  success: (data, newData) => ({ type: SHOP_UPDATE_SUCCESS, data, newData }),
  failure: (error) => ({ type: SHOP_UPDATE_FAILURE, error }),
}

export const shopDelete = {
  request: (id, resolve, reject) => ({ type: SHOP_DELETE_REQUEST, id, resolve, reject }),
  success: (data) => ({ type: SHOP_DELETE_SUCCESS, data }),
  failure: (error) => ({ type: SHOP_DELETE_FAILURE, error }),
}
