import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import ViewPost from './ViewPost'

class ViewPostModal extends Component {
  state = { openModal: true }

  onClose = () =>
    this.setState({ openModal: false },
      ()=>this.props.resetActiveItem()
    )

  render = () => {
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.onClose}>
        <Modal.Header>Posting Information</Modal.Header>
        <Modal.Content scrolling>
          <ViewPost
            {...this.props}
            closeModal={this.onClose} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.onClose}>
              Back to Postings
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ViewPostModal
