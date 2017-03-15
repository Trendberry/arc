export const initialState = {
  list: [],
  count: 0,
}

export const getList = (state = initialState) => state.list || []
export const getCount = (state = initialState) => state.count || 0
