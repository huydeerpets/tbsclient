// @flow
import React from "react"
import { Alert } from "react-bootstrap"

export default () =>
  <Alert bsStyle="warning">
    <strong>Warning！</strong>There is no icon image set。
    <br />
    <br />
    If there is no Icon image setting, the default icon is applied。
  </Alert>
