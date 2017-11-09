import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import EditContractInfoForm from './EditContractInfoForm'

class EditContractInfoModal extends Component {
  state = { openModal: true }

  handleOnClose = () => {
    this.setState({ openModal: false })
    this.props.closeModals()
  }

  render = () => {
    const { openModal } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <EditContractInfoForm
            contract={this.props.contract}
            handleOnClose={this.handleOnClose} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            onClick={this.handleOnClose}>
            Back
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  if( props.contractId ) {
    return {
      contract: state.contracts.data.find( contract =>
        contract.id === props.contractId
      )
    }
  } else {
    return { contract: '' }
  }
}

export default connect(mapStateToProps)(EditContractInfoModal)
