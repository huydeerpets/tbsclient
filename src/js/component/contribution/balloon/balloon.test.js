// @flow
import React from "react"
import { shallow } from "enzyme"
import Balloon from "./balloon"

function setup(params: Object) {
  const props = {
    userFileName: "0.png",
    type: params.type,
    talk: params.talk
  }

  const enzymeWrapper = shallow(<Balloon {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("component/contribution/balloon/balloon", () => {
  it("Text display", () => {
    setup({
      type: 1,
      talk: "abc"
    })
  })

  it("Image display", () => {
    setup({
      type: 2,
      talk: "0.png"
    })
  })
})
