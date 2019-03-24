// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * UserNameChange
 *
 * @param  {string} name UserName
 */
export function changeUserName(name: string) {
  return { type: types.CHANGE_USER_NAME, name }
}
