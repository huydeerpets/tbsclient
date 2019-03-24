// @flow
import React, { Component } from "react"
import Dropzone from "react-dropzone"
import {
  PageHeader,
  Glyphicon,
  ListGroup,
  ListGroupItem,
  Well
} from "react-bootstrap"
import { Collection } from "../../../component/slick/"
import AlertMessage from "../../error/containers/alertMessage"
import {
  UPLOAD_FILE_SIZE_MAX,
  VOICE_TYPE,
  VOICE_TYPE_MAP
} from "../../../constants/common"
import { Link as Footer } from "../../../component/footer/"
import { ImageUpload } from "../../../../css/character.css"
import { NoIcon, Menu } from "../../../component/character/"
import type { State as CharacterList } from "../reducers/list"

type Props = {
  characterList: CharacterList,
  setIcon: (iconId: number) => void,
  getList: () => void,
  delete: () => void,
  upload: (formData: any) => void,
  save: ({ id: number, voiceType: number }) => void,
  init: () => void,
  alertMessage: (msg: string) => void,
  alertMessageInit: () => void,
  setVoiceType: () => void
}

export default class List extends Component {
  componentWillMount() {
    this.props.init()

    this.props.alertMessageInit()
    this.props.getList()
  }
  props: Props
  /**
   *Monitor Image Drop
   */
  handleDropFile(files: Array<*>) {
    this.uploadFile(files)
  }
  /**
   * Upload files
   */
  uploadFile(files: Array<*>) {
    const formData: FormData = new FormData()

    formData.append("file", files[0])

    if (files[0].size > UPLOAD_FILE_SIZE_MAX) {
      this.props.alertMessage("Upload failure! You have exceeded the maximum capacity you can upload! !")
      return
    }

    this.props.upload(formData)
  }
  /**
   * Choose a character
   */
  selectmCharacter(icon: { id: number }) {
    this.props.setIcon(icon.id)
  }
  /**
   * Save
   */
  save() {
    const { icon, voiceType } = this.props.characterList

    this.props.save({
      id: icon.id,
      voiceType: voiceType[icon.id]
    })
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    const { load, icon, defaultIcon, list } = this.props.characterList

    if (!load) {
      return <div />
    }

    const voiceType = this.props.characterList.voiceType[icon.id]

    return (
      <div>
        <div className="container">
          <PageHeader>
            <Glyphicon glyph="picture" />&nbsp;アイコンSetting
          </PageHeader>
          <ListGroup>
            <ListGroupItem>
              <AlertMessage />
              <div>
                {(() => {
                  if (defaultIcon) {
                    return <NoIcon />
                  }
                  return (
                    <Menu
                      fileName={icon.fileName}
                      iconId={icon.id}
                      voiceList={VOICE_TYPE}
                      voiceType={voiceType}
                      voiceLabel={VOICE_TYPE_MAP[voiceType]}
                      onSave={this.save.bind(this)}
                      onDelete={this.props.delete.bind(this)}
                      onVoiceType={this.props.setVoiceType.bind(this)}
                    />
                  )
                })()}
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <div>
                <Well bsStyle="info">
                  <Collection
                    list={list}
                    onClick={id => this.selectmCharacter(id)}
                  />
                </Well>
              </div>
            </ListGroupItem>
            <ListGroupItem>
              <Dropzone
                accept="image/jpeg,image/png,image/jpg"
                onDrop={this.handleDropFile.bind(this)}
                className={ImageUpload}
              >
                <div>
                Click to specify an image file, or drag and drop an image file
                  <br />
                  <br />
                  <p>Format: png/jpeg/jpg</p>
                  <p>Up to 600kB</p>
                </div>
              </Dropzone>
            </ListGroupItem>
          </ListGroup>
        </div>
        <Footer />
      </div>
    )
  }
}
