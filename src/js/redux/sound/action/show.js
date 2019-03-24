// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Voice text change
 *
 * @param  {number} priority Priority
 * @param  {string} bodySound Voice text
 */
export function changeBodySound(priority: number, bodySound: string) {
  return {
    type: types.CHANGE_SOUND_SHOW_BODY_SOUND,
    priority,
    bodySound
  }
}

/**
 * Voice type Change
 *
 * @param  {number} priority Priority
 * @param  {string} voiceType Voice type
 */
export function changeVoiceType(priority: number, voiceType: string) {
  return {
    type: types.CHANGE_SOUND_SHOW_VOICE_TYPE,
    priority,
    voiceType
  }
}

/**
 * Video status change
 *
 * @param  {number} movieStatus Movie status
 */
export function changeMovieStatus(movieStatus: number) {
  return {
    type: types.CHANGE_SOUND_SHOW_MOVIE_STATUS,
    movieStatus
  }
}

/**
 * Turn off creation status monitoring
 */
export function offMovieMakeListener() {
  return { type: types.OFF_SOUND_SHOW_MOVIE_MAKE_LISTENER }
}

/**
 * Open voice list
 */
export function openVoiceList() {
  return { type: types.OPEN_SOUND_SHOW_VOICE_LIST }
}

/**
 * Close voice list
 */
export function closeVoiceList() {
  return { type: types.CLOSE_SOUND_SHOW_VOICE_LIST }
}
