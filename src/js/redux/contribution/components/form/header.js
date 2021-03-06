// @flow
import React, { Component } from "react"
import { Button, ListGroup, ListGroupItem, Glyphicon } from "react-bootstrap"
import FormMain from "../../containers/form/main"
import TalkBoard from "../../containers/talk/board"
import AlertMessage from "../../../error/containers/alertMessage"
import MessageSow from "../../../message/containers/show"
import { Guide } from "../../../../component/contribution/help"
import { Status, Sound } from "../../../../component/contribution/viewStatus"
import { Timer } from "../../../../component/contribution/timer"
import { Tags } from "../../../../component/contribution/header"
import { NewInput as NewTitleInput } from "../../../../component/contribution/title"
import { formatTime } from "../../../../utils/common"
import { TALK_TYPE_IMAGE } from "../../actions/talk"
import type { State as ContributionForm } from "../../reducers/form"
import type { State as ContributionEdit } from "../../reducers/edit"
import type { State as ContributionTalk } from "../../reducers/talk"
import { group, item, tip, timer, preview } from "./styles.css"

let self: Object

window.addEventListener("resize", () => {
  if (self == undefined) {
    return
  }

  self.props.changeHeight(window.innerHeight)
})

window.addEventListener("keydown", event => {
  if (self == undefined) {
    return
  }

  if (!event.shiftKey) {
    return
  }

  if (event.keyCode == 17) {
    self.save()
  }

  if (event.altKey) {
    if (event.keyCode == 38) {
      self.preview.scrollTop -= 30
    }

    if (event.keyCode == 40) {
      self.preview.scrollTop += 30
    }
  }
})

function checkDiff() {
  if (self == undefined) {
    return false
  }

  const title = self.props.contributionForm.title
  const body = self.props.contributionTalk

  if (
    title == self.props.contributionEdit.saveData.title &&
    JSON.stringify(body) == self.props.contributionEdit.saveData.body
  ) {
    return false
  }

  return true
}

const checkContributionEdit = function(hash) {
  if (self == undefined) {
    return false
  }

  if (
    hash.indexOf("contribution/new") == -1 &&
    hash.indexOf("contribution/edit") == -1
  ) {
    return false
  }

  if (self.props.contributionId == null) {
    const title = self.props.contributionForm.title
    const body = self.props.contributionTalk
    if (title == "" && JSON.stringify(body) == "[]") {
      return false
    }
  } else if (!checkDiff()) {
    return false
  }

  return true
}

window.onbeforeunload = function() {
  const hash = location.pathname
  if (checkContributionEdit(hash)) {
    return true
  }
}

type Data = {
  userContributionId: number,
  title: string,
  tag: string,
  body: string,
  viewStatus: number
}

type Props = {
  changeTitle: (title: string) => void,
  changeHeight: (innerHeight: number) => void,
  changeTag: () => void,
  setViewStatus: () => void,
  contributionForm: ContributionForm,
  contributionEdit: ContributionEdit,
  contributionId: number,
  contributionTalk: ContributionTalk,
  title: string,
  new: Data => void,
  save: (val1: Data, val2: Data) => void,
  addTag: ({ userContributionId: number, name: string }) => void,
  deleteTag: ({ userContributionId: number, id: number }) => void,
  alertMessage: (mes: string) => void,
  alertMessageInit: () => void,
  addSound: ({ userContributionId: number }) => void,
  openHelp: () => void,
  closeHelp: () => void,
  message: (message: string, type: string) => void,
  sound: {
    character: number
  },
  soundlength: () => void
}

export default class Header extends Component {
  componentWillMount() {
    this.props.alertMessageInit()

    self = this
    if (this.props.title != "") {
      this.props.changeTitle(this.props.title)
    }

    this.props.changeHeight(window.innerHeight)

    this.props.closeHelp()

    this.props.soundlength()
  }
  /**
   * Execute after description update
   */
  componentDidUpdate() {
    // Scroll down
    if (this.props.contributionForm.boardScroll) {
      this.setScroll()
    }
  }
  props: Props
  preview: Object
  /**
   * Set Scroll
   */
  setScroll() {
    if (this.props.contributionTalk.length > 0) {
      const node = this.preview
      node.scrollTop = node.scrollHeight
    }
  }
  /**
   * Save
   */
  save() {
    const { title, tag, viewStatus, experience } = this.props.contributionForm
    if (experience) {
      return
    }

    const contributionId = this.props.contributionId
    const body = this.props.contributionTalk
    const action = {
      userContributionId: contributionId,
      title: title.trim(),
      tag: contributionId == null ? tag.trim() : "",
      body: JSON.stringify(body),
      viewStatus
    }

    if (action.title == "") {
      this.props.alertMessage("Please enter a title")
      return
    } else if (action.title.length > 100) {
      this.props.alertMessage(`Title exceeds 100 characters。(${action.title.length}character)`)
      return
    } else if (action.body == "[]") {
      this.props.alertMessage("Please enter the text")
      return
    } else if (action.tag.split(" ").length > 10) {
      this.props.alertMessage("Tag registration is up to 10")
      return
    }

    this.props.message("Saved", "success")

    if (this.props.contributionEdit.saveData.viewStatus == viewStatus) {
      if (!checkDiff()) {
        return
      }
    }

    if (contributionId == null) {
      this.props.new(action)
    } else {
      this.props.save(action, action)
    }
  }
  /**
   * Add tag
   */
  addTag(name: Object) {
    const tag = name.trim()
    if (tag.length > 20) {
      this.props.alertMessage("Tag is up to 20 characters")
      return
    }

    this.props.addTag({
      userContributionId: this.props.contributionId,
      name: tag
    })
  }
  /**
   * Delete tag
   */
  deleteTag(id: number) {
    this.props.deleteTag({
      userContributionId: this.props.contributionId,
      id
    })
  }
  /**
   * Get board style
   *
   * @return {object} style
   */
  getBoardStyle() {
    const height = this.props.contributionForm.height - 480

    return {
      height: `${height}px`
    }
  }
  /**
   * Add audio
   */
  addSound() {
    this.props.addSound({ userContributionId: this.props.contributionId })
  }
  /**
   * draw
   */
  render() {
    const { help, title, viewStatus, experience } = this.props.contributionForm

    const length = this.props.contributionTalk.map(function(item) {
      const { body, talkType } = item
      if (talkType == TALK_TYPE_IMAGE) {
        return 0
      }
      return body.length
    })
    const sum = length.reduce((a, x) => (a += x), 0)

    return (
      <div>
        <MessageSow />
        <Guide open={help} onHide={this.props.closeHelp} />
        <ListGroup className={group}>
          <ListGroupItem>
            <AlertMessage />
            <NewTitleInput
              defaultValue={title}
              onTitle={this.props.changeTitle.bind(this)}
            />
            <Tags
              contributionId={this.props.contributionId}
              tags={this.props.contributionForm.tags}
              add={this.addTag.bind(this)}
              remove={this.deleteTag.bind(this)}
              change={this.props.changeTag.bind(this)}
            />
            <div>
              <Status
                viewStatus={viewStatus}
                disabled={experience}
                onChageStatus={this.props.setViewStatus.bind(this)}
                onPublic={this.save.bind(this)}
                onPrivate={this.save.bind(this)}
              />
              <Sound
                contributionId={this.props.contributionId}
                created={this.props.contributionEdit.sound}
                addSound={this.addSound.bind(this)}
                experience={experience}
              />
              <Timer
                className={timer}
                timer={formatTime(Math.ceil(sum * this.props.sound.character))}
              />
            </div>
          </ListGroupItem>
          <ListGroupItem>
            <Button
              bsSize="small"
              bsStyle="info"
              className={tip}
              onClick={() => this.props.openHelp()}
            >
              <Glyphicon glyph="info-sign" />&nbsp;Hint
            </Button>
            <div
              className={preview}
              ref={input => {
                this.preview = input
              }}
              style={this.getBoardStyle()}
            >
              <TalkBoard talkList={this.props.contributionTalk} />
            </div>
          </ListGroupItem>
          <ListGroupItem bsClass={item}>
            <footer>
              <FormMain contributionId={this.props.contributionId} />
            </footer>
          </ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}
