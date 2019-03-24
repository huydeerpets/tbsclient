// @flow
import * as types from "../../../constants/ActionTypes"

/**
 * Open a report
 */
export function openProblem() {
  return { type: types.OPEN_CONTRIBUTION_SHOW_PROBLEM }
}

/**
 * Close the report
 */
export function closeProblem() {
  return { type: types.CLOSE_CONTRIBUTION_SHOW_PROBLEM }
}

/**
 *Set the problem type
 */
export function setProblemType(problemType: number) {
  return {
    type: types.SET_CONTRIBUTION_SHOW_PROBLEM_TYPE,
    problemType
  }
}
