// @flow
import React, { Component } from "react"
import FormHeader from "../containers/form/header"
import type { State as ContributionEdit } from "../reducers/edit"
import type { State as ContributionTalk } from "../reducers/talk"

type Props = {
  match: {
    params: {
      id: number
    }
  },
  contributionEdit: ContributionEdit,
  contributionTalk: ContributionTalk,
  getDetail: (id: number) => void,
  setCharacterImageList: () => void
}

export default class Edit extends Component {
  componentWillMount() {
    this.edit(this.props.match.params.id)
  }
  props: Props
  /**
   * To edit
   *
   * @param  {number} idPostID
   */
  edit(id: number) {
    this.props.getDetail(id)
    this.props.setCharacterImageList()
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    const { title, viewStatus, id, sound } = this.props.contributionEdit

    return (
      <FormHeader
        title={title}
        viewStatus={viewStatus}
        contributionId={id}
        contributionTalk={this.props.contributionTalk}
        sound={sound}
      />
    )
  }
}
