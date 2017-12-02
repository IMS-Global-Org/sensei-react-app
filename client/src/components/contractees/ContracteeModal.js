import React, { Component } from 'react'
import { Modal, Button } from 'semantic-ui-react'
import ViewContractee from './ViewContractee'

class ContracteeModal extends Component {
  state = { openModal: true }
  components = {
    create: '',
    view: ViewContractee,
    edit: '',
    delete: '',
  }

  handleOnClose = () =>
    this.setState({ openModal: false },()=>this.props.closeModal())

  render = () => {
    const { openModal } = this.state
    const ComponentType = this.components[this.props.type] || 'view'
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <ComponentType contracteeId={this.props.contracteeId} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              type='button'
              onClick={this.handleOnClose}>
              Back to Contractees
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ContracteeModal
