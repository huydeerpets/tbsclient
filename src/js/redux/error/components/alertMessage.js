// @flow
import React, { Component } from "react"
import { Alert, Glyphicon } from "react-bootstrap"
import type { State as ErrorAlertMessage } from "../reducers/alertMessage"

type Props = {
  closeAlert: () => void,
  errorAlertMessage: ErrorAlertMessage
}

export default class AlertMessage extends Component {
  props: Props
  /**
   * Get Warning
   */
  getAlert() {
    const { warning, message } = this.props.errorAlertMessage

    if (!warning) {
      return ""
    }

    return (
      <Alert bsStyle="danger">
        <Glyphicon glyph="remove" onClick={() => this.props.closeAlert()} />
        &nbsp;
        {message}
      </Alert>
    )
  }
  /**
   * draw
   */
  render() {
    return (
      <div>
        {this.getAlert()}
      </div>
    )
  }
}
