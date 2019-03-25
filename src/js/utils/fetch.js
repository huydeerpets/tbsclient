// @flow
/* global process*/
import fetch from "isomorphic-fetch"
import invariant from "assert"
import * as types from "../constants/ActionTypes"

// host
const BASE_URL = process.env.BASE_URL
invariant(BASE_URL)

const host: string =
  typeof process.env.BASE_URL === "undefined"
    ? "http://127.0.0.1:8080/api/"
    : `${BASE_URL}api/`

const staticHost: string =
  typeof process.env.BASE_URL === "undefined"
    ? "http://127.0.0.1:8080"
    : BASE_URL

// Communication status list
const fetchStateList: Object = {}

/**
 * Determine whether to communicate
 *
 * @param  {string} url URL
 * @return {bool} Communication flag
 */
function shouldFetchPosts(url: string): boolean {
  if (fetchStateList[url] == undefined) {
    fetchStateList[url] = {
      isFetching: false
    }
  }

  if (!fetchStateList[url].isFetching) {
    return true
  }

  return false
}

/**
 * Return a response
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} response response
 * @param  {object} receiveParam Return parameter
 * @return {object} action
 */
function receiveResponse(
  url: string,
  type: string,
  response: Object,
  receiveParam = {}
): Object {
  fetchStateList[url].isFetching = false

  return {
    type,
    url,
    response,
    receivedAt: Date.now(),
    receiveParam
  }
}

/**
 * Return an error response
 *
 * @param  {string} url URL
 * @param  {object} response response
 * @return {object} action
 */
function receiveErrorResponse(url: string, response: Object) {
  fetchStateList[url].isFetching = false
  const { message, errCode } = response

  return {
    type: types.SHOW_ERROR_MESSAGE,
    message,
    errCode,
    show: true,
    receivedAt: Date.now()
  }
}

/**
 * Communicate (GET)
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} receiveParam Return parameter
 * @return {object} response
 */
function fetchGets(url: string, type: string, receiveParam: Object) {
  const requestParams = {
    method: "GET",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }

  return dispatch =>
    fetch(host + url, requestParams)
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(receiveErrorResponse(url, json))
        }

        dispatch(receiveResponse(url, type, json, receiveParam))
      })
}

/**
 * Communicate and get text if necessary
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} receiveParam Return parameter
 * @return {object} action
 */
export function fetchGetsIfNeeded(
  url: string,
  type: string,
  receiveParam: Object
): Object {
  return dispatch => {
    if (shouldFetchPosts(url)) {
      return dispatch(fetchGets(url, type, receiveParam))
    }

    return Promise.resolve()
  }
}

/**
 * Communicate (DELETE)
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} receiveParam Return parameter
 * @return {object} response
 */
function fetchDelete(url: string, type: string, receiveParam: Object) {
  const requestParams = {
    method: "DELETE",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }

  return dispatch =>
    fetch(host + url, requestParams)
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(receiveErrorResponse(url, json))
        }

        dispatch(receiveResponse(url, type, json, receiveParam))
      })
}

/**
 * Communicate and get text if necessary
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} receiveParam Return parameter
 * @return {object} action
 */
export function fetchDeleteIfNeeded(
  url: string,
  type: string,
  receiveParam: Object
): Object {
  return dispatch => {
    if (shouldFetchPosts(url)) {
      return dispatch(fetchDelete(url, type, receiveParam))
    }

    return Promise.resolve()
  }
}

/**
 * Communicate (POST)
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} paramas Parameter
 * @param  {object} receiveParam Return parameter
 * @return {object} response
 */
function fetchPosts(
  url: string,
  type: string,
  paramas: Object,
  receiveParam: Object
) {
  const requestParams = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paramas)
  }

  return dispatch =>
    fetch(host + url, requestParams)
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(receiveErrorResponse(url, json))
        }

        dispatch(receiveResponse(url, type, json, receiveParam))
      })
}

/**
 * Perform POST communication if necessary
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} paramas Parameter
 * @param  {object} receiveParam Return parameter
 * @return {object} action
 */
export function fetchPostsIfNeeded(
  url: string,
  type: string,
  paramas: Object = {},
  receiveParam: Object = {}
): Object {
  return dispatch => {
    if (shouldFetchPosts(url)) {
      // You can call thunk from thunk!
      return dispatch(fetchPosts(url, type, paramas, receiveParam))
    }
    // Call the following code and let us know that wait for nothing
    return Promise.resolve()
  }
}

/**
 * Communicate (PUT)
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} paramas Parameter
 * @param  {object} receiveParam Return parameter
 * @return {object} response
 */
function fetchPuts(
  url: string,
  type: string,
  paramas: Object,
  receiveParam: Object
) {
  const requestParams = {
    method: "PUT",
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paramas)
  }

  return dispatch =>
    fetch(host + url, requestParams)
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(receiveErrorResponse(url, json))
        }

        dispatch(receiveResponse(url, type, json, receiveParam))
      })
}

/**
 * Perform POST communication if necessary
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} paramas Parameter
 * @param  {object} receiveParam Return parameter
 * @return {object} Action
 */
export function fetchPutsIfNeeded(
  url: string,
  type: string,
  paramas: Object = {},
  receiveParam: Object = {}
): Object {
  return dispatch => {
    if (shouldFetchPosts(url)) {
      return dispatch(fetchPuts(url, type, paramas, receiveParam))
    }

    return Promise.resolve()
  }
}

/**
 * upload
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} paramas Parameter
 * @param  {object} receiveParam Return parameter
 * @return {object} response
 */
function fetchUpload(
  url: string,
  type: string,
  paramas: Object,
  receiveParam: Object
) {
  const requestParams = {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json, */*"
    },
    body: paramas
  }

  return dispatch =>
    fetch(host + url, {
      ...requestParams
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(receiveErrorResponse(url, json))
        }

        dispatch(receiveResponse(url, type, json, receiveParam))
      })
}

/**
 * Perform upload communication if necessary
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} paramas Parameter
 * @param  {object} receiveParam Return parameter
 * @return {object} Action
 */
export function fetchUploadIfNeeded(
  url: string,
  type: string,
  paramas: Object,
  receiveParam: Object = {}
): Object {
  return dispatch => {
    if (shouldFetchPosts(url)) {
      return dispatch(fetchUpload(url, type, paramas, receiveParam))
    }

    return Promise.resolve()
  }
}

/**
 * Communicate and get text if necessary
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} receiveParam Return parameter
 * @return {object} Action
 */
export function fetchTextIfNeeded(
  url: string,
  type: string,
  receiveParam: Object
): Object {
  return dispatch => {
    if (shouldFetchPosts(url)) {
      // You can call thunk from thunk！
      return dispatch(fetchText(url, type, receiveParam))
    }
    // Call the following code and let us know that wait for nothing
    return Promise.resolve()
  }
}

/**
 * Get the text
 *
 * @param  {string} url URL
 * @param  {string} type type
 * @param  {object} receiveParam Return parameter
 * @return {object} response
 */
function fetchText(url: string, type: string, receiveParam: Object) {
  return dispatch =>
    fetch(staticHost + url)
      .then(response =>
        response.text().then(json => ({
          status: response.status,
          json
        }))
      )
      .then(({ status, json }) => {
        if (status >= 400) {
          return dispatch(receiveErrorResponse(url, json))
        }

        dispatch(receiveResponse(url, type, json, receiveParam))
      })
}
