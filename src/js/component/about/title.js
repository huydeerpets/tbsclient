// @flow
import React from "react"
import type { Children } from "react"
import { Jumbotron, Image } from "react-bootstrap"
import { getStaticUrl } from "../../utils/common"
import styles from "./styles.css"

type Props = {
  children?: Children
}

export default ({ children }: Props) =>
  <Jumbotron className={styles.title}>
    <div>
      <Image src={`${getStaticUrl()}common/about.png`} rounded />
    </div>
    <h3>It is a web service that shares knowledge interactively</h3>
    {children}
  </Jumbotron>
