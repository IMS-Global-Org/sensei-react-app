import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import ShowContractInfo from './ShowContractInfo'

class ShowContractInfoModal extends Component {
  state = { openModal: true }

  closeModal = () => {
    this.setState(
      { openModal: false },
      ()=>this.props.closeModals()
    )
  }

  render = () => {
    const {
      openModal,
    } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.closeModal}>
        <Modal.Content>
          <ShowContractInfo
            {...this.props} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            onClick={this.closeModal}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ShowContractInfoModal
