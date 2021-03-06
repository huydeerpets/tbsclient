// @flow
import React, { Component } from "react"
import { PageHeader, Glyphicon } from "react-bootstrap"
import { List } from "../../../component/contribution/list"
import { Center } from "./../../../../css/common.css"
import Pagination from "../../../utils/parts/pagination"
import { Link as Footer } from "../../../component/footer/"
import type { State as UserFollowList } from "../reducers/followList"

type Props = {
  match: {
    params: {
      page: string,
      order: string
    }
  },
  history: Array<string>,
  getList: ({ page: number, order: number, limit: number }) => void,
  paging: (page: number, order: number) => void,
  userFollowList: UserFollowList
}

export default class FollowList extends Component {
  componentWillMount() {
    const { page, order } = this.props.match.params
    this.getList(Number(page), Number(order))
  }
  props: Props
  /**
   * Get list
   *
   * @param {number} page page
   * @param {number} order Order
   */
  getList(page: number, order: number) {
    const { limit } = this.props.userFollowList
    this.props.getList({
      order,
      page,
      limit
    })
  }
  /**
   * Paging
   *
   * @param {number} page page
   * @param {number} order Order
   */
  paging(page: number, order: number) {
    this.getList(page, order)
    this.props.paging(page, order)
    this.props.history.push(`/user/followList/${order}/${page}`)
  }
  /**
   * draw
   *
   * @return {object} html
   */
  render() {
    const { count, limit, order } = this.props.userFollowList
    let list = this.props.userFollowList.list
    if (!Array.isArray(list)) {
      list = []
    }

    let page = ""
    if (list.length == 0) {
      page = <div className={Center}>There is no registration for FollowPosted.</div>
    } else {
      page = (
        <Pagination
          count={count}
          limit={limit}
          link="user/followList"
          order={parseInt(order)}
          activePage={parseInt(this.props.userFollowList.page)}
          paging={this.paging.bind(this)}
        />
      )
    }

    return (
      <div>
        <div className="container">
          <PageHeader>
            &nbsp;&nbsp;<Glyphicon glyph="thumbs-up" />&nbsp;Follow Posted
          </PageHeader>
        </div>
        <div className="container">
          <List list={list} />
        </div>
        {page}
        <Footer />
      </div>
    )
  }
}
