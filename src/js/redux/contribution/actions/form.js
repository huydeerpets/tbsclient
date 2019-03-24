// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Add text
 */
export function addBody(
  body: string,
  character: Object,
  directionType: number,
  talkType: number
) {
  return {
    type: types.ADD_CONTRIBUTION_FORM_BODY,
    character,
    body,
    directionType,
    talkType
  }
}

/**
 * Edit the text
 */
export function editBody(
  body: string,
  character: Object,
  directionType: number,
  priority: number
) {
  return {
    type: types.EDIT_CONTRIBUTION_FORM_BODY,
    character,
    body,
    directionType,
    priority
  }
}

/**
 * characterーChange
 */
export function changeCharacter(character: Object) {
  return {
    type: types.CHANGE_CONTRIBUTION_FORM_CHARACTER,
    character
  }
}

/**
 * Body Change
 */
export function changeBody(body: string) {
  return {
    type: types.CHANGE_CONTRIBUTION_FORM_BODY,
    body
  }
}

/**
 * Title Change
 */
export function changeTitle(title: string) {
  return {
    type: types.CHANGE_CONTRIBUTION_FORM_TITLE,
    title
  }
}

/**
 * Tag Change
 */
export function changeTag(tag: string) {
  return {
    type: types.CHANGE_CONTRIBUTION_FORM_TAG,
    tag
  }
}

/**
 * Change the height of the window
 */
export function changeHeight(height: number) {
  return {
    type: types.CHANGE_CONTRIBUTION_FORM_HEIGHT,
    height
  }
}

/**
 * Setting Display Status
 */
export function setViewStatus(viewStatus: number) {
  return {
    type: types.SET_CONTRIBUTION_FORM_VIEW_STATUS,
    viewStatus
  }
}

/**
 * Open help
 */
export function openHelp() {
  return { type: types.OPEN_CONTRIBUTION_FORM_HELP }
}

/**
 * Close help
 */
export function closeHelp() {
  return { type: types.CLOSE_CONTRIBUTION_FORM_HELP }
}

/**
 * Cancel editing
 */
export function cancelEdit() {
  return { type: types.CANCEL_CONTRIBUTION_FROM_EDIT }
}
