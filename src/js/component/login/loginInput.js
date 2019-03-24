// @flow
import React, { Component } from "react"
import { FormGroup, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Platform } from "./"

type Props = {
  onLogin: Function
}

export default class LoginInput extends Component {
  props: Props

  email: Object
  password: Object

  render() {
    return (
      <div>
        <FormGroup controlId="formHorizontalEmail">
          <input
            type="text"
            id="user"
            name="user"
            className="form-control"
            placeholder="Email"
            ref={input => {
              this.email = input
            }}
          />
        </FormGroup>
        <Form componentClass="fieldset" inline>
          <FormGroup controlId="formHorizontalPassword">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              ref={input => {
                this.password = input
              }}
              size="45"
            />&nbsp;&nbsp;
            <Button
              id="submit"
              bsStyle="success"
              onClick={() =>
                this.props.onLogin(
                  this.email.value.trim(),
                  this.password.value.trim()
                )}
            >
              Login
            </Button>
            <Link to="/password/input">
              <Button bsStyle="link">If you forget your password</Button>
            </Link>
            <hr />
            <br />
            <Platform label="Login" />
          </FormGroup>
        </Form>
        <br />
        <br />
        <Link to="/login/new">
          <Button bsStyle="link">Click here to register by entering your email address</Button>
        </Link>
      </div>
    )
  }
}
