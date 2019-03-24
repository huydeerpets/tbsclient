// @flow
import * as types from "../../../constants/ActionTypes"

/**
 *Set Icon
 */
export function setIcon(id: number) {
  return {
    type: types.SET_CHARACTER_LIST,
    icon: id
  }
}

/**
 * Set voice type
 */
export function setVoiceType(voiceType: number) {
  return {
    type: types.SET_CHARACTER_VOICE_TYPE,
    voiceType
  }
}

/**
 * initialize
 */
export function init() {
  return { type: types.INIT_CHARACTER_LIST }
}

/**
 * Set Default
 */
export function setDefaultList() {
  return { type: types.SET_CHARACTER_LIST_DEFAULT }
}
