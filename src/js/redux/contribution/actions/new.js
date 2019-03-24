// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * initialize
 */
export function init(experience: boolean) {
  return {
    type: types.INIT_CONTRIBUTION_NEW,
    experience
  }
}
