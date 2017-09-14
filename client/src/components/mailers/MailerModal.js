import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import MailerForm from './MailerForm'

class MailerModal extends Component {
  state = { modalOpen: false }

  componentDidMount = () => this.setState({ modalOpen: true })
  openModal = () => this.setState({ modalOpen: true })
  closeModal = () => {
    this.setState({ modalOpen: false },() => {
      this.props.resetMailer()
    })
  }

  render() {
    return (
      <Modal
        basic
        open={this.state.modalOpen}
        onClose={this.closeModal}>
        <Modal.Content>
          <MailerForm mailerId={this.props.mailerId} />
        </Modal.Content>
      </Modal>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    mailers: state.mailers.data,
  }
}

export default connect(mapStateToProps)(MailerModal)
