import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal } from 'semantic-ui-react'
import MailerForm from './MailerForm'
import { ModalFix } from '../helpers/ModalFix'

class MailerModal extends Component {
  state = { modalOpen: false }

  componentDidMount = () => this.setState({ modalOpen: true })
  openModal = () => this.setState({ modalOpen: true })
  closeModal = () => {
    this.setState({ modalOpen: false },() => {
      this.props.resetMailer()
    })
  }

  closeModal = () => {
    this.setState({ modalOpen: false },()=>{
      this.props.resetMailer()
    })
  }

  render() {
    return (
      <Modal
        basic
        style={ModalFix.override}
        open={this.state.modalOpen}
        onClose={this.closeModal}>
        <Modal.Content>
          <MailerForm
            closeModal={this.closeModal}
            mailerId={this.props.mailerId} />
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
