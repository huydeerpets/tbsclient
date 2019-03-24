// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Open remake
 */
export function open() {
  return { type: types.OPEN_SOUND_MENU_REMAKE }
}

/**
 * Close remake
 */
export function close() {
  return { type: types.CLOSE_SOUND_MENU_REMAKE }
}

/**
 * Open upload
 */
export function openUpload() {
  return { type: types.OPEN_SOUND_MENU_UPLOAD }
}

/**
 * Close upload
 */
export function closeUpload() {
  return { type: types.CLOSE_SOUND_MENU_UPLOAD }
}

/**
 * Do it while creating a video
 */
export function makingMovie() {
  return { type: types.MAKING_SOUND_MENU_MOVIE }
}

/**
 * Do during upload
 */
export function uploading() {
  return { type: types.UPLOADING_SOUND_MENU_MOVIE }
}

/**
 * Open info
 */
export function openInformation() {
  return { type: types.OPEN_SOUND_MENU_INFORMATION }
}

/**
 * Close information
 */
export function closeInformation() {
  return { type: types.CLOSE_SOUND_MENU_INFORMATION }
}
