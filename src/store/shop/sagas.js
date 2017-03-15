import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import {
  shopList, shopCreate, shopRead, shopUpdate,
  SHOP_LIST_REQUEST, SHOP_CREATE_REQUEST, SHOP_READ_REQUEST, SHOP_UPDATE_REQUEST,
} from './actions'

export function* createShop(newData) {
  try {
    const { data } = yield call(api.post, '/shops', newData)
    yield put(shopCreate.success(data))
  } catch (e) {
    yield put(shopCreate.failure(e))
  }
}

export function* readShop(id) {
  try {
    const { data } = yield call(api.get, `/shops/${id}`)
    yield put(shopRead.success(data))
  } catch (e) {
    yield put(shopRead.failure(e))
  }
}

export function* updateShop(oldData, newData) {
  try {
    const { data } = yield call(api.put, `/shops/${oldData._id}`, newData)
    yield put(shopUpdate.success(data, newData))
  } catch (e) {
    yield put(shopUpdate.failure(e))
  }
}

export function* listShops(params) {
  try {
    const { data, headers } = yield call(api.get, '/shops', { params })
    yield put(shopList.success(data, parseInt(headers.get('x-total-count'), 10)))
  } catch (e) {
    yield put(shopList.failure(e))
  }
}

export function* watchShopCreateRequest() {
  while (true) {
    const { data } = yield take(SHOP_CREATE_REQUEST)
    yield call(createShop, data)
  }
}

export function* watchShopReadRequest() {
  while (true) {
    const { id } = yield take(SHOP_READ_REQUEST)
    yield call(readShop, id)
  }
}

export function* watchShopUpdateRequest() {
  while (true) {
    const { data, newData } = yield take(SHOP_UPDATE_REQUEST)
    yield call(updateShop, data, newData)
  }
}

export function* watchShopListRequest() {
  while (true) {
    const { params } = yield take(SHOP_LIST_REQUEST)
    yield call(listShops, params)
  }
}

export default function* () {
  yield fork(watchShopCreateRequest)
  yield fork(watchShopReadRequest)
  yield fork(watchShopUpdateRequest)
  yield fork(watchShopListRequest)
}
