// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Certify
 */
export function auth(user: { login: boolean, name: string }) {
  return { type: types.SET_LOGIN_AUTH, login: user.login, name: user.name }
}

/**
 *Log out
 */
export function logout() {
  return { type: types.LOGOUT_LOGIN_AUTH }
}
