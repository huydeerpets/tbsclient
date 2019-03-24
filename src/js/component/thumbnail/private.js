// @flow
import React from "react"
import { Media } from "react-bootstrap"
import Icon from "../icon/icon"
import { DateFormat } from "../../utils/common"
import styles from "./styles.css"

type Props = {
  title: string,
  updatedAt: string,
  user: Object
}

export default ({ title, updatedAt, user }: Props) =>
  <Media className={styles.Disable}>
    <Media.Left className={styles.Image} align="middle">
      <Icon id={user.profileImageID} />
    </Media.Left>
    <Media.Body className={styles.Body}>
      <p>
        {user.name}&nbsp;On {DateFormat(updatedAt)}Post to
      </p>
      <Media.Heading>
        <div>
          {title}
          <small>
            <span className={styles.Alert}> (※ This is a private post) </span>
          </small>
        </div>
      </Media.Heading>
    </Media.Body>
    <Media.Right className={styles.Follow} />
  </Media>
