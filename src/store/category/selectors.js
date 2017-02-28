export const initialState = {
  list: [],
  count: null
}

export const getList = (state = initialState) => state.list || []
export const getCount = (state = initialState) => state.count || null
