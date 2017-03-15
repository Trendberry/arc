import * as actions from './actions'

test('shopCreateRequest', () => {
  expect(actions.shopCreateRequest({ title: 'test' })).toEqual({
    type: actions.SHOP_CREATE_REQUEST,
    data: { title: 'test' },
  })
})

test('shopCreateSuccess', () => {
  expect(actions.shopCreateSuccess({ id: 1, title: 'test' })).toEqual({
    type: actions.SHOP_CREATE_SUCCESS,
    detail: { id: 1, title: 'test' },
  })
})

test('shopCreateFailure', () => {
  expect(actions.shopCreateFailure('error')).toEqual({
    type: actions.SHOP_CREATE_FAILURE,
    error: 'error',
  })
})

test('shopListReadRequest', () => {
  expect(actions.shopListReadRequest({ fields: 'test' })).toEqual({
    type: actions.SHOP_LIST_READ_REQUEST,
    params: { fields: 'test' },
  })
})

test('shopListReadSuccess', () => {
  expect(actions.shopListReadSuccess([1, 2, 3])).toEqual({
    type: actions.SHOP_LIST_READ_SUCCESS,
    list: [1, 2, 3],
  })
})

test('shopListReadFailure', () => {
  expect(actions.shopListReadFailure('error')).toEqual({
    type: actions.SHOP_LIST_READ_FAILURE,
    error: 'error',
  })
})

test('shopDetailReadRequest', () => {
  expect(actions.shopDetailReadRequest(1)).toEqual({
    type: actions.SHOP_DETAIL_READ_REQUEST,
    needle: 1,
  })
})

test('shopDetailReadSuccess', () => {
  expect(actions.shopDetailReadSuccess(1, { id: 1, title: 'test' })).toEqual({
    type: actions.SHOP_DETAIL_READ_SUCCESS,
    needle: 1,
    detail: { id: 1, title: 'test' },
  })
})

test('shopDetailReadFailure', () => {
  expect(actions.shopDetailReadFailure(1, 'error')).toEqual({
    type: actions.SHOP_DETAIL_READ_FAILURE,
    needle: 1,
    error: 'error',
  })
})

test('shopUpdateRequest', () => {
  expect(actions.shopUpdateRequest(1, { title: 'test' })).toEqual({
    type: actions.SHOP_UPDATE_REQUEST,
    needle: 1,
    data: { title: 'test' },
  })
})

test('shopUpdateSuccess', () => {
  expect(actions.shopUpdateSuccess(1, { id: 1, title: 'test' })).toEqual({
    type: actions.SHOP_UPDATE_SUCCESS,
    needle: 1,
    detail: { id: 1, title: 'test' },
  })
})

test('shopUpdateFailure', () => {
  expect(actions.shopUpdateFailure(1, 'error')).toEqual({
    type: actions.SHOP_UPDATE_FAILURE,
    needle: 1,
    error: 'error',
  })
})

test('shopDeleteRequest', () => {
  expect(actions.shopDeleteRequest(1)).toEqual({
    type: actions.SHOP_DELETE_REQUEST,
    needle: 1,
  })
})

test('shopDeleteSuccess', () => {
  expect(actions.shopDeleteSuccess(1)).toEqual({
    type: actions.SHOP_DELETE_SUCCESS,
    needle: 1,
  })
})

test('shopDeleteFailure', () => {
  expect(actions.shopDeleteFailure(1, 'error')).toEqual({
    type: actions.SHOP_DELETE_FAILURE,
    needle: 1,
    error: 'error',
  })
})
