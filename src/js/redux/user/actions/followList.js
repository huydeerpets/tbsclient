// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Page
 *
 * @param  {numbet} page number of pages
 * @param  {numbet} order Order
 */
export function paging(page: number, order: number) {
  return { type: types.PAGING_USER_FOLLOW_LIST, page, order }
}
