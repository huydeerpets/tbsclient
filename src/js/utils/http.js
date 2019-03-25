/* global process*/
import request from "superagent"

const host =
  typeof process.env.BASE_URL === "undefined"
    ? "http://206.189.90.165:8080/"
    : process.env.BASE_URL

export default class Http {
  /**
   * Send communication
   *
   * @param  {string} url URL
   * @param  {object} sendList Parameter
   * @return {object} Response
   */
  static postApi(url, sendList = null) {
    return new Promise((resolve, reject) => {
      request.post(host + url).type("form").send(sendList).end((err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(JSON.parse(res.text))
        }
      })
    })
  }
  /**
   *Send Image
   *
   * @param  {string} url URL
   * @param  {object} sendList Parameter
   * @return {object} Response
   */
  static postImageApi(url, sendList = null) {
    return new Promise((resolve, reject) => {
      request.post(host + url).send(sendList).end((err, res) => {
        if (!err) {
          resolve(res)
        } else {
          reject(err)
        }
      })
    })
  }
}
