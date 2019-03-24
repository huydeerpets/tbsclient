// @flow
import React from "react"
import { Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { abridgement } from "../../utils/common"

type Props = {
  name: string,
  logout: () => void
}

export default ({ name, logout }: Props) =>
  <Nav pullRight>
    <LinkContainer to="/contribution/new">
      <NavItem eventKey={1}>
        <Glyphicon glyph="edit" />&nbsp;Post
      </NavItem>
    </LinkContainer>
    <LinkContainer to="/user/contributionList">
      <NavItem eventKey={2}>
        <Glyphicon glyph="list-alt" />&nbsp;Post list
      </NavItem>
    </LinkContainer>
    <NavDropdown
      eventKey={3}
      title={abridgement(name, 12)}
      id="basic-nav-dropdown"
    >
      <LinkContainer to="/user/mypage">
        <MenuItem eventKey={3.1}>
          <Glyphicon glyph="user" />&nbsp;Profile Setting
        </MenuItem>
      </LinkContainer>
      <LinkContainer to="/character/list">
        <MenuItem eventKey={3.2}>
          <Glyphicon glyph="picture" />&nbsp;Icon Setting
        </MenuItem>
      </LinkContainer>
      <LinkContainer to="/user/followList/1/1">
        <MenuItem eventKey={3.3}>
          <Glyphicon glyph="thumbs-up" />&nbsp;Follow Posted
        </MenuItem>
      </LinkContainer>
      <LinkContainer to="/help">
        <MenuItem eventKey={3.4}>
          <Glyphicon glyph="question-sign" />&nbsp;help
        </MenuItem>
      </LinkContainer>
      <MenuItem divider />
      <MenuItem eventKey={3.4} onClick={() => logout()}>
        <Glyphicon glyph="log-out" />&nbsp;Logout
      </MenuItem>
    </NavDropdown>
  </Nav>
