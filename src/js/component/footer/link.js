// @flow
import React from "react"
import { Breadcrumb } from "react-bootstrap"
import { getTopUrl } from "../../utils/common"
import styles from "./styles.css"

export default () =>
  <footer className={styles.footer}>
    <Breadcrumb>
      <Breadcrumb.Item href={getTopUrl()}>Home</Breadcrumb.Item>
      <Breadcrumb.Item href={`${getTopUrl()}question`}>Inquiry</Breadcrumb.Item>
      <Breadcrumb.Item href={`${getTopUrl()}about`}>What is tbs</Breadcrumb.Item>
      <Breadcrumb.Item href={`${getTopUrl()}information/terms`}>
      Terms of service
      </Breadcrumb.Item>
      <Breadcrumb.Item
        href="http://thebigsale.com.au/"
        target="_blank"
      >
        Blog
      </Breadcrumb.Item>
     
    </Breadcrumb>
  </footer>
