// @flow
import React from "react"
import { shallow } from "enzyme"
import Thumbnail from "./thumbnail"

function setup(search, viewStatus, onSearch, movieId) {
  const props = {
    followCount: 1,
    id: 1,
    movie: {
      movie_id: movieId,
      movie_status: 1
    },
    search: search,
    searchMatch: "test",
    soundStatus: 0,
    tags: [
      {
        id: 1,
        name: "tag1",
        userContributionID: 2
      }
    ],
    title: "abc",
    user: {
      id: 1,
      name: "name",
      profileImageID: 0
    },
    updatedAt: "2015-01-01T07:12:00+09:00",
    viewStatus: viewStatus,
    onSearch
  }

  const enzymeWrapper = shallow(<Thumbnail {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe("components/thumbnail/thumbnail", () => {
  it("Public-search available", () => {
    setup(
      "abctestedfgtuk\njshajkhfkznfklj\njdhjksdhjdklh",
      1,
      jest.fn(),
      "test"
    )
  })

  it("Citation of long sentences", () => {
    setup(
      "abctehgjgnklnkngghjgjhgjghtestghvhgjhgstedfgtuk\njshajkhkjgikgkjhkhjkbbkbfkznfklj\njdhjkghjghghjghjgbbnvhvhvjhvjhvjvhvhvsdhjdklh",
      1,
      jest.fn(),
      "test"
    )
  })

  it("Public-Video private", () => {
    setup("", 1, undefined, "test")
  })

  it("Public-no search", () => {
    setup("", 1, jest.fn(), "")
  })

  it("Private", () => {
    setup("", 0, jest.fn(), "")
  })
})
