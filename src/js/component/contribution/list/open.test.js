// @flow
import React from "react"
import { shallow } from "enzyme"
import Open from "./open"

function setup() {
  const props = {
    id: 1,
    onDelete: jest.fn()
  }

  const enzymeWrapper = shallow(<Open {...props}>本文</Open>)

  return {
    props,
    enzymeWrapper
  }
}

describe("components/contribution/list/open", () => {
  it("Display", () => {
    setup()
  })

  it("on delete click", () => {
    const { props, enzymeWrapper } = setup()

    enzymeWrapper.find("Button").simulate("click")
    expect(props.onDelete).toHaveBeenCalled()
  })

  it("on delete doubleclick", () => {
    const { props, enzymeWrapper } = setup()

    enzymeWrapper.simulate("doubleclick")
    expect(props.onDelete).toHaveBeenCalled()
  })
})
