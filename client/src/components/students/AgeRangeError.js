import React, { Component } from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'

class AgeRangeError extends Component {
  state = { open: true }
  render() {
    const { open } = this.state
    return (
      <Modal
        size='small'
        open={open}>
        <Header icon='error' content='Age Range Error!' />
        <Modal.Content>
          Please check and ensure that the Minimum Age is less than the Maximum Age!
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            onClick={()=>this.setState({ open: false })}>
            Got It!
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default AgeRangeError
