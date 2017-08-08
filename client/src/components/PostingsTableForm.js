import React, { Component } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import PostingsTableVideosSubForm from './PostingsTableVideosSubForm'

class PostingsTableForm extends Component {
  state = { open: false, dimmer: 'dimmer', activeItem: null, formType: null }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState({ ...nextProps })
    // TODO load the active items information from the database
  }

  close = () => this.setState({ open: false, dimmer: 'dimmer' })

  // TODO Main form
  // TODO independent videos subform
  // TODO independent links subform
  render() {
    const { dimmer, open, formType } = this.state
    return (
      <Modal
        open={open}
        dimmer={dimmer}
        onClose={this.close}>
        <Modal.Header>Postings Form</Modal.Header>
        <Modal.Content>
          <Form>
            <PostingsTableVideosSubForm />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              color='green'
              onClick={this.close}>
              { formType === 'edit' ? 'Update' : 'Create' }
            </Button>
            <Button
              color='red'
              onClick={this.close}>
              Cancel
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default PostingsTableForm
