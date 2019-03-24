// @flow
import React, { Component } from "react"
import {
  FormGroup,
  Button,
  PageHeader,
  ControlLabel,
  Alert,
  Panel
} from "react-bootstrap"
import { Link } from "react-router-dom"

type Props = {
  onSave: ({ email: string, keyword: string, password: string }) => void,
  email: string,
  keyword: string,
  success: boolean,
  warning: boolean,
  message: string
}

export default class Reset extends Component {
  props: Props

  password: {
    value: string
  }
  save() {
    this.props.onSave({
      email: this.props.email,
      keyword: this.props.keyword,
      password: this.password.value
    })
  }
  render() {
    if (this.props.warning) {
      return (
        <Alert bsStyle="danger">
          {this.props.message}
        </Alert>
      )
    }

    if (this.props.success) {
      return (
        <div>
          <PageHeader>Reset Password</PageHeader>
          <br />
          <Panel header="Password changed" bsStyle="success">
            <Link to="/login/input">Login</Link>
          </Panel>
        </div>
      )
    }

    return (
      <div className="container">
        <PageHeader>Reset Password</PageHeader>
        <ControlLabel>Password</ControlLabel>

        <FormGroup controlId="formHorizontalEmail">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            ref={input => {
              this.password = input
            }}
          />
        </FormGroup>
        <Button bsStyle="success" onClick={() => this.save()}>
          Change
        </Button>
      </div>
    )
  }
}
