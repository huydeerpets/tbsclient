import { abridgement, DateFormat, DateTimeFormat, formatTime } from "./common"

describe("UtilsCommon", () => {
  describe("DateFormat", () => {
    it("Get the date of shaping", () => {
      const result = DateFormat("2012-01-01")

      expect(result).toEqual("2012/01/01")
    })
  })

  describe("DateFormat", () => {
    it("Get the formatted date and time", () => {
      const result = DateTimeFormat("2012-01-01 10:00")

      expect(result).toEqual("2012年01月01日 10:00:00")
    })
  })

  describe("abridgement", () => {
    it("Do not omit", () => {
      const result = abridgement("AIUEO", 5)

      expect(result).toEqual("AIUEO")
    })
  })

  describe("formatTime", () => {
    it("Less than 60 seconds", () => {
      const result = formatTime(30)

      expect(result).toEqual("00分30秒")
    })

    it("60 seconds or more", () => {
      const result = formatTime(150)

      expect(result).toEqual("02分30秒")
    })
  })
})
