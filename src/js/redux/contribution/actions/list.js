// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Display the next page
 */
export function next() {
  return { type: types.GET_CONTRIBUTION_LIST_NEXT }
}

/**
 * Delete an item
 */
export function deleteItem(id: number) {
  return { type: types.DELETE_CONTRIBUTION_LIST_ITEM, id }
}
