// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * initialize
 */
export function alertMessageInit() {
  return { type: types.INIT_ERROR_ALERT_MESSAGE }
}

/**
 * Display Warning
 */
export function alertMessage(message: string) {
  return { type: types.OPEN_ERROR_ALERT_MESSAGE, message }
}

/**
 * Close Warning
 */
export function closeAlert() {
  return { type: types.CLOSE_ERROR_ALERT_MESSAGE }
}
