// @flow
import React, { Component } from "react"
import { Glyphicon, PageHeader, Col, Grid, Row } from "react-bootstrap"
import { Hello, LoginInput } from "../../../component/login/"

type Props = {
  loginCheck: ({ email: string, password: string }) => void
}

export default class Login extends Component {
  props: Props
  /**
   * log in
   */
  login(email: string, password: string) {
    this.props.loginCheck({ email, password })
  }
  /**
   * draw
   */
  render() {
    return (
      <div>
        <div className="container">
          <PageHeader>
            <Glyphicon glyph="log-in" />&nbsp;ログイン
          </PageHeader>
        </div>
        <Grid>
          <br />
          <br />
          <Row>
            <Col xs={9} md={6}>
              <Hello />
            </Col>
            <Col xs={9} md={6}>
              <LoginInput onLogin={this.login.bind(this)} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
