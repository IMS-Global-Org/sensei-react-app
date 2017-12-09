import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Confirm, Button } from 'semantic-ui-react'


// Actions
import {
  archiveContractee,
} from '../../actions/contractees'

class ArchiveContractee extends Component {
  state = { openModal: true }

  onConfirm = () => {
    const { dispatch, contracteeId, handleOnClose } = this.props
    dispatch(archiveContractee(contracteeId))
    this.setState({ openModal: false })
    if( handleOnClose )
      handleOnClose()
  }

  onCancel = () => {
    this.setState({ openModal: false })
  }

  render = () => {
    const { openModal } = this.state
    return (
      <Confirm
        open={openModal}
        onCancel={this.onCancel}
        onConfirm={this.onConfirm} />
    )
  }
}

export default connect()(ArchiveContractee)
