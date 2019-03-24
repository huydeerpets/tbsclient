import PropTypes from "prop-types"
import React, { Component } from "react"
import { DragSource, DropTarget } from "react-dnd"
import ContributionTalk from "../../containers/talk/main"

// Have the interface of the drag source
const itemSource = {
  beginDrag(props) {
    return { priority: props.priority }
  }
}

// Connect the source function of the drag and your own component
const collectSource = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

// Drag destination also prepares the connection of interface and component in the same way
const itemTarget = {
  hover(props, monitor) {
    const draggedPriority = monitor.getItem().priority

    if (draggedPriority != props.priority) {
      props.moveItem(draggedPriority, props.priority)
    }
  }
}

const collectTarget = function(connect) {
  return { connectDropTarget: connect.dropTarget() }
}

/* eslint-disable import/no-mutable-exports */
let Item = class Item extends Component {
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    // If you allow the entire drag operation
    return this.props.connectDragSource(
      this.props.connectDropTarget(
        <div>
          <ContributionTalk talk={this.props.talk} editMode />
        </div>
      )
    )
  }
}

Item.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  connectDragPreview: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  priority: PropTypes.any.isRequired,
  moveItem: PropTypes.func.isRequired,
  talk: PropTypes.object
}

// Add the drag and drop functionality to the `Item` component
Item = DropTarget("item", itemTarget, collectTarget)(Item)
Item = DragSource("item", itemSource, collectSource)(Item)

export default Item
