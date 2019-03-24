// @flow
import React, { Component } from "react"
import {
  Table,
  Alert,
  Modal,
  ButtonToolbar,
  Well,
  FormGroup,
  Checkbox,
  Glyphicon,
  Button
} from "react-bootstrap"
import Sound from "../../../utils/sound"
import {
  STATUS_PUBLIC,
  STATUS_UPLOADING,
  STATUS_RUNNING
} from "../../../constants/contribution"
import { NoSpace } from "../../../../css/common.css"
import { getTopUrl } from "../../../utils/common"
import { Form } from "../../../component/youtube/"
import { Link } from "react-router-dom"
import type { State as SoundShow } from "../reducers/show"
import type { State as SoundMenu } from "../reducers/menu"

let self
window.document.getElementById("uploadToken").onchange = function() {
  if (self == undefined) {
    return false
  }

  self.props.message("Authentication successful. Start uploading YouTube", "success")
  self.uploadYoutube()
}

type Props = {
  soundShow: SoundShow,
  soundMenu: SoundMenu,
  userContributionId: number,
  make: (id: number) => void,
  makingMovie: () => void,
  message: (message: string, type: string) => void,
  reflect: ({ userContributionId: number, overwrite: boolean }) => void,
  open: () => void,
  close: () => void,
  uploading: () => void,
  openUpload: () => void,
  closeUpload: () => void,
  upload: (id: number) => void,
  openInformation: () => void,
  closeInformation: () => void
}

export default class Menu extends Component {
  componentWillMount() {
    self = this
  }
  props: Props
  overwrite: {
    checked: false
  }
  /**
   * reflect
   */
  reflect() {
    this.props.reflect({
      userContributionId: this.props.userContributionId,
      overwrite: this.overwrite.checked
    })

    this.props.message("I am reflecting the content of the article", "success")
  }
  /**
   * create
   */
  make() {
    this.props.makingMovie()
    this.props.close()
    this.props.make(this.props.userContributionId)
  }
  /**
     * [getReMakeConfirm description]
     * @return [type] [description]
     */
  getReMakeConfirm() {
    const { open } = this.props.soundMenu

    return (
      <Modal show={open} onHide={this.props.close} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Recreate the video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="danger">
            <strong>Note! !</strong>
            <br />
            It may take 10 minutes or more to create a movie
          </Alert>
          <div>Do you want to recreate the video file?</div>
          <br />
          <ButtonToolbar>
            <Button onClick={this.props.close}>Cancel</Button>
            &nbsp; &nbsp;
            <Button bsStyle="warning" onClick={() => this.make()}>
            Remake
            </Button>
          </ButtonToolbar>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }
  /**
   * Get Video Creator
   */
  getMakeMovie() {
    const { movieStatus, makeMovie } = this.props.soundShow
    if (movieStatus == STATUS_RUNNING) {
      return (
        <Button bsStyle="warning" active>
          Creating video ...
        </Button>
      )
    }

    if (movieStatus == STATUS_UPLOADING) {
      return (
        <Button bsStyle="warning" disabled>
          Create a video
        </Button>
      )
    }

    if (!makeMovie) {
      return (
        <Button bsStyle="warning" onClick={() => this.make()}>
          Create a video
        </Button>
      )
    }

    return (
      <Button bsStyle="warning" onClick={this.props.open}>
        Recreate the video
      </Button>
    )
  }
  /**
   * Upload
   */
  upload() {
    this.props.uploading()
    this.props.closeUpload()

    window.open(
      `${getTopUrl()}api/movies/connect/${this.props.userContributionId}`,
      "child",
      "width=500,height=250"
    )
  }

  /**
   * getUploadConfirm Get upload confirmation
   */
  getUploadConfirm() {
    const { openUpload } = this.props.soundMenu

    return (
      <Modal show={openUpload} onHide={this.props.closeUpload} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Upload video to YouTube</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Alert bsStyle="danger">
            <strong> Notice! ! Please check the following before performing this operation. </ strong>
            <br />
            ・ Upload may take 10 minutes or more. <br />
            ・ You need a Google account. <br />
            ・ You need to create YouTube My Channel in advance. <br />
            ・ Uploaded videos will be added to your own channel <br />
            ・ Please note that videos with too short playback time can not be uploaded <br />
            ・ Account upload is required to upload videos of 15 minutes or more to Youtube. Detail is,
            <a
              href="https://support.google.com/youtube/answer/71673?hl=ja"
              target="_blank"
              rel="noreferrer noopener"
            >
              Here
            </a>
          </Alert>
          <div>Do you want to upload videos to YouTube?</div>
          <br />
          <ButtonToolbar>
          <Button onClick = {this.props.closeUpload}> Cancel </ Button>
            &nbsp; &nbsp;
            <Button bsStyle = "danger" onClick = {this.upload.bind (this)}>
              Upload to YouTube
            </ Button>
          </ButtonToolbar>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    )
  }
  /**
   * Get uploaded to YouTube
   */
  getUploadYoutube() {
    const { makeMovie, movieStatus } = this.props.soundShow

    if (!makeMovie || movieStatus == STATUS_RUNNING) {
      return (
        <Button bsStyle="danger" disabled>
          Upload video to YouTube
        </Button>
      )
    }

    if (movieStatus == STATUS_UPLOADING) {
      return (
        <Button bsStyle="danger" active>
          Uploading videos to YouTube ...
        </Button>
      )
    }

    if (movieStatus == STATUS_PUBLIC) {
      return (
        <Button bsStyle="danger" disabled>
          Uploaded video to YouTube
        </Button>
      )
    }

    return (
      <Button bsStyle="danger" onClick={this.props.openUpload}>
        Upload video to YouTube
      </Button>
    )
  }
  /**
   * Upload to YouTube
   */
  uploadYoutube() {
    this.props.upload(this.props.userContributionId)
  }
  /**
   * Get information
   */
  getInformation() {
    let downloadMp3 = (
      <span>
        No file &nbsp;(
        <Button bsStyle="link" bsSize="small" onClick={() => this.make()}>
          Create
        </Button>
        )
      </span>
    )
    let downloadMp4 = (
      <span>
        No file &nbsp;(
        <Button bsStyle="link" bsSize="small" onClick={() => this.make()}>
        Create
        </Button>
        )
      </span>
    )
    const { making, information } = this.props.soundMenu
    const { makeMovie, movieID } = this.props.soundShow
    const { userContributionId } = this.props

    if (making) {
      downloadMp3 = <span>making...</span>
      downloadMp4 = <span>making...</span>
    }

    if (makeMovie) {
      downloadMp3 = (
        <Button
          bsStyle="success"
          bsSize="small"
          href={`${getTopUrl()}static/files/sound/${userContributionId}.mp3`}
          target="_blank"
        >
          Download
        </Button>
      )
      downloadMp4 = (
        <Button
          bsStyle="success"
          bsSize="small"
          href={`${getTopUrl()}static/files/movie/${userContributionId}.mp4`}
          target="_blank"
        >
          Download
        </Button>
      )
    }

    let upload = "Not uploaded"

    if (movieID != "") {
      upload = "Uploaded"
    }

    let message = ""
    if (information.message != "") {
      message = (
        <Alert bsStyle="success">
          <strong>Upload is complete!</strong>
          <br />
          <Button
            bsStyle="link"
            href="https://www.youtube.com/my_videos"
            target="_blank"
          >
            YouTube My Channel
          </Button>
        </Alert>
      )
    }

    return (
      <Modal
        show={information.show}
        onHide={this.props.closeInformation}
        bsSize="large"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Glyphicon glyph="info-sign" />&nbsp;Detailed information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          <Table responsive>
            <thead>
              <tr>
                <th>Voice</th>
                <th>Video</th>
                <th>YouTube</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {downloadMp3}
                </td>
                <td>
                  {downloadMp4}
                </td>
                <td>
                  {upload}
                </td>
              </tr>
            </tbody>
          </Table>
          <div>
            <strong>Video information</strong>
          </div>
          <Form videoId={movieID} screen />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeInformation}>Close up</Button>
        </Modal.Footer>
      </Modal>
    )
  }
  /**
   * draw
   */
  render() {
    let download = ""
    const { makeMovie } = this.props.soundShow
    const { userContributionId } = this.props
    if (makeMovie) {
      download = (
        <div className="pull-right">
          <Sound
            url={`${getTopUrl()}static/files/sound/${userContributionId}.mp3?=${+new Date().getTime()}`}
          />
        </div>
      )
    }

    return (
      <div>
        {this.getInformation()}
        {this.getUploadConfirm()}
        {this.getReMakeConfirm()}
        <div>
          <Well className={NoSpace}>
            <br />
            <FormGroup>
              &nbsp; &nbsp; &nbsp; &nbsp;
              <Button onClick={() => this.reflect()}>
                <Glyphicon glyph="refresh" />&nbsp;It reflects the content of the article
              </Button>
              &nbsp; &nbsp;
              <Checkbox
                inputRef={ref => {
                  this.overwrite = ref
                }}
                inline
              >
                Overwrite existing data and reflect
              </Checkbox>
            </FormGroup>
          </Well>
        </div>
        <div>
          <br />
          <ButtonToolbar>
            {download}
            &nbsp; &nbsp; {this.getMakeMovie()}
            &nbsp; &nbsp; {this.getUploadYoutube()}
            &nbsp; &nbsp;
            <Button onClick={() => this.props.openInformation()}>
              <Glyphicon glyph="info-sign" />&nbsp;Details
            </Button>
          </ButtonToolbar>
        </div>
        <br />
        <div className="pull-right">
          <Link to={`/contribution/edit/${userContributionId}`}>Return to post editing</Link>
          <br />
        </div>
      </div>
    )
  }
}
