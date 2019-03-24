// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * initialize
 */
export function init() {
  return { type: types.INIT_USER_CONTRBUTION_LIST }
}

/**
 *Set PostID
 */
export function setContribution(contributionId: number) {
  return {
    type: types.SET_USER_CONTRBUTION_LIST,
    contributionId
  }
}

/**
 * Set the title that hit the search
 */
export function setTitleSearch(list: Array<*>) {
  return { type: types.SET_USER_CONTRBUTION_LIST_SEARCH, list }
}

/**
 * Setting Display Status
 */
export function setViewStatus(viewStatus: number) {
  return {
    type: types.SET_USER_CONTRBUTION_LIST_VIEW_STATUS,
    viewStatus
  }
}

/**
 * Open delete confirmation
 */
export function openDeleteConfirm() {
  return { type: types.OPEN_USER_CONTRBUTION_LIST_CONFIRM }
}

/**
 * Close delete confirmation
 */
export function closeDeleteConfirm() {
  return { type: types.CLOSE_USER_CONTRBUTION_LIST_CONFIRM }
}
