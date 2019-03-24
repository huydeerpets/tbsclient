// @flow
import React, { Component } from "react"
import { Well } from "react-bootstrap"
import { TALK_TYPE_TEXT, TALK_TYPE_IMAGE } from "../../actions/talk"
import { UPLOAD_FILE_SIZE_MAX } from "../../../../constants/common"
import {
  Action as FromAction,
  Text
} from "../../../../component/contribution/form/"
import { Collection } from "../../../../component/slick/"
import type { State as CharacterList } from "../../../character/reducers/list"
import type { State as ContributionForm } from "../../reducers/form"
import { defaultIcon, talk } from "./styles.css"

let self

window.addEventListener("keydown", event => {
  if (self == undefined) {
    return
  }

  if (!event.shiftKey) {
    return
  }

  if (event.keyCode == 91) {
    self.addBodyText()
  }

  if (event.keyCode == 13) {
    self.refs.body.focus()
  }

  if (event.keyCode == 73) {
    self.refs.file.click()
  }
})

type Props = {
  changeBody: (vol: string) => void,
  addBody: (
    body: string,
    character: Object,
    directionType: number,
    talkType: number
  ) => void,
  changeCharacter: (id: number) => void,
  contributionForm: ContributionForm,
  characterList: CharacterList,
  editBody: (
    body: string,
    character: Object,
    directionType: number,
    priority: number
  ) => void,
  upload: (urlParam: string, formData: any, params: any) => void,
  contributionId: number,
  alertMessage: (message: string) => void,
  cancelEdit: () => void
}

export default class Main extends Component {
  componentWillMount() {
    self = this
  }
  changeBody(value: string) {
    this.props.changeBody(value)
  }
  props: Props
  /**
   * Add text body
   */
  addBodyText() {
    const input = this.props.contributionForm.body
    if (input.value == "") {
      return
    }
    const body = input.trim()

    if (!body) {
      return
    }

    if (body.length > 256) {
      this.props.alertMessage("You have exceeded the maximum number of characters! (Up to 256 characters)")
      return
    }

    if (this.props.contributionForm.edit) {
      // Use this if editing
      return this.props.editBody(
        body,
        this.props.contributionForm.character,
        this.props.contributionForm.directionType,
        Number(this.props.contributionForm.priority)
      )
    }

    this.addBody(
      body,
      this.props.contributionForm.character,
      this.props.contributionForm.directionType,
      TALK_TYPE_TEXT
    )
  }
  /**
   * Add text
   */
  addBody(
    body: string,
    character: Object,
    directionType: number,
    talkType: number
  ) {
    return this.props.addBody(body, character, directionType, talkType)
  }
  /**
   *Monitor changes in Image specification
   *
   * @param  {object} e Event object
   */
  handleChangeFile(e: Object) {
    const fileList = e.target.files

    if (fileList.length == 0) {
      return
    }

    if (fileList[0].size > UPLOAD_FILE_SIZE_MAX) {
      this.props.alertMessage("Upload failure! You have exceeded the maximum capacity you can upload! ! (The image is up to 600kB)")
      return
    }

    this.uploadFile([fileList[0]])
  }
  /**
   *Monitor Image Drop
   *
   * @param  {array} files File list
   */
  handleDropFile(files: Array<*>) {
    this.uploadFile(files)
  }
  /**
   * Upload files
   *
   * @param  {array} files File list
   */
  uploadFile(files: Array<*>) {
    const formData = new FormData()
    formData.append("file", files[0])

    let contributionId = this.props.contributionId
    if (contributionId == null) {
      contributionId = 0
    }

    this.props.upload(`?id=${contributionId}`, formData, {
      character: this.props.contributionForm.character,
      directionType: this.props.contributionForm.directionType,
      talkType: TALK_TYPE_IMAGE
    })
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    return (
      <div>
        <div>
          {(() => {
            if (this.props.characterList.defaultIcon) {
              return <div className={defaultIcon}>Showing default icon ...</div>
            }
          })()}
          <Well bsStyle="info" className={talk}>
            <Collection
              list={this.props.characterList.list}
              onClick={id => this.props.changeCharacter(id)}
            />
          </Well>
        </div>
        <FromAction
          disabled={this.props.contributionForm.experience}
          onAdd={this.addBodyText.bind(this)}
          onUpload={this.handleChangeFile.bind(this)}
          cancel={this.props.contributionForm.edit}
          onCancel={this.props.cancelEdit.bind(this)}
        />
        <Text
          edit={this.props.contributionForm.edit}
          body={this.props.contributionForm.body}
          onChange={this.changeBody.bind(this)}
        />
      </div>
    )
  }
}
