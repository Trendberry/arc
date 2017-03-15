import findIndex from 'lodash/findIndex'
import { initialState } from './selectors'
import {
  SHOP_LIST_SUCCESS,
  SHOP_CREATE_SUCCESS,
  SHOP_READ_SUCCESS,
  SHOP_UPDATE_SUCCESS,
  SHOP_DELETE_SUCCESS,
} from './actions'

const findReducer = (state, action) => {
  const isObject = typeof action.data === 'object'
  const index = isObject ? findIndex(state.list, action.data) : state.list.indexOf(action.data)

  if (index < 0) {
    return state
  }

  switch (action.type) {
    case SHOP_UPDATE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          typeof action.data === 'object'
          ? { ...state.list[index], ...action.newData }
          : action.newData,
          ...state.list.slice(index + 1),
        ],
      }
    case SHOP_DELETE_SUCCESS:
      return {
        ...state,
        list: [...state.list.slice(0, index), ...state.list.slice(index + 1)],
        count: state.count - 1,
      }
    // istanbul ignore next
    default:
      return state
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOP_LIST_SUCCESS:
      return {
        ...state,
        list: action.list,
        count: action.count,
      }
    case SHOP_CREATE_SUCCESS:
      return {
        ...state,
        list: [action.data, ...state.list],
        count: state.count + 1,
      }
    case SHOP_READ_SUCCESS:
      return {
        ...state,
        data: action.data,
      }
    case SHOP_UPDATE_SUCCESS:
    case SHOP_DELETE_SUCCESS:
      return findReducer(state, action)
    default:
      return state
  }
}
