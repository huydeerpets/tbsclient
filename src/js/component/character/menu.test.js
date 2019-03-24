// @flow
import React from "react"
import { shallow } from "enzyme"
import { Menu } from "./"

function setup() {
  const props = {
    voiceList: [
      {
        type: 1,
        name: "Voice 1"
      },
      {
        type: 2,
        name: "Voice 2"
      },
      {
        type: 3,
        name: "Voice 3"
      }
    ],
    voiceType: 1,
    voiceLabel: "voice1",
    fileName: "0.png",
    iconId: 1,
    onDelete: jest.fn(),
    onVoiceType: jest.fn(),
    onSave: jest.fn()
  }

  const enzymeWrapper = shallow(<Menu {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("ccomponents/character/menu", () => {
  it("Display", () => {
    setup()
  })
})
