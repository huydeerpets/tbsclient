// @flow
import React, { Component } from "react"
import { FormGroup, Button, ButtonToolbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Platform } from "./"
import styles from "./styles.css"

type Props = {
  onNew: Function,
  onOpen: Function
}

export default class NewInput extends Component {
  props: Props

  email: Object
  password: Object

  render() {
    return (
      <div>
        <FormGroup controlId="formHorizontalEmail">
          <input
            type="text"
            className="form-control"
            id="user"
            name="user"
            placeholder="Email"
            ref={input => {
              this.email = input
            }}
          />
        </FormGroup>
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
          />
        </FormGroup>
        <FormGroup>
          <br />
          <div>
            <Button
              bsStyle="link"
              className={styles.NoSpace}
              onClick={() => this.props.onOpen()}
            >
              Terms of service
            </Button>
            Please press the "Agree and register the Terms of Use" button after agreeing
          </div>
          <br />
          <ButtonToolbar>
            <Button
              bsStyle="success"
              bsSize="large"
              onClick={() =>
                this.props.onNew(
                  this.email.value.trim(),
                  this.password.value.trim()
                )}
            >
              Agree to the terms of use and register
            </Button>
          </ButtonToolbar>
        </FormGroup>
        <hr />
        <br />
        <Platform label="Account Registration" />
        <Link to="/login">
          <Button bsStyle="link">Login</Button>
        </Link>
      </div>
    )
  }
}
