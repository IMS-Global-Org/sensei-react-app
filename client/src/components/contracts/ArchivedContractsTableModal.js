import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import ArchivedContractsTable from './ArchivedContractsTable'

class ArchivedContractsTableModal extends Component {
  state = { openModal: true }

  handleOnClose = () =>
    this.setState({ openModal: false },()=>this.props.closeModals())

  render = () => {
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose} >
        <Modal.Content>
          <ArchivedContractsTable {...this.props} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='tiny'>
            <Button
              type='button'
              onClick={this.handleOnClose}>
              Back to Contacts
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect()(ArchivedContractsTableModal)
