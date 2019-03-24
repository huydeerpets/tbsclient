// @flow
import React from "react"
import { Play, Pause, Finished } from "./"

export const PLAY = 1
export const PAUSE = 2
export const FINISHED = 3

type Props = {
  status: number,
  onPlay: Function,
  onPause: Function
}

function player(status: number, onPlay: Function, onPause: Function) {
  if (status == PLAY) {
    return <Play label="　Playing aloud the article" onPause={onPause} />
  } else if (status == PAUSE) {
    return <Pause label="　Play aloud the article" onPlay={onPlay} />
  }

  return <Finished label="　Playing aloud the article" onPlay={onPlay} />
}

export default ({ status, onPlay, onPause }: Props) =>
  player(status, onPlay, onPause)
