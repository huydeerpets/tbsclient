// @flow
import React, { Component } from "react"
import HTML5Backend from "react-dnd-html5-backend"
import { DragDropContext } from "react-dnd"
import Item from "./item"

let self

type Props = {
  setTalkList: (talks: Object) => void,
  talkList: Object
}

class Board extends Component {
  componentWillMount() {
    self = this
  }
  props: Props
  /**
   * I moved an item
   *
   * @param  {number} priority priority
   * @param  {number} afterPriority Priority after move
   */
  handleMoveItem(priority, afterPriority) {
    const talkList = self.props.talkList.concat()
    let beforeTalk, afterTalk

    talkList.map(talk => {
      if (talk.priority == priority) {
        beforeTalk = talk
      }
      if (talk.priority == afterPriority) {
        afterTalk = talk
      }
    })

    const beforeIndex = talkList.indexOf(beforeTalk)
    const afterIndex = talkList.indexOf(afterTalk)

    talkList[beforeIndex] = afterTalk
    talkList[afterIndex] = beforeTalk

    self.props.setTalkList(talkList)
  }
  /**
   * draw
   *
   * @return {object} html
  */
  render() {
    if (!Array.isArray(this.props.talkList)) {
      return <div />
    }

    return (
      <div>
        {this.props.talkList.map(talk =>
          <Item
            key={talk.priority}
            priority={talk.priority}
            talk={talk}
            moveItem={this.handleMoveItem}
          />
        )}
      </div>
    )
  }
}

// Make App Component a Drag & Drop Context
export default DragDropContext(HTML5Backend)(Board)
