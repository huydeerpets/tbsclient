// @flow
import React, { Component } from "react"
import { FormControl, Button, InputGroup } from "react-bootstrap"
import styles from "./styles.css"

type Props = {
  onAdd: (label: string) => void
}

export default class AddInput extends Component {
  props: Props

  label: {
    value: string
  }

  addTag() {
    this.props.onAdd(this.label.value)

    this.label.value = ""
  }

  render() {
    return (
      <InputGroup className={styles.addInput}>
        <FormControl
          label="Tag"
          type="tag"
          placeholder="Add tags"
          inputRef={ref => {
            this.label = ref
          }}
        />
        <InputGroup.Button>
          <Button onClick={() => this.addTag()}>Add To</Button>
        </InputGroup.Button>
      </InputGroup>
    )
  }
}
