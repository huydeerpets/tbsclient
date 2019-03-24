// @flow
import React, { Component } from "react"
import {
  Alert,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  Modal,
  MenuItem,
  Dropdown,
  FormControl,
  Table,
  PageHeader,
  Glyphicon,
  Button
} from "react-bootstrap"
import { VOICE_TYPE, VOICE_TYPE_MAP } from "../../../constants/common"
import { MAKE_STATUS_MADE } from "../../../constants/contribution"
import { TALK_TYPE_IMAGE } from "../../contribution/actions/talk"
import { Talk } from "../../../component/image/"
import { getTopUrl } from "../../../utils/common"
import Menu from "../containers/menu"

import { Link as Footer } from "../../../component/footer/"
import { Input, InputText, InputTextBox } from "../../../../css/sound.css"
import { Middle } from "../../../../css/common.css"
import Sound from "../../../utils/sound"
import MessageSow from "../../message/containers/show"
import type { State as SoundShow } from "../reducers/show"

type Item = {
  user_contribution_id: number,
  priority: number,
  body_sound: string,
  body: string,
  id: number,
  make_status: number
}

type Props = {
  match: {
    params: {
      id: number
    }
  },
  getDetail: (id: number) => void,
  soundShow: SoundShow,
  changeBodySound: (priority: number, bodySound: string) => void,
  changeVoiceType: (priority: number, voiceType: number) => void,
  saveBodySound: ({ id: number, body: string, priority: number }) => void,
  saveVoiceType: ({ id: number, voiceType: number, priority: number }) => void,
  offMovieMakeListener: () => void,
  openVoiceList: () => void,
  closeVoiceList: () => void,
  saveVoiceTypeList: ({
    userContributionId: number,
    voiceType: number
  }) => void,
  check: (id: number) => void,
  message: (val: string, type: string) => void
}

export default class Show extends Component {
  componentWillMount() {
    this.getDeatil(this.props.match.params.id)
  }
  componentDidUpdate() {
    const { detail, movieMakeListener } = this.props.soundShow
    const { id } = this.props.match.params
    if (detail) {
      this.getDeatil(id)
    }

    if (!movieMakeListener) {
      return
    }

    this.props.offMovieMakeListener()

    setTimeout(() => {
      this.props.check(id)
    }, 30000)
  }
  props: Props
  selectVoice: {
    value: ""
  }
  /**
   * Get details
   *
   * @param  {number} idPostID
   */
  getDeatil(id: number) {
    this.props.getDetail(id)
  }
  /**
   * Voice text change
   *
   * @param  {object} e element
   */
  changeBodySound(e: Object) {
    this.props.changeBodySound(
      Number(e.target.id.replace("body_sound-", "")),
      e.target.value
    )
  }
  /**
   * Set voice type
   *
   * @param  {string} voiceType Voice type
   */
  setVoiceType(voiceType: string) {
    const tmp = voiceType.split("_")
    this.props.changeVoiceType(Number(tmp[0]), Number(tmp[1]))
    this.props.saveVoiceType({
      id: Number(tmp[2]),
      voiceType: Number(tmp[1]),
      priority: Number(tmp[0])
    })

    this.props.message("Saved", "success")
  }
  /**
   * Get voice type
   *
   * @param  {object} item item
   */
  getVoiceType(item: Item) {
    let voiceType = ""
    if (item.voice_type != undefined) {
      voiceType = VOICE_TYPE_MAP[item.voice_type]
    }

    return (
      <Dropdown id="voiceType" onSelect={this.setVoiceType.bind(this)}>
        <Dropdown.Toggle>
          <Glyphicon glyph="volume-up" />&nbsp;{voiceType}&nbsp;&nbsp;
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {VOICE_TYPE.map(voive => {
            let option = {}
            if (item.voice_type == voive.type) {
              option = {
                active: true
              }
            }

            return (
              <MenuItem
                key={`${item.priority}_${voive.type}`}
                eventKey={`${item.priority}_${voive.type}_${item.id}`}
                {...option}
              >
                &nbsp;&nbsp;&nbsp;{voive.name}&nbsp;&nbsp;
              </MenuItem>
            )
          })}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  /**
   * Convert line breaks
   *
   * @param  {string} text text
   */
  changeBr(text: string) {
    const regex = /(\n)/g
    return text.split(regex).map((line, i) => {
      if (line.match(regex)) {
        return <br key={i} />
      }
      return line
    })
  }
  /**
   * Get the text details
   *
   * @param  {object} item conversation
   */
  getBodyDetail(item: Item) {
    let html
    if (item.talk_type == TALK_TYPE_IMAGE) {
      html = <Talk fileName={item.body} />
    } else {
      html = this.changeBr(item.body)
    }

    return html
  }
  /**
   * Save Audio Text
   *
   * @param  {number} priority priority
   * @param  {number} id       ID
   */
  saveBodySound(priority: number, id: number) {
    const { list } = this.props.soundShow

    this.props.saveBodySound({
      id,
      body: list[priority].body_sound,
      priority
    })

    this.props.message("Saved", "success")
  }
  /**
   * Get item
   *
   * @param  {object} item item
   */
  getItem(item: Item) {
    const { user_contribution_id, priority, body_sound, id, make_status } = item
    let make = ""
    if (make_status == MAKE_STATUS_MADE) {
      const name = `${user_contribution_id}_${priority}`
      make = (
        <Sound
          url={`${getTopUrl()}static/files/tmp/sound/${name}.wav?=${new Date().getTime()}`}
          repeat=""
          play=""
          pause=""
        />
      )
    }

    return (
      <tr key={priority}>
        <td>
          {priority + 1}
        </td>
        <td className={InputTextBox}>
          {this.getBodyDetail(item)}
        </td>
        <td className={InputTextBox}>
          <FormControl
            componentClass="textarea"
            placeholder="Text read aloud. If empty, it will pass through the reading"
            value={body_sound}
            onChange={this.changeBodySound.bind(this)}
            id={`body_sound-${priority}`}
            className={InputText}
          />
        </td>
        <td className={Middle}>
          <Button onClick={() => this.saveBodySound(priority, id)}>Preservation</Button>
        </td>
        <td>
          {this.getVoiceType(item)}
        </td>
        <td>
          {make}
        </td>
      </tr>
    )
  }
  /**
   * Save Voice Type List
   */
  saveVoiceTypeList() {
    this.props.saveVoiceTypeList({
      userContributionId: Number(this.props.match.params.id),
      voiceType: Number(this.selectVoice.value)
    })

    this.props.message("Execute batch change of voice type", "success")
  }
  /**
   * Get voice type list
   */
  getVoiceTypeList() {
    return (
      <Modal
        show={this.props.soundShow.voiceList}
        onHide={this.props.closeVoiceList}
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>Change voice type at once</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Alert bsStyle="info">
            Please select an audio type to convert in bulk.
              <br />
              <br />
              <FormGroup controlId="formControlsSelect" bsSize="small">
                <ControlLabel>Voice type</ControlLabel>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  inputRef={ref => {
                    this.selectVoice = ref
                  }}
                >
                  {VOICE_TYPE.map(voive =>
                    <option value={voive.type} key={voive.type}>
                      {voive.name}
                    </option>
                  )}
                </FormControl>
              </FormGroup>
            </Alert>
          </div>
          <ButtonToolbar>
            <Button onClick={this.props.closeVoiceList}>Cancel</Button>
            &nbsp; &nbsp;
            <Button bsStyle="warning" onClick={() => this.saveVoiceTypeList()}>
            Change in bulk
            </Button>
          </ButtonToolbar>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }
  /**
   * draw
   */
  render() {
    const { list } = this.props.soundShow

    return (
      <div>
        {this.getVoiceTypeList()}
        <MessageSow />
        <div className="container">
          <PageHeader>
            &nbsp;&nbsp;<Glyphicon glyph="bullhorn" />&nbsp;Edit aloud (β version)
          </PageHeader>
          <Menu userContributionId={this.props.match.params.id} />
        </div>
        <div className={`container ${Input}`}>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th> text </th>
                <th> Reading text </th>
                <th> operation </th>
                <th>
                  Voice type Setting
                  <Dropdown
                    id="sound-voice-dropdown-1"
                    className="pull-right"
                    pullRight
                  >
                    <Dropdown.Toggle noCaret bsSize="xsmall">
                      <Glyphicon glyph="list" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <MenuItem
                        eventKey="1"
                        onClick={() => this.props.openVoiceList()}
                      >
                        <Glyphicon glyph="bullhorn" />&nbsp;&nbsp;Voice type in bulkChange
                      </MenuItem>
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
                <th>Regeneration</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => this.getItem(item))}
            </tbody>
          </Table>
        </div>
        <Footer />
      </div>
    )
  }
}
