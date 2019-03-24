// @flow
import React, { Component } from "react"
import {
  FormGroup,
  Form,
  FormControl,
  Glyphicon,
  Button,
  Col,
  DropdownButton,
  MenuItem
} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import Pagination from "../../../utils/parts/pagination"
import {
  ORDER_TYPE_NEW,
  ORDER_TYPE_FOLLOW_COUNT
} from "../../../constants/contribution"
import { Center } from "./../../../../css/common.css"
import { Link as Footer } from "../../../component/footer/"
import { List } from "../../../component/contribution/list"
import type { State as ContributionSearch } from "../reducers/search"

type Props = {
  match: {
    params: {
      search: string,
      order: string,
      page: string
    }
  },
  contributionSearch: ContributionSearch,
  search: ({
    search: string,
    order: number,
    page: number,
    limit: number
  }) => void,
  paging: (search: string, order: number, page: number) => void,
  setOrder: () => void
}

let tmpSearch = ""

export default class Search extends Component {
  input: {
    value: ""
  }
  componentWillMount() {
    const { search, order, page } = this.props.match.params

    this.search(search, Number(order), Number(page))
    this.props.paging(search, Number(order), Number(page))
  }
  props: Props
  /**
   * Send command
   *
   * @param  {object} e element
   */
  sendCommand(e: Object) {
    const ENTER = 13
    if (e.keyCode == ENTER) {
      this.setSearch()
    }
  }
  /**
   * Search for
   *
   * @param {string} search Search
   * @param {number} order Order
   * @param {number} page page
   */
  search(search: string, order: number, page: number) {
    const { limit } = this.props.contributionSearch

    this.props.search({
      search,
      order,
      page,
      limit
    })
  }
  /**
   * Set Search
   */
  setSearch() {
    const { order } = this.props.contributionSearch
    const val = this.input.value.trim()
    if (val == "") {
      return
    }
    if (val == tmpSearch) {
      return
    }

    this.search(val, order, 1)

    tmpSearch = val
  }
  /**
   * Page
   *
   * @param {number} page page
   * @param {number} order Order
   */
  paging(page: number, order: number) {
    const { search } = this.props.contributionSearch
    this.search(search, order, page)
    this.props.paging(search, order, page)
  }
  /**
   * Set the order
   *
   * @param {number} order Order
   */
  setOrder(order: number) {
    const { search, page } = this.props.contributionSearch
    this.search(search, order, page)
  }
  /**
   * Get list
   */
  getList() {
    const { search } = this.props.contributionSearch

    let list = this.props.contributionSearch.list
    if (!Array.isArray(list)) {
      list = []
    }

    if (list.length == 0) {
      return (
        <div className={Center}>
          「{search}」No matching articles were found.
        </div>
      )
    }

    return <List list={list} onSearch={this.search} />
  }
  /**
   * draw
   */
  render() {
    let list = this.props.contributionSearch.list
    const { count, limit, order, page, search } = this.props.contributionSearch

    if (!Array.isArray(list)) {
      list = []
    }

    let pagination = ""
    if (list.length > 0) {
      pagination = (
        <Pagination
          count={count}
          limit={limit}
          link="user/followList"
          order={parseInt(order)}
          activePage={parseInt(page)}
          paging={this.paging.bind(this)}
        />
      )
    }

    return (
      <div>
        <div className="container">
          <div>
            <br />
            <Form horizontal componentClass="div">
              <FormGroup>
                <Col sm={10}>
                  <FormControl
                    type="text"
                    placeholder="Search word"
                    defaultValue={this.props.match.params.search}
                    inputRef={ref => {
                      this.input = ref
                    }}
                    onKeyDown={this.sendCommand.bind(this)}
                  />
                </Col>
                <Col sm={2}>
                  <Button onClick={() => this.setSearch()}>
                    <Glyphicon glyph="search" />&nbsp;Search&nbsp;
                  </Button>
                </Col>
              </FormGroup>
              <FormGroup>
                <Col sm={10} />
                <Col sm={2}>
                  <DropdownButton
                    title={
                      order === ORDER_TYPE_FOLLOW_COUNT ? "Follow order": "New order"
                    }
                    id="search-order-dropdown"
                    pullRight
                    onSelect={this.setOrder.bind(this)}
                  >
                    <LinkContainer
                      to={`/contribution/search/${search}/${ORDER_TYPE_NEW}/${page}`}
                    >
                      <MenuItem eventKey={ORDER_TYPE_NEW}>New order</MenuItem>
                    </LinkContainer>
                    <LinkContainer
                      to={`/contribution/search/${search}/${ORDER_TYPE_FOLLOW_COUNT}/${page}`}
                    >
                      <MenuItem eventKey={ORDER_TYPE_FOLLOW_COUNT}>
                      Follow order
                      </MenuItem>
                    </LinkContainer>
                  </DropdownButton>
                </Col>
              </FormGroup>
            </Form>
          </div>
          <hr /> {this.getList()}
          {pagination}
        </div>
        <Footer />
      </div>
    )
  }
}
