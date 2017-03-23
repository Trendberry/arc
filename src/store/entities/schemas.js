import { schema } from 'normalizr'
import { CATEGORY_LIST_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_READ_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../category/actions'
import { SHOP_LIST_READ_SUCCESS, SHOP_CREATE_SUCCESS, SHOP_DETAIL_READ_SUCCESS, SHOP_UPDATE_SUCCESS } from '../shop/actions'

export const category = new schema.Entity('category', {}, {
  idAttribute: '_id',
})

export const shop = new schema.Entity('shop', {}, {
  idAttribute: '_id',
})

export const actionsMeta = {
  [CATEGORY_LIST_SUCCESS]: { property: 'list', schema: [category] },
  [CATEGORY_CREATE_SUCCESS]: { property: 'data', schema: category },
  [CATEGORY_READ_SUCCESS]: { property: 'data', schema: category },
  [CATEGORY_UPDATE_SUCCESS]: { property: 'newData', schema: category },
  [SHOP_LIST_READ_SUCCESS]: { property: 'list', schema: [shop] },
  [SHOP_CREATE_SUCCESS]: { property: 'detail', schema: shop },
  [SHOP_DETAIL_READ_SUCCESS]: { property: 'detail', schema: shop },
  // [SHOP_UPDATE_SUCCESS]: { property: 'data', schema: shop },
}
