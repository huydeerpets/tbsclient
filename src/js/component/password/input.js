// @flow
import React, { Component } from "react"
import {
  FormGroup,
  Button,
  PageHeader,
  ControlLabel,
  Alert,
  ListGroupItem,
  ListGroup
} from "react-bootstrap"

type Props = {
  onAdd: (email: string) => void,
  success: boolean,
  warning: boolean,
  message: string
}

const reports = (success: boolean, warning: boolean, message: string) => {
  if (success) {
    return (
      <ListGroup>
        <ListGroupItem bsStyle="success">Email sent. please confirm！</ListGroupItem>
      </ListGroup>
    )
  }

  if (warning) {
    return (
      <Alert bsStyle="warning">
        {message}
      </Alert>
    )
  }
}

export default class Input extends Component {
  props: Props

  email: {
    value: string
  }

  render() {
    return (
      <div className="container">
        <PageHeader>Set password again</PageHeader>
        {reports(this.props.success, this.props.warning, this.props.message)}
        <ControlLabel>Email</ControlLabel>
        <FormGroup controlId="formHorizontalEmail">
          <input
            type="text"
            className="form-control"
            ref={input => {
              this.email = input
            }}
            placeholder="Email"
          />
        </FormGroup>
        <Button
          bsStyle="success"
          onClick={() => this.props.onAdd(this.email.value.trim())}
        >
          Send
        </Button>
      </div>
    )
  }
}
