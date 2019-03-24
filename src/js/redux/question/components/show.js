// @flow
import React, { Component } from "react"
import {
  Glyphicon,
  Col,
  ControlLabel,
  PageHeader,
  Panel,
  Button,
  FormControl,
  FormGroup,
  Alert
} from "react-bootstrap"
import { Link as Footer } from "../../../component/footer/"
import { Required } from "../../../../css/common.css"
import type { State as QuestionShow } from "../reducers/show"

type Props = {
  add: ({ email: string, body: string }) => void,
  init: () => void,
  questionShow: QuestionShow
}

export default class Show extends Component {
  inputEmail: {
    value: ""
  }
  inputBody: {
    value: ""
  }
  componentWillMount() {
    this.props.init()
  }
  props: Props
  /**
   * to add
   */
  add() {
    const email = this.inputEmail.value.trim()
    const body = this.inputBody.value.trim()

    if (email == "" || body == "") {
      return
    }

    this.props.add({ email, body })
  }
  /**
   * draw
   */
  render() {
    let send = ""

    if (this.props.questionShow.send) {
      send = <Alert bsStyle="success">Your inquiry has been sent.</Alert>
    }

    return (
      <div>
        <div className="container">
          <div>
            <PageHeader>
              <Glyphicon glyph="info-sign" />&nbsp;Inquiry
            </PageHeader>
          </div>
          <Panel header="Inquiry form" bsStyle="info">
            <div>
              {send}
            </div>

            <FormGroup>
              <ControlLabel>
                Email
                <span className={Required}>*</span>
              </ControlLabel>
              <FormControl
                type="email"
                placeholder="Email"
                inputRef={ref => {
                  this.inputEmail = ref
                }}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
              Inquiry
                <span className={Required}>*</span>
              </ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Inquiry"
                inputRef={ref => {
                  this.inputBody = ref
                }}
                rows="6"
              />
            </FormGroup>
            <hr />
            <FormGroup>
              <Col smOffset={10} sm={10}>
                <Button bsStyle="success" onClick={() => this.add()}>
                  <Glyphicon glyph="send" />&nbsp;&nbsp;&nbsp;Send
                </Button>
              </Col>
            </FormGroup>
          </Panel>
        </div>
        <Footer />
      </div>
    )
  }
}
