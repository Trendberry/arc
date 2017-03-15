export const initialState = {
  list: [],
  detail: null,
  count: 0,
}

export const getList = (state = initialState) => state.list || initialState.list
export const getDetail = (state = initialState) => state.detail || initialState.detail
export const getCount = (state = initialState) => state.count || 0
