import { take, put, call, fork } from 'redux-saga/effects'
import api from 'services/api'
import * as actions from './actions'
import saga, * as sagas from './sagas'

describe('createShop', () => {
  const data = { title: 'test' }

  it('calls success', () => {
    const generator = sagas.createShop(data)
    expect(generator.next().value).toEqual(call(api.post, '/shops', data))
    expect(generator.next(data).value).toEqual(put(actions.shopCreateSuccess(data)))
  })

  it('calls failure', () => {
    const generator = sagas.createShop(data)
    expect(generator.next().value).toEqual(call(api.post, '/shops', data))
    expect(generator.throw('test').value).toEqual(put(actions.shopCreateFailure('test')))
  })
})

describe('readShopList', () => {
  it('calls success', () => {
    const data = [1, 2, 3]
    const generator = sagas.readShopList({ _limit: 1 })
    expect(generator.next().value).toEqual(call(api.get, '/shops', { params: { _limit: 1 } }))
    expect(generator.next(data).value).toEqual(put(actions.shopListReadSuccess(data)))
  })

  it('calls failure', () => {
    const generator = sagas.readShopList({ _limit: 1 })
    expect(generator.next().value).toEqual(call(api.get, '/shops', { params: { _limit: 1 } }))
    expect(generator.throw('test').value).toEqual(put(actions.shopListReadFailure('test')))
  })
})

describe('readShopDetail', () => {
  it('calls success', () => {
    const data = { id: 1 }
    const generator = sagas.readShopDetail(1)
    expect(generator.next().value).toEqual(call(api.get, '/shops/1'))
    expect(generator.next(data).value).toEqual(put(actions.shopDetailReadSuccess(1, data)))
  })

  it('calls failure', () => {
    const generator = sagas.readShopDetail(1)
    expect(generator.next().value).toEqual(call(api.get, '/shops/1'))
    expect(generator.throw('test').value).toEqual(put(actions.shopDetailReadFailure(1, 'test')))
  })
})

describe('updateShop', () => {
  it('calls success', () => {
    const data = { id: 1 }
    const generator = sagas.updateShop(1, { title: 'foo' })
    expect(generator.next().value).toEqual(call(api.put, '/shops/1', { title: 'foo' }))
    expect(generator.next(data).value).toEqual(put(actions.shopUpdateSuccess(1, data)))
  })

  it('calls failure', () => {
    const generator = sagas.updateShop(1, { title: 'foo' })
    expect(generator.next().value).toEqual(call(api.put, '/shops/1', { title: 'foo' }))
    expect(generator.throw('test').value).toEqual(put(actions.shopUpdateFailure(1, 'test')))
  })
})

describe('deleteShop', () => {
  it('calls success', () => {
    const generator = sagas.deleteShop(1)
    expect(generator.next().value).toEqual(call(api.delete, '/shops/1'))
    expect(generator.next().value).toEqual(put(actions.shopDeleteSuccess(1)))
  })

  it('calls failure', () => {
    const generator = sagas.deleteShop(1)
    expect(generator.next().value).toEqual(call(api.delete, '/shops/1'))
    expect(generator.throw('test').value).toEqual(put(actions.shopDeleteFailure(1, 'test')))
  })
})

test('watchShopCreateRequest', () => {
  const payload = { data: 1 }
  const generator = sagas.watchShopCreateRequest()
  expect(generator.next().value).toEqual(take(actions.SHOP_CREATE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.createShop, ...Object.values(payload)))
})

test('watchShopListReadRequest', () => {
  const payload = { params: { _limit: 1 } }
  const generator = sagas.watchShopListReadRequest()
  expect(generator.next().value).toEqual(take(actions.SHOP_LIST_READ_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.readShopList, ...Object.values(payload)))
})

test('watchShopDetailReadRequest', () => {
  const payload = { needle: 1 }
  const generator = sagas.watchShopDetailReadRequest()
  expect(generator.next().value).toEqual(take(actions.SHOP_DETAIL_READ_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.readShopDetail, ...Object.values(payload)))
})

test('watchShopUpdateRequest', () => {
  const payload = { needle: 1, data: { id: 1 } }
  const generator = sagas.watchShopUpdateRequest()
  expect(generator.next().value).toEqual(take(actions.SHOP_UPDATE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.updateShop, ...Object.values(payload)))
})

test('watchShopDeleteRequest', () => {
  const payload = { needle: 1 }
  const generator = sagas.watchShopDeleteRequest()
  expect(generator.next().value).toEqual(take(actions.SHOP_DELETE_REQUEST))
  expect(generator.next(payload).value).toEqual(call(sagas.deleteShop, ...Object.values(payload)))
})

test('saga', () => {
  const generator = saga()
  expect(generator.next().value).toEqual(fork(sagas.watchShopCreateRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchShopListReadRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchShopDetailReadRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchShopUpdateRequest))
  expect(generator.next().value).toEqual(fork(sagas.watchShopDeleteRequest))
})
