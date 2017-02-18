import findIndex from 'lodash/findIndex'
import { initialState } from './selectors'
import {
  CATEGORY_LIST_SUCCESS,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_READ_SUCCESS,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_DELETE_SUCCESS
} from './actions'

const findReducer = (state, action) => {
  const isObject = typeof action.data === 'object'
  const index = isObject ? findIndex(state.list, action.data) : state.list.indexOf(action.data)

  if (index < 0) {
    return state
  }

  switch (action.type) {
    case CATEGORY_UPDATE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          typeof action.data === 'object'
          ? { ...state.list[index], ...action.newData }
          : action.newData,
          ...state.list.slice(index + 1)
        ]
      }
    case CATEGORY_DELETE_SUCCESS:
      return {
        ...state,
        list: [...state.list.slice(0, index), ...state.list.slice(index + 1)]
      }
    // istanbul ignore next
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        list: action.list
      }
    case CATEGORY_CREATE_SUCCESS:
      return {
        ...state,
        list: [action.data, ...state.list]
      }
    case CATEGORY_READ_SUCCESS:
      return {
        ...state,
        data: action.data
      }
    case CATEGORY_UPDATE_SUCCESS:
    case CATEGORY_DELETE_SUCCESS:
      return findReducer(state, action)
    default:
      return state
  }
}
