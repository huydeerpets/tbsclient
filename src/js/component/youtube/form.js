// @flow
import React, { Component } from "react"
import { Alert, Button, ButtonGroup } from "react-bootstrap"
import { PLAY, PAUSE, FINISHED } from "./player"
import { Player, ScreenButton, Video } from "./"

let target: Object

type State = {
  status: number,
  full?: boolean
}

type Props = {
  videoId: string,
  label?: Object
}

export default class Frame extends Component<*, Props, State> {
  constructor() {
    super()
  }
  props: Props
  state = {
    status: PAUSE,
    full: false
  }
  /**
   * Start
   */
  play() {
    if (target == undefined) {
      return
    }

    this.setState({ status: PLAY })
    target.playVideo()
  }
  /**
   * Stop
   */
  pause() {
    this.setState({ status: PAUSE })
    target.pauseVideo()
  }
  /**
   * prepare
   */
  onReady(event: Object) {
    target = event.target
  }
  /**
   * finish
   */
  onEnd() {
    this.setState({ status: FINISHED })
  }
  /**
   * Activate screen
   */
  onScreen() {
    this.setState({ full: true })
  }
  /**
   * Disable screen
   */
  offScreen() {
    this.setState({ full: false })
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    if (this.props.videoId == "") {
      return <Alert bsStyle="info">There is no video information</Alert>
    }

    const style = this.state.full ? { display: "block" } : { height: 0 }

    return (
      <Alert bsStyle="info">
        <ButtonGroup>
          <Player
            status={this.state.status}
            onPlay={this.play.bind(this)}
            onPause={this.pause.bind(this)}
          />
          <ScreenButton
            full={this.state.full}
            onFull={this.onScreen.bind(this)}
            onSmaill={this.offScreen.bind(this)}
          />
        </ButtonGroup>
        <div className="pull-right">
          <Button
            bsStyle="link"
            href={`https://youtu.be/${this.props.videoId}`}
            target="_blank"
          >
            View on YouTube
          </Button>
        </div>
        <div style={style}>
          <Video
            videoId={this.props.videoId}
            open={this.state.full}
            onReady={this.onReady.bind(this)}
            onEnd={this.onEnd.bind(this)}
          />
        </div>
      </Alert>
    )
  }
}
