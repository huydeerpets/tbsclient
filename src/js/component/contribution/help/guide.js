// @flow
import React from "react"
import { Modal, Panel, Table, Button } from "react-bootstrap"

type Props = {
  open: boolean,
  onHide: () => void
}

export default ({ open, onHide }: Props) =>
  <Modal show={open} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Method of operation</Modal.Title>
    </Modal.Header>
    <Modal.Body>
     <h4> Operation </h4>
      <Panel header = "Click to enlarge the selected icon">
        When the icon at the center of the screen is clicked, the selected icon is displayed in a balloon
        Click again to close
      </Panel>
      <br/>
      <Panel header = "sorting"> You can sort by dragging and dropping the balloon part </ Panel>
      <br/>
      <Panel header = "Create a reading">
        The read-out is displayed after saving the article. You can edit from "Create a reading" <br />
        ※ We can not use in trial contribution
      </Panel>
      <br/>
      <h4> Shortcut keys </h4>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>operation</th>
            <th>key</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Change icon around right</td>
            <td>shift&nbsp;+&nbsp;→</td>
          </tr>
          <tr>
            <td>Change icon around left</td>
            <td>shift&nbsp;+&nbsp;←</td>
          </tr>
          <tr>
            <td>Enlarge the icon</td>
            <td>shift&nbsp;+&nbsp;↑</td>
          </tr>
          <tr>
            <td>アイコンを拡大非表示</td>
            <td>shift&nbsp;+&nbsp;↓</td>
          </tr>
          <tr>
            <td>テキスト書き込み</td>
            <td>shift&nbsp;+&nbsp;command</td>
          </tr>
          <tr>
            <td>投稿する or 下書き保存</td>
            <td>shift&nbsp;+&nbsp;ctrl</td>
          </tr>
          <tr>
            <td>フォーカスをテキストに移動</td>
            <td>shift&nbsp;+&nbsp;enter</td>
          </tr>
          <tr>
            <td>画像をupload</td>
            <td>shift&nbsp;+&nbsp;i</td>
          </tr>
          <tr>
            <td>アイコンを拡大表示</td>
            <td>shift&nbsp;+&nbsp;↑</td>
          </tr>
          <tr>
            <td>Scroll writing space</td>
            <td>shift&nbsp;+&nbsp;alt&nbsp;+&nbsp;↓&nbsp;or&nbsp;↑</td>
          </tr>
        </tbody>
      </Table>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
