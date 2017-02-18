import { schema } from 'normalizr'
import { CATEGORY_LIST_SUCCESS, CATEGORY_CREATE_SUCCESS, CATEGORY_READ_SUCCESS, CATEGORY_UPDATE_SUCCESS } from '../category/actions'

export const category = new schema.Entity('category', {}, {
  idAttribute: '_id'
})

export const actionsMeta = {
  [CATEGORY_LIST_SUCCESS]: { property: 'list', schema: [category] },
  [CATEGORY_CREATE_SUCCESS]: { property: 'data', schema: category },
  [CATEGORY_READ_SUCCESS]: { property: 'data', schema: category },
  [CATEGORY_UPDATE_SUCCESS]: { property: 'newData', schema: category }
}
