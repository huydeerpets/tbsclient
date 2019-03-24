// @flow
import React from "react"
import { Grid, Row, Col, Glyphicon } from "react-bootstrap"
import styles from "./styles.css"

export default () =>
  <Grid>
    <Row>
      <Col sm={6} md={3}>
        <Glyphicon glyph="list-alt" className={styles.icon} />
        <br />
        <br />
        <p>Article</p>
        <div>You can post an article. There are functions such as image posting and tag registration</div>
      </Col>
      <Col sm={6} md={3}>
        <Glyphicon glyph="user" className={styles.icon} />
        <Glyphicon glyph="comment" className={styles.icon} />
        <br />
        <br />
        <p>会話形式</p>
        <div>You can post conversational articles by uploading icon images</div>
      </Col>
      <Col sm={6} md={3}>
        <Glyphicon glyph="headphones" className={styles.icon} />
        <br />
        <br />
        <p>Audio file generation</p>
        <div>You can create a voice-to-speech file from the created article and publish it</div>
      </Col>
      <Col sm={6} md={3}>
        <Glyphicon glyph="globe" className={styles.icon} />
        <br />
        <br />
        <p>Open Source</p>
        <div>This service is an open source project. All source code is public. Specifically from the link below</div>
      </Col>
    </Row>
  </Grid>
