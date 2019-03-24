// @flow
import React, { Component } from "react"
import { FormGroup, FormControl } from "react-bootstrap"

type Props = {
  onTag: (label: string) => void
}

export default class NewInput extends Component {
  props: Props

  label: {
    value: string
  }

  tag() {
    this.props.onTag(this.label.value)
  }

  render() {
    return (
      <FormGroup>
        <FormControl
          label="Tag"
          type="tag"
          placeholder="Enter up to 5 tags separated by spaces (example: Travel in the Universe 2001)"
          inputRef={ref => {
            this.label = ref
          }}
          onChange={() => this.tag()}
        />
      </FormGroup>
    )
  }
}
