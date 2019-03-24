// @flow
import React from "react"
import {
  Modal,
  Radio,
  FormGroup,
  Button,
  Glyphicon,
  Well
} from "react-bootstrap"
import {
  PROBLEM_TYPE_SPAM,
  PROBLEM_TYPE_INAPPROPRIATE
} from "../../../constants/contribution"
import styles from "./styles.css"

export type Props = {
  problemType: number,
  send?: boolean,
  show?: boolean,
  onProblemType: Function,
  onHide: Function,
  onAdd: Function
}

function getSend(send?: boolean) {
  if (!send) {
    return
  }

  return (
    <div>
      <br />
      <Well>I have sent a report. Thanks for your cooperation.</Well>
    </div>
  )
}

export default ({
  problemType,
  send,
  show,
  onHide,
  onProblemType,
  onAdd
}: Props) =>
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Report a post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>I will report for the following reasons.</h4>
      <br />
      <div className={styles.problem}>
        <FormGroup>
          <Radio
            name="problemType"
            value={PROBLEM_TYPE_SPAM}
            checked={problemType == PROBLEM_TYPE_SPAM}
            readOnly={problemType == PROBLEM_TYPE_SPAM}
            onChange={() => onProblemType(PROBLEM_TYPE_SPAM)}
          >
            It is spam
          </Radio>
          <Radio
            name="problemType"
            value={PROBLEM_TYPE_INAPPROPRIATE}
            checked={problemType == PROBLEM_TYPE_INAPPROPRIATE}
            readOnly={problemType == PROBLEM_TYPE_INAPPROPRIATE}
            onChange={() => onProblemType(PROBLEM_TYPE_INAPPROPRIATE)}
          >
            Inappropriate content is included
          </Radio>
        </FormGroup>
      </div>
    </Modal.Body>
    <Modal.Footer>
      <Button bsStyle="success" onClick={() => onAdd()}>
        <Glyphicon glyph="send" />&nbsp;Send
      </Button>
      {getSend(send)}
    </Modal.Footer>
  </Modal>
