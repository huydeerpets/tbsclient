// @flow
import React from "react"
import { shallow } from "enzyme"
import Image from "./image"

function setup() {
  const props = {
    fileName: "0.png"
  }

  const enzymeWrapper = shallow(<Image {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("component/contribution/balloon/image", () => {
  it("Display", () => {
    setup()
  })
})
