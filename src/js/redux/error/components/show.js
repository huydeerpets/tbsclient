// @flow
import React, { Component } from "react"
import {
  Collapse,
  Well,
  Modal,
  Button,
  Alert,
  FormControl,
  FormGroup
} from "react-bootstrap"
import type { State as ErrorShow } from "../reducers/show"

type Props = {
  errorShow: ErrorShow,
  closeError: () => void,
  openBugReport: () => void,
  addBugReport: ({ body: string }) => void
}

export default class Show extends Component {
  input: {
    value: ""
  }
  props: Props
  /**
   * Add a bug report
   */
  addBugReport() {
    const val = this.input.value.trim()
    if (val == "") {
      return
    }

    this.props.addBugReport({ body: val })
  }
  /**
   * draw
   */
  render() {
    const { show, message } = this.props.errorShow

    let bugReport = {}
    if (this.props.errorShow.bugReport) {
      bugReport = {
        disabled: true
      }
    }

    return (
      <Modal show={show} onHide={() => this.props.closeError()}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Error!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="danger">
            <strong>
              {message}
            </strong>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.closeError()}>Close</Button>
          <br />
          <br />
          <Button
            bsStyle="danger"
            {...bugReport}
            onClick={() => this.props.openBugReport()}
          >
            Report a bug
          </Button>
          <br />
          <br />
          <Collapse in={this.props.errorShow.bugReport}>
            <Well>
              <FormGroup>
                <FormControl
                  componentClass="textarea"
                  placeholder="Problem content"
                  inputRef={ref => {
                    this.input = ref
                  }}
                />
              </FormGroup>
              <Button bsStyle="danger" onClick={() => this.addBugReport()}>
              Report
              </Button>
            </Well>
          </Collapse>
          <br />
          {(() => {
            const val = this.input ? this.input.value.trim() : ""
            if (val != "")
              return <Alert bsStyle="success">I reported a bug. Thanks for your cooperation.</Alert>
          })()}
        </Modal.Footer>
      </Modal>
    )
  }
}
