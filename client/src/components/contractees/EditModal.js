import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import EditPersonalInfo from './EditPersonalInfo'
import EditAddress from './EditAddress'
import EditEmail from './EditEmail'

class EditModal extends Component {
  state = { openModal: true }
  editors = {
    personalInfo: EditPersonalInfo,
    address: EditAddress,
    email: EditEmail,
  }

  onClose = () => this.setState({ openModal: false },this.props.resetActiveComp)

  render = () => {
    const { openModal } = this.state
    const { component, data, contracteeId } = this.props
    const ActiveComp = this.editors[component]
    return (
      <Modal
        open={openModal}
        onClose={this.onClose}>
        <Modal.Content>
          <ActiveComp data={data} contracteeId={contracteeId} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.onClose}>
              Back
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditModal
