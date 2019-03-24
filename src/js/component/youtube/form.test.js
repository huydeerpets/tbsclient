// @flow
import React from "react"
import { shallow } from "enzyme"
import { Form } from "./"
/* eslint-disable import/named */
// $FlowFixMe
import { __RewireAPI__ } from "./form"

function setup(params: Object) {
  const props = {
    videoId: params.videoId
  }

  const enzymeWrapper = shallow(<Form {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("components/youtube/form", () => {
  it("videoId Is empty", () => {
    setup({
      videoId: ""
    })
  })

  it("Display", () => {
    setup({
      videoId: "abc"
    })
  })

  it("no target", () => {
    const enzymeWrapper = shallow(<Form videoId="123" />)
    const instance: Object = enzymeWrapper.instance()

    instance.play()
  })

  it("control", () => {
    const enzymeWrapper = shallow(<Form videoId="123" />)
    const instance: Object = enzymeWrapper.instance()
    __RewireAPI__.__set__("target", {
      playVideo() {},
      pauseVideo() {}
    })

    instance.play()
    instance.pause()
    instance.onReady({
      target: {}
    })
    instance.onEnd()
    instance.onScreen()
    instance.offScreen()
  })
})
