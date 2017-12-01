import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import EditContractInfoForm from './EditContractInfoForm'
import ContracteeModal from './ContracteeModal'

class EditContractInfoModal extends Component {
  defaults = {
    openModal: true,
    showContracteeModal: false
  }
  state = { ...this.defaults }

  handleOnClose = () => {
    this.setState({ openModal: false })
    this.props.closeModals()
  }

  handleCloseModals = () => this.setState({ ...this.defaults })
  handleShowContracteeModal = () => this.setState({ showContracteeModal: true })

  render = () => {
    const {
      openModal,
      showContracteeModal,
    } = this.state
    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <EditContractInfoForm
            contract={this.props.contract}
            handleOnClose={this.handleOnClose}
            handleShowContracteeModal={this.handleShowContracteeModal} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            onClick={this.handleOnClose}>
            Back
          </Button>
          { showContracteeModal &&
            <ContracteeModal
              handleCloseModals={this.handleCloseModals}
              contractId={this.props.contractId} />
          }
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
