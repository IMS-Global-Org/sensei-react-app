import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import CreatePost from './CreatePost'


class CreatePostModal extends Component {
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
        <Modal.Content scrolling>
          <CreatePost
            closeModal={this.onClose} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.onClose}>
              Close
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default CreatePostModal
