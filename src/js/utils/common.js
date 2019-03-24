// @flow
import dateFormat from "dateformat"

/**
 * Get the formatted date and time
 *
 * @param  {string} data Date
 * @return {string} Date
 */
export function DateTimeFormat(date: string): string {
  return dateFormat(date, "yyyy年mm月dd日 hh:MM:ss")
}

/**
 * Get the date of shaping
 *
 * @param  {string} data Date
 * @return {string} Date
 */
export function DateFormat(date: string): string {
  return dateFormat(date, "yyyy/mm/dd")
}

/**
 * Get a random string
 *
 * @param  {number} myStrong Random value
 * @return {string} Random string
 */
export function getUniqueStr(myStrong?: number): string {
  let strong = 1000

  if (myStrong) {
    strong = myStrong
  }

  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  )
}

/**
 * Get top URL
 *
 * @return {string} URL
 */
export function getStaticUrl(): string {
  if (process.env.IMAGE_PATH == undefined) {
    return "images/"
  }

  return process.env.IMAGE_PATH
}

/**
 * Get top URL
 *
 * @return {string} URL
 */
export function getTopUrl(): string {
  if (process.env.BASE_URL == undefined) {
    return ""
  }

  return process.env.BASE_URL
}

/**
 * Get upload URL
 *
 * @return {string} URL
 */
export function getUploadUrl(): string {
  if (process.env.UPLOAD_PATH == undefined) {
    return "test/files/"
  }

  return process.env.UPLOAD_PATH
}

/**
 * Omit
 *
 * @param  {string} str character
 * @param  {number} maxNumber Maximum number of characters
 * @return {string} Ellipsis
 */
export function abridgement(str: string, maxNumber: number): string {
  if (str.length <= maxNumber) {
    return str
  }

  return `${str.substring(0, maxNumber)}...`
}

export function formatTime(seconds: number) {
  return (
    ("00" + Math.floor(seconds / 60 % 60)).slice(-2) +
    "分" +
    ("00" + Math.floor(seconds % 60)).slice(-2) +
    "秒"
  )
}
