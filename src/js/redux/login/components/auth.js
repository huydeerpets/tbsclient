// @flow
import React, { Component } from "react"
import type { State as LoginAuth } from "../reducers/auth"
import { Page } from "../../../component/header"

type Props = {
  auth: () => void,
  logout: () => void,
  loginAuth: LoginAuth
}

export default class Auth extends Component {
  componentWillMount() {
    // Certify
    this.props.auth()
  }
  props: Props

  /**
   * draw
   */
  render() {
    return (
      <Page
        name={this.props.loginAuth.name}
        login={this.props.loginAuth.login}
        logout={this.props.logout}
      />
    )
  }
}
