// @flow
import React, { Component } from "react"
import { PageHeader, Alert, Col, Grid, Row } from "react-bootstrap"
import { PASSWORD_LENGTH_MIN } from "../../../constants/common"
import { Hello, NewInput } from "../../../component/login/"
import type { State as LoginNew } from "../reducers/new"

type Props = {
  new: ({ email: string, password: string }) => void,
  open: () => void,
  loginNew: LoginNew,
  alert: (mag: string) => void
}

export default class New extends Component {
  props: Props
  /**
   * Register new
   */
  new(email: string, password: string) {
    if (
      !email.match(
        /^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/
      )
    ) {
      this.props.alert("Unavailable email address")
      return
    }

    if (password.length < PASSWORD_LENGTH_MIN) {
      this.props.alert("パスワードは8文字以上にSettingして下さい")
      return
    }

    this.props.new({ email, password })
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    const { open, text, warning, message } = this.props.loginNew

    return (
      <div>
        <div className="container">
          <PageHeader>.stamp&nbsp;&nbsp;Register a new user</PageHeader>
        </div>
        <Grid>
          <br />
          <br />
          <Row className="show-grid">
            <Col md={6}>
              <Hello open={open} text={text} />
            </Col>
            <Col md={6}>
              {(() => {
                if (warning) {
                  return (
                    <Alert bsStyle="danger">
                      {message}
                    </Alert>
                  )
                }
              })()}
              <NewInput
                onOpen={this.props.open.bind(this)}
                onNew={this.new.bind(this)}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
