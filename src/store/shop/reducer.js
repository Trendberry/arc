import findIndex from 'lodash/findIndex'
import { initialState } from './selectors'
import {
  SHOP_CREATE_SUCCESS,
  SHOP_LIST_READ_REQUEST,
  SHOP_LIST_READ_SUCCESS,
  SHOP_DETAIL_READ_REQUEST,
  SHOP_DETAIL_READ_SUCCESS,
  SHOP_UPDATE_SUCCESS,
  SHOP_DELETE_SUCCESS,
} from './actions'


const updateOrDeleteReducer = (state, action) => {
  const needleIsObject = typeof action.needle === 'object'
  const index = needleIsObject
    ? findIndex(state.list, action.needle)
    : state.list.indexOf(action.needle)

  if (index < 0) {
    return state
  }

  switch (action.type) {
    case SHOP_UPDATE_SUCCESS:
      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          typeof action.needle === 'object'
            ? { ...state.list[index], ...action.detail }
            : action.detail,
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
    case SHOP_CREATE_SUCCESS:
      return {
        ...state,
        list: [action.detail, ...state.list],
        count: state.count + 1,
      }

    case SHOP_LIST_READ_SUCCESS:
      return {
        ...state,
        list: action.list,
        count: action.count,
      }

    case SHOP_DETAIL_READ_SUCCESS:
      return {
        ...state,
        detail: action.detail,
      }

    case SHOP_UPDATE_SUCCESS:
    case SHOP_DELETE_SUCCESS:
      return updateOrDeleteReducer(state, action)

    default:
      return state
  }
}
