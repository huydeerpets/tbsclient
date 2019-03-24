// @flow
import * as types from "../../../constants/ActionTypes"

// Direction type: left
export const DIRECTION_LEFT = 1
// Direction type: right
export const DIRECTION_RIGHT = 2

// talk type: text type
export const TALK_TYPE_TEXT = 1
// talk type: Image type
export const TALK_TYPE_IMAGE = 2

/**
 * Edit the text
 */
export function setEditBody(
  priority: number,
  body: string,
  character: Object,
  directionType: number,
  talkType: number
) {
  return {
    type: types.SET_CONTRIBUTION_TALK_EDIT_BODY,
    priority,
    character,
    directionType,
    talekType: talkType,
    body
  }
}

/**
 * Delete the text
 */
export function deleteBody(priority: number) {
  return { type: types.DELETE_CONTRIBUTION_TALK_BODY, priority }
}

/**
 * Set the conversation list
 */
export function setTalkList(tags: Array<*>) {
  return { type: types.SET_CONTRIBUTION_TALK_LIST, tags }
}
