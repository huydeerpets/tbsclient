// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * initialize
 */
export function init() {
  return { type: types.INIT_MESSAGE_SHOW }
}

/**
 * Display the wording
 */
export function message(message: string, style: number) {
  return { type: types.OPEN_MESSAGE_SHOW, message, style }
}

/**
 * close up
 */
export function close() {
  return { type: types.CLOSE_MESSAGE_SHOW }
}
