// @flow
import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Typeahead } from "react-bootstrap-typeahead"
import {
  Modal,
  Tabs,
  Tab,
  PageHeader,
  Glyphicon,
  Row,
  Col,
  Nav,
  NavItem,
  ButtonToolbar,
  Button
} from "react-bootstrap"
import ContributionShow from "../../contribution/containers/show"
import { DateTimeFormat } from "../../../utils/common"
import {
  VIEW_STATUS_PUBLIC,
  VIEW_STATUS_PRIVATE
} from "../../../constants/contribution"
import type { State as contributionShow } from "../../contribution/reducers/show"
import type { State as UserContributionList } from "../reducers/contributionList"

let load = false
let tite = ""

type Props = {
  getList: () => void,
  getDetail: (id: number) => void,
  delete: (id: number) => void,
  setContribution: (id: number) => void,
  contributionShow: contributionShow,
  userContributionList: UserContributionList,
  setTitleSearch: (list: Array<*>) => void,
  setViewStatus: (status: number) => void,
  init: () => void,
  closeDeleteConfirm: () => void,
  openDeleteConfirm: () => void
}

export default class ContributionList extends Component {
  componentWillMount() {
    this.props.init()
    this.getList()
  }
  componentWillUpdate() {
    const { contributionId } = this.props.userContributionList
    if (!load && contributionId != 0) {
      load = true
      this.setContribution(contributionId)
    }
  }
  props: Props
  /**
   * Get list
   */
  getList() {
    this.props.getList()
  }
  /**
   *Set Post
   *
   * @param  {number} idPostID
   */
  setContribution(id: number) {
    this.props.setContribution(id)
    this.props.getDetail(id)
  }
  /**
   * Delete works
   *
   * @param  {number} idPostID
   */
  deleteContribution(id: number) {
    this.props.delete(id)
  }
  /**
   * Get edit path
   *
   * @param  {number} idPostID
   * @return {string} Edit path
   */
  getEditPath(id: number) {
    return `/contribution/edit/${id}`
  }
  /**
   * Title Change
   *
   * @param  {string[]} text text
   */
  changeTitle(text: Array<string>) {
    this.searchTitle(text[0])
  }
  /**
   * Enter a title
   *
   * @param  {object} text text
   */
  inputTitle(text: Object) {
    this.searchTitle(text.target.value)
  }
  /**
   * Search for a title
   *
   * @param  {string} text text
   */
  searchTitle(text: string) {
    const { all, viewStatus } = this.props.userContributionList

    const list = []
    let count = 0
    const length = all.length
    tite = text

    all.forEach(item => {
      if (item.title.indexOf(text) != -1) {
        if (item.view_status == viewStatus) {
          list.push(item)
        }
      }

      count++
      if (count >= length) {
        this.props.setTitleSearch(list)
      }
    })
  }
  /**
   * Set the open state
   *
   * @param  {numbet} status State
   */
  setViewStatus(status: number) {
    this.props.setViewStatus(status)
    this.searchTitle(tite)
  }
  /**
   * Get delete confirmation
   */
  getDeleteConfirm() {
    const { deleteConfirm, contributionId } = this.props.userContributionList

    return (
      <Modal show={deleteConfirm} onHide={this.props.closeDeleteConfirm}>
        <Modal.Header closeButton>
          <Modal.Title>Post delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Remove Post Is it OK?
          <br />
          <br />
          <ButtonToolbar>
            <Button
              bsStyle="danger"
              onClick={() => this.deleteContribution(contributionId)}
            >
              Delete
            </Button>
            <Button onClick={() => this.props.closeDeleteConfirm()}>
            Cancel
            </Button>
          </ButtonToolbar>
        </Modal.Body>
      </Modal>
    )
  }

  /**
   * Get the operation
   */
  getControl() {
    const { contributionId } = this.props.userContributionList
    let disabled = false
    let text = ""
    if (contributionId == 0) {
      disabled = true
      text = " (※ not selected) "
    }

    return (
      <ButtonToolbar>
        <Link to={this.getEditPath(contributionId)}>
          <Button bsStyle="success" disabled={disabled}>
            <Glyphicon glyph="edit" />&nbsp;Edit
          </Button>
        </Link>
        <Button
          bsStyle="danger"
          onClick={() => this.props.openDeleteConfirm()}
          disabled={disabled}
        >
          <Glyphicon glyph="trash" />&nbsp;Delete
        </Button>
        {text}
      </ButtonToolbar>
    )
  }
  /**
   * draw
   */
  render() {
    const { contributionId, titles } = this.props.userContributionList

    let list = this.props.userContributionList.list
    if (!Array.isArray(list)) {
      list = []
    }

    let body = this.props.contributionShow.body
    if (!Array.isArray(body)) {
      body = []
    }

    let side
    if (list.length === 0) {
      side = <div>There were no matching posts.</div>
    } else {
      side = (
        <Nav bsStyle="pills" stacked>
          {list.map(item =>
            <NavItem key={item.id} eventKey={item.id}>
              <p>
                {item.title}
              </p>
              {DateTimeFormat(item.createdAt)}
            </NavItem>
          )}
        </Nav>
      )
    }

    let contribution = ""

    if (contributionId != 0) {
      contribution = (
        <div
          style={{
            zoom: "75%"
          }}
        >
          <ContributionShow
            params={{
              id: 0
            }}
          />
        </div>
      )
    }

    return (
      <div className="container">
        {this.getDeleteConfirm()}
        <PageHeader>
          <Glyphicon glyph="list-alt" />&nbsp;Post list
        </PageHeader>
        <Tab.Container
          id="left-tabs-example"
          onSelect={this.setContribution.bind(this)}
          activeKey={contributionId}
        >
          <Row>
            <Col sm={3}>
              <Tabs
                defaultActiveKey={VIEW_STATUS_PRIVATE}
                animation={false}
                id="noanim-tab"
                onSelect={this.setViewStatus.bind(this)}
              >
                <Tab eventKey={VIEW_STATUS_PRIVATE} title="draft" />
                <Tab eventKey={VIEW_STATUS_PUBLIC} title="Now open" />
              </Tabs>
              <Typeahead
                options={titles}
                maxVisible={2}
                placeholder="Title search"
                onChange={this.changeTitle.bind(this)}
                onBlur={this.inputTitle.bind(this)}
              />
              <br /> {side}
            </Col>
            <Col sm={8}>
              <div>{this.getControl()}</div>
              <hr /> {contribution}
            </Col>
          </Row>
        </Tab.Container>
      </div>
    )
  }
}
