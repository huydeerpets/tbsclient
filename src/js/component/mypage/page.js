// @flow
import React from "react"
import {
  Grid,
  Row,
  Col,
  PageHeader,
  Glyphicon,
  Panel,
  ControlLabel,
  Button
} from "react-bootstrap"
import { Menu, ProfileImage, UserName } from "./"
import styles from "./styles.css"

type Props = {
  imageID: number,
  onChangeImage: (e: Object) => void,
  name: string,
  onChangeeName: () => void,
  onSave: () => void
}

export default ({
  imageID,
  onChangeImage,
  name,
  onChangeeName,
  onSave
}: Props) =>
  <div>
    <div className="container">
      <PageHeader>
        <Glyphicon glyph="user" />&nbsp;Profile Setting
      </PageHeader>
    </div>
    <Grid>
      <Row className="show-grid">
        <br />
        <Col xs={6} md={4}>
          <Menu />
        </Col>
        <Col xs={12} md={8}>
          <Panel header="Account">
            <ControlLabel>Icon</ControlLabel>
            <div className={styles.image}>
              <ProfileImage imageID={imageID} onChange={onChangeImage} />
            </div>
            <br />
            <UserName name={name} onChange={onChangeeName} />
            <br />
            <br />
            <br />
            <Button bsStyle="success" onClick={() => onSave()}>
              Save
            </Button>
          </Panel>
        </Col>
      </Row>
    </Grid>
  </div>
