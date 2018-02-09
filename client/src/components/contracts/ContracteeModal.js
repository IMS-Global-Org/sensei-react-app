import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Modal, Button, Header, Icon } from 'semantic-ui-react'
import ContracteesForm from './ContracteesForm'

class ContracteeModal extends Component {
  state = { openModal: true }

  handleOnClose = () =>
    this.setState({ openModal: false },()=>this.props.handleCloseModals())

  render = () => {
    const {
      openModal,
    } = this.state

    return (
      <Modal
        open={openModal}
        onClose={this.handleOnClose}>
        <Modal.Content>
          <Segment>
            <Header as='h1' icon textAlign='center'>
              <Icon name='users' size='massive'/>
              <Header.Content>
                Contractees
              </Header.Content>
            </Header>
            <Segment basic style={{ padding: '0 4rem' }}>
              Search for contractees by typing the first three letters of their
              last name in the search box. A list of possible contractees will
              appear, from which individual contactees can be selected. The
              process can be repeated over and over again selecting contractees
              with different last names until all contractees are located and
              linked to the current contract.
            </Segment>
            <ContracteesForm {...this.props} />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            size='mini'
            onClick={this.handleOnClose}>
            Back to Contract
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect()(ContracteeModal)
