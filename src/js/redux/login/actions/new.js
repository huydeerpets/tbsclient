// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Warning
 */
export function alert(message: string) {
  return { type: types.SET_LOGIN_USER_ALERT, message }
}
