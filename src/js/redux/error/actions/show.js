// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Display an error
 */
export function showError(error: { message: string, errCode: number }) {
  return {
    type: types.SHOW_ERROR_MESSAGE,
    message: error.message,
    errCode: error.errCode,
    show: true
  }
}

/**
 * Close error
 */
export function closeError() {
  return { type: types.CLOSE_ERROR_MESSAGE, show: false }
}

/**
 * Open error report
 */
export function openBugReport() {
  return { type: types.OPEN_ERROR_BUG_REPORT, bugReport: true }
}
