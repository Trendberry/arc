export const CATEGORY_LIST = 'CATEGORY_LIST'
export const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST'
export const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS'
export const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE'
export const CATEGORY_CREATE = 'CATEGORY_CREATE'
export const CATEGORY_CREATE_REQUEST = 'CATEGORY_CREATE_REQUEST'
export const CATEGORY_CREATE_SUCCESS = 'CATEGORY_CREATE_SUCCESS'
export const CATEGORY_CREATE_FAILURE = 'CATEGORY_CREATE_FAILURE'
export const CATEGORY_READ = 'CATEGORY_READ'
export const CATEGORY_READ_REQUEST = 'CATEGORY_READ_REQUEST'
export const CATEGORY_READ_SUCCESS = 'CATEGORY_READ_SUCCESS'
export const CATEGORY_READ_FAILURE = 'CATEGORY_READ_FAILURE'
export const CATEGORY_UPDATE = 'CATEGORY_UPDATE'
export const CATEGORY_UPDATE_REQUEST = 'CATEGORY_UPDATE_REQUEST'
export const CATEGORY_UPDATE_SUCCESS = 'CATEGORY_UPDATE_SUCCESS'
export const CATEGORY_UPDATE_FAILURE = 'CATEGORY_UPDATE_FAILURE'
export const CATEGORY_DELETE = 'CATEGORY_DELETE'
export const CATEGORY_DELETE_REQUEST = 'CATEGORY_DELETE_REQUEST'
export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS'
export const CATEGORY_DELETE_FAILURE = 'CATEGORY_DELETE_FAILURE'

export const categoryList = {
  request: (limit, resolve, reject) => ({ type: CATEGORY_LIST_REQUEST, limit, resolve, reject }),
  success: (list) => ({ type: CATEGORY_LIST_SUCCESS, list }),
  failure: (error) => ({ type: CATEGORY_LIST_FAILURE, error })
}

export const categoryCreate = {
  request: (data, resolve, reject) => ({ type: CATEGORY_CREATE_REQUEST, data, resolve, reject }),
  success: (data) => ({ type: CATEGORY_CREATE_SUCCESS, data }),
  failure: (error) => ({ type: CATEGORY_CREATE_FAILURE, error })
}

export const categoryRead = {
  request: (id, resolve, reject) => ({ type: CATEGORY_READ_REQUEST, id, resolve, reject }),
  success: (data) => ({ type: CATEGORY_READ_SUCCESS, data }),
  failure: (error) => ({ type: CATEGORY_READ_FAILURE, error })
}

export const categoryUpdate = {
  request: (data, newData, resolve, reject) => ({ type: CATEGORY_UPDATE_REQUEST, data, newData, resolve, reject }),
  success: (data, newData) => ({ type: CATEGORY_UPDATE_SUCCESS, data, newData }),
  failure: (error) => ({ type: CATEGORY_UPDATE_FAILURE, error })
}

export const categoryDelete = {
  request: (id, resolve, reject) => ({ type: CATEGORY_DELETE_REQUEST, id, resolve, reject }),
  success: (data) => ({ type: CATEGORY_DELETE_SUCCESS, data }),
  failure: (error) => ({ type: CATEGORY_DELETE_FAILURE, error })
}
