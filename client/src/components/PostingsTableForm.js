import React, { Component } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'

class PostingsTableForm extends Component {
  state = { open: false, dimmer: 'inverted', activeItem: null }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState({ ...nextProps })
    // TODO load the active items information from the database
  }

  close = () => this.setState({ open: false, dimmer: false })

  render() {
    const { dimmer, open } = this.state
    return (
      <Modal
        open={open}
        dimmer={dimmer}
        onClose={this.close}>
        <Modal.Header>Form Test</Modal.Header>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              color='red'
              onClick={this.close}>
              Close
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default PostingsTableForm
