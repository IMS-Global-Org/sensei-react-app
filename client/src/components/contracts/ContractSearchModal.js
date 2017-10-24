import React, { Component } from 'react'
import {
  Modal, Header, Button,
} from 'semantic-ui-react'
import ContractSearchForm from './ContractSearchForm'

class ContentSearchModal extends Component {
  state = { modalOpen: true }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState({ modalOpen: true })
  }

  handleClose = () => this.setState({ modalOpen: false })
  handleSearch = () => {
    debugger
  }
  handleResetForm = () => {
    debugger
  }

  render() {
    const { modalOpen } = this.state
    return (
      <Modal
        open={modalOpen}
        onClose={this.handleClose}>
        <Header icon='search' content='Contract Search Filter' />
        <Modal.Content>
          Filter the contracts that are displayed by filling in the form below.
          <ContractSearchForm {...this.props} />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default ContentSearchModal
