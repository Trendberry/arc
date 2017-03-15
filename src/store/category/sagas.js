import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import {
  categoryList, categoryCreate, categoryRead, categoryUpdate,
  CATEGORY_LIST_REQUEST, CATEGORY_CREATE_REQUEST, CATEGORY_READ_REQUEST, CATEGORY_UPDATE_REQUEST,
} from './actions'

export function* createCategory(newData) {
  try {
    const { data } = yield call(api.post, '/categories', newData)
    yield put(categoryCreate.success(data))
  } catch (e) {
    yield put(categoryCreate.failure(e))
  }
}

export function* readCategory(id) {
  try {
    const { data } = yield call(api.get, `/categories/${id}`)
    yield put(categoryRead.success(data))
  } catch (e) {
    yield put(categoryRead.failure(e))
  }
}

export function* updateCategory(oldData, newData) {
  try {
    const { data } = yield call(api.put, `/categories/${oldData._id}`, newData)
    yield put(categoryUpdate.success(data, newData))
  } catch (e) {
    yield put(categoryUpdate.failure(e))
  }
}

export function* listCategories(params) {
  try {
    const { data, headers } = yield call(api.get, '/categories', { params })
    yield put(categoryList.success(data, parseInt(headers.get('x-total-count'), 10)))
  } catch (e) {
    yield put(categoryList.failure(e))
  }
}

export function* watchCategoryCreateRequest() {
  while (true) {
    const { data } = yield take(CATEGORY_CREATE_REQUEST)
    yield call(createCategory, data)
  }
}

export function* watchCategoryReadRequest() {
  while (true) {
    const { id } = yield take(CATEGORY_READ_REQUEST)
    yield call(readCategory, id)
  }
}

export function* watchCategoryUpdateRequest() {
  while (true) {
    const { data, newData } = yield take(CATEGORY_UPDATE_REQUEST)
    yield call(updateCategory, data, newData)
  }
}

export function* watchCategoryListRequest() {
  while (true) {
    const { params } = yield take(CATEGORY_LIST_REQUEST)
    yield call(listCategories, params)
  }
}

export default function* () {
  yield fork(watchCategoryCreateRequest)
  yield fork(watchCategoryReadRequest)
  yield fork(watchCategoryUpdateRequest)
  yield fork(watchCategoryListRequest)
}
