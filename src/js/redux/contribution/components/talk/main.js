// @flow
import React, { Component } from "react"
import { TALK_TYPE_IMAGE } from "../../actions/talk"
import { UPLOAD_FILE_SIZE_MAX } from "../../../../constants/common"
import { line } from "./../../../../../css/common.css"
import {
  Balloon,
  EditImage,
  EditText
} from "./../../../../component/contribution/balloon/"
import type { State as ContributionEdit } from "./../../reducers/edit"

type Props = {
  talk: {
    priority: number,
    body: string,
    character: Object,
    directionType: number,
    talkType: number
  },
  editMode: boolean,
  deleteBody: (priority: number) => void,
  setEditBody: (
    priority: number,
    body: string,
    character: Object,
    directionType: number,
    talkType: number
  ) => void,
  contributionEdit: ContributionEdit,
  alertMessage: (message: string) => void,
  upload: (urlParam: string, formData: any, params: any) => void
}

export default class Talk extends Component {
  props: Props
  /**
   *Monitor changes in Image specification
   *
   * @param  {object} e Event object
   */
  handleChangeFile(e: Object) {
    const files = e.target.files

    if (files.length == 0) {
      return
    }

    if (files[0].size > UPLOAD_FILE_SIZE_MAX) {
      this.props.alertMessage("Upload failure! You have exceeded the maximum capacity you can upload! ! (The image is up to 600kB)")
      return
    }

    this.uploadFile([files[0]])
  }
  /**
   * Upload files
   *
   * @param  {array} files File list
   */
  uploadFile(files: Array<*>) {
    const formData = new FormData()
    formData.append("file", files[0])

    let contributionId = this.props.contributionEdit.id
    if (contributionId == null) {
      contributionId = 0
    }

    this.props.upload(`?id=${contributionId}`, formData, this.props.talk)
  }
  /**
   * Delete the text
   *
   * @param  {number} priority priority
   */
  deleteBody(priority: number) {
    this.props.deleteBody(priority)
  }
  /**
   * Make the text Edit Setting
   *
   * @param  {object} talk conversation
   */
  setEditBody(talk: {
    priority: number,
    body: string,
    character: Object,
    directionType: number,
    talkType: number
  }) {
    this.props.setEditBody(
      talk.priority,
      talk.body,
      talk.character,
      talk.directionType,
      talk.talkType
    )
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    const { character, talkType, body, priority } = this.props.talk

    if (!this.props.editMode) {
      return (
        <div>
          <Balloon
            userFileName={character.fileName}
            type={talkType}
            talk={body}
          />
          <hr className={line} />
        </div>
      )
    }

    if (talkType == TALK_TYPE_IMAGE) {
      return (
        <div>
          <EditImage
            userFileName={this.props.talk.character.fileName}
            type={talkType}
            talk={body}
            priority={priority}
            onChangeImage={this.handleChangeFile.bind(this)}
            onDelete={this.deleteBody.bind(this)}
          />
          <hr className={line} />
        </div>
      )
    }

    return (
      <div>
        <EditText
          userFileName={character.fileName}
          type={talkType}
          talk={body}
          item={this.props.talk}
          priority={priority}
          onChangeText={this.setEditBody.bind(this)}
          onDelete={this.deleteBody.bind(this)}
        />
        <hr className={line} />
      </div>
    )
  }
}
