import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import {
  categoryList, categoryCreate, categoryRead, categoryUpdate,
  CATEGORY_LIST_REQUEST, CATEGORY_CREATE_REQUEST, CATEGORY_READ_REQUEST, CATEGORY_UPDATE_REQUEST
} from './actions'

export function* createPost(newData) {
  try {
    const { data } = yield call(api.post, '/categories', newData)
    yield put(categoryCreate.success(data))
  } catch (e) {
    yield put(categoryCreate.failure(e))
  }
}

export function* readPost(id) {
  try {
    const { data } = yield call(api.get, `/categories/${id}`)
    yield put(categoryRead.success(data))
  } catch (e) {
    yield put(categoryRead.failure(e))
  }
}

export function* updatePost(oldData, newData) {
  try {
    const { data } = yield call(api.put, `/categories/${oldData._id}`, newData)
    yield put(categoryUpdate.success(data, newData))
  } catch (e) {
    yield put(categoryUpdate.failure(e))
  }
}

export function* listCategories(limit) {
  try {
    const params = { _limit: limit, _sort: '_id', _order: 'DESC' }
    const { data } = yield call(api.get, '/categories', { params })
    yield put(categoryList.success(data))
  } catch (e) {
    yield put(categoryList.failure(e))
  }
}

export function* watchCategoryCreateRequest() {
  while (true) {
    const { data } = yield take(CATEGORY_CREATE_REQUEST)
    yield call(createPost, data)
  }
}

export function* watchCategoryReadRequest() {
  while (true) {
    const { id } = yield take(CATEGORY_READ_REQUEST)
    yield call(readPost, id)
  }
}

export function* watchCategoryUpdateRequest() {
  while (true) {
    const { data, newData } = yield take(CATEGORY_UPDATE_REQUEST)
    yield call(updatePost, data, newData)
  }
}

export function* watchCategoryListRequest() {
  while (true) {
    const { limit } = yield take(CATEGORY_LIST_REQUEST)
    yield call(listCategories, limit)
  }
}

export default function* () {
  yield fork(watchCategoryCreateRequest)
  yield fork(watchCategoryReadRequest)
  yield fork(watchCategoryUpdateRequest)
  yield fork(watchCategoryListRequest)
}
