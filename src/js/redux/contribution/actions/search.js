// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Page
 */
export function paging(search: string, order: number, page: number) {
  return {
    type: types.PAGING_CONTRIBUTION_SEARCH_LIST,
    search,
    page,
    order
  }
}

/**
 * Set the order
 */
export function setOrder(order: number) {
  return {
    type: types.SET_CONTRIBUTION_SEARCH_ORDER,
    order
  }
}
