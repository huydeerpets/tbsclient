// @flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { fetchPostsIfNeeded } from "../../../utils/fetch"
import { PASSWORD_LENGTH_MIN } from "../../../constants/common"
import { alert } from "../modules/new"
import { Page } from "../../../component/oauth/"
import * as types from "../../../constants/ActionTypes"
import type { State as LoginNew } from "../../login/reducers/new"

type Props = {
  location: {
    search: string
  },
  alert: Function,
  new: Function,
  loginNew: LoginNew
}

class New extends Component {
  props: Props
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
      this.props.alert("Please set the password to 8 characters or more")
      return
    }

    this.props.new({ email, password })
  }
  render() {
    const { warning, message } = this.props.loginNew

    return (
      <Page
        email={decodeURIComponent(this.props.location.search).split("=")[1]}
        onNew={this.new.bind(this)}
        isAlert={warning}
        message={message}
      />
    )
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    new: params => {
      dispatch(fetchPostsIfNeeded("users/new/", types.SET_LOGIN_USER, params))
    },
    alert: message => {
      dispatch(alert(message))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(New))
