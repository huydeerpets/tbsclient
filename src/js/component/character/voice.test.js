// @flow
import React from "react"
import { shallow } from "enzyme"
import { Voice } from "./"

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
    onVoiceType: jest.fn(),
    onSave: jest.fn()
  }

  const enzymeWrapper = shallow(<Voice {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("ccomponents/character/voice", () => {
  it("Display", () => {
    setup()
  })

  it("on click ", () => {
    const { props, enzymeWrapper } = setup()

    enzymeWrapper.find("Button").simulate("click")
    expect(props.onSave).toHaveBeenCalled()
  })
})
