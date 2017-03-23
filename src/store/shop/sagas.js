import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'

export function* createShop(newData) {
  try {
    const data = yield call(api.post, '/shops', newData)
    yield put(actions.shopCreateSuccess(data))
  } catch (e) {
    yield put(actions.shopCreateFailure(e))
  }
}

export function* readShopList(params) {
  try {
    const { data, headers } = yield call(api.get, '/shops', { params })
    yield put(actions.shopListReadSuccess(data, parseInt(headers.get('x-total-count'), 10)))
  } catch (e) {
    yield put(actions.shopListReadFailure(e))
  }
}

export function* readShopDetail(needle) {
  try {
    const { data } = yield call(api.get, `/shops/${needle}`)
    yield put(actions.shopDetailReadSuccess(needle, data))
  } catch (e) {
    yield put(actions.shopDetailReadFailure(needle, e))
  }
}

export function* updateShop(needle, newData) {
  try {
    const data = yield call(api.put, `/shops/${needle}`, newData)
    yield put(actions.shopUpdateSuccess(needle, data))
  } catch (e) {
    yield put(actions.shopUpdateFailure(needle, e))
  }
}

export function* deleteShop(needle) {
  try {
    yield call(api.delete, `/shops/${needle}`)
    yield put(actions.shopDeleteSuccess(needle))
  } catch (e) {
    yield put(actions.shopDeleteFailure(needle, e))
  }
}

export function* watchShopCreateRequest() {
  while (true) {
    const { data } = yield take(actions.SHOP_CREATE_REQUEST)
    yield call(createShop, data)
  }
}

export function* watchShopListReadRequest() {
  while (true) {
    const { params } = yield take(actions.SHOP_LIST_READ_REQUEST)
    yield call(readShopList, params)
  }
}

export function* watchShopDetailReadRequest() {
  while (true) {
    const { needle } = yield take(actions.SHOP_DETAIL_READ_REQUEST)
    yield call(readShopDetail, needle)
  }
}

export function* watchShopUpdateRequest() {
  while (true) {
    const { needle, data } = yield take(actions.SHOP_UPDATE_REQUEST)
    yield call(updateShop, needle, data)
  }
}

export function* watchShopDeleteRequest() {
  while (true) {
    const { needle } = yield take(actions.SHOP_DELETE_REQUEST)
    yield call(deleteShop, needle)
  }
}

export default function* () {
  yield fork(watchShopCreateRequest)
  yield fork(watchShopListReadRequest)
  yield fork(watchShopDetailReadRequest)
  yield fork(watchShopUpdateRequest)
  yield fork(watchShopDeleteRequest)
}
