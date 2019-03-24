export default class LocalStorage {
  /**
   * get
   *
   * @param  {string} key key
   * @return {string} value
   */
  static get(key) {
    const value = window.localStorage.getItem(key)

    return value
  }
  /**
   * Get JSON converted
   *
   * @param  {string} key key
   * @return {object} value
   */
  static getJSON(key) {
    const value = window.localStorage.getItem(key)
    if (value == null) {
      return {}
    }

    return JSON.parse(value)
  }
}
