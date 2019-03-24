/** Maximum file size for upload*/
export const UPLOAD_FILE_SIZE_MAX = 600000

/** Password minimum length*/
export const PASSWORD_LENGTH_MIN = 8

/** Voice type*/
export const VOICE_TYPE = [
  {
    type: 1,
    name: "Female voice-normal(mei_normal)"
  },
  {
    type: 2,
    name: "Female voice-angry(mei_angry)"
  },
  {
    type: 3,
    name: "Female voice-embarrassing(mei_bashful)"
  },
  {
    type: 4,
    name: "Female voice-I'm happy(mei_happy)"
  },
  {
    type: 5,
    name: "Female voice-sad(mei_sad)"
  },
  {
    type: 6,
    name: "Male voice-normal(m100)"
  },
  {
    type: 7,
    name: "Slow-Normal(AquesTalk)"
  }
]

/** Voice type map*/
export const VOICE_TYPE_MAP = {
  0: "Female voice-normal(mei_normal)",
  1: "Female voice-normal(mei_normal)",
  2: "Female voice-angry(mei_angry)",
  3: "Female voice-embarrassing(mei_bashful)",
  4: "Female voice-I'm happy(mei_happy)",
  5: "Female voice-sad(mei_sad)",
  6: "Male voice-normal(m100)",
  7: "Slow-Normal(AquesTalk)"
}
