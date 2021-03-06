// @flow
import React, { Component } from "react"
import {
  Grid,
  Row,
  ListGroup,
  ListGroupItem,
  Glyphicon,
  Col,
  PageHeader,
  Panel
} from "react-bootstrap"
import { Link as Footer } from "../../../component/footer/"
import { LinkContainer } from "react-router-bootstrap"
import type { State as InformationShow } from "../reducers/show"

type Props = {
  get: (file: string) => void,
  match: {
    params: {
      file: string
    }
  },
  informationShow: InformationShow
}

export default class Show extends Component {
  componentWillMount() {
    this.get(this.props.match.params.file)
  }
  props: Props
  /**
   * to add
   */
  get(file: string) {
    this.props.get(file)
  }
  /**
   * draw
   */
  render() {
    const { title, body } = this.props.informationShow

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={6} md={4}>
              <br />
              <br />
              <br />
              <ListGroup>
                <LinkContainer to="/information/terms">
                  <ListGroupItem onClick={() => this.get("terms")}>
                  Terms of service
                  </ListGroupItem>
                </LinkContainer>
                <LinkContainer to="/information/clientLicense">
                  <ListGroupItem onClick={() => this.get("clientLicense")}>
                    client License
                  </ListGroupItem>
                </LinkContainer>
                <LinkContainer to="/information/serverLicense">
                  <ListGroupItem onClick={() => this.get("serverLicense")}>
                    server License
                  </ListGroupItem>
                </LinkContainer>
                <LinkContainer to="/information/ansibleLicense">
                  <ListGroupItem onClick={() => this.get("ansibleLicense")}>
                    infrastructure License
                  </ListGroupItem>
                </LinkContainer>
              </ListGroup>
            </Col>
            <Col xs={12} md={8}>
              <PageHeader>
                <Glyphicon glyph="info-sign" />
                &nbsp;
                {title}
              </PageHeader>
              <Panel header="Contents" bsStyle="info">
                <pre>
                  {body}
                </pre>
              </Panel>
            </Col>
          </Row>
        </Grid>
        <Footer />
      </div>
    )
  }
}
