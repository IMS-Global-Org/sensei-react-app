import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm } from 'semantic-ui-react'

// Actions
import {
  archiveContractInfo,
} from '../../actions/contracts'

class ArchiveContractInfoModal extends Component {
  state = { openModal: true }

  handleCancel = () =>
    this.setState({ openModal: false },()=>this.props.closeModals())
  handleConfirm = () => {
    this.props.dispatch(archiveContractInfo(this.props.contractId))
    this.props.closeModals()
  }

  render = () => {
    const { openModal } = this.state
    return (
      <Confirm
        open={openModal}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}>
      </Confirm>
    )
  }
}

export default connect()(ArchiveContractInfoModal)
