// @flow
import React from "react"
import { shallow } from "enzyme"
import { Icon } from "./"

function setup(params) {
  const props = {
    id: params.id
  }

  const enzymeWrapper = shallow(<Icon {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("component/icon/icon", () => {
  it("Display", () => {
    setup({ id: 1 })
  })

  it("Default display", () => {
    setup({ id: 0 })
  })
})
