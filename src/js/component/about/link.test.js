// @flow
import React from "react"
import { shallow } from "enzyme"
import { Link } from "./"

function setup() {
  const enzymeWrapper = shallow(<Link />)

  return {
    enzymeWrapper
  }
}

describe("component/about/link", () => {
  it("Display", () => {
    setup()
  })
})
