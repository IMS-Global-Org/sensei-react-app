import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import PostingsTableForm from './PostingsTableForm'

// Custom Actions
import { showPostingsTable } from '../actions/postings'

class PostingsTableModal extends Component {
  state = { open: false, dimmer: 'dimmer', activePosting: null, formType: null }

  /**
   * Set passed down props before any re-rendering
   * @param {Object} nextProps - the passed down props set
   */
  componentWillReceiveProps = ( nextProps ) => {
    const { activePosting: oldAp } = this.state
    const { activePosting: newAp } = nextProps
    if( newAp && newAp !== oldAp ) {
      this.setState({ ...nextProps }, () => {
        this.props.dispatch(showPostingsTable(newAp))
      })
    }
  }

  close = () => this.setState({ open: false, dimmer: 'dimmer' })

  render() {
    const { dimmer, open, formType, activePosting } = this.state
    return (
      <Modal
        open={open}
        dimmer={dimmer}
        onClose={this.close}>
        <Modal.Header>Postings Form</Modal.Header>
        <Modal.Content>
          <PostingsTableForm
            activePosting={this.props.tablePosting} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              color='green'
              onClick={this.close}>
              { formType === 'edit' ? 'Update' : 'Create' }
            </Button>
            <Button
              color='red'
              onClick={this.close}>
              Cancel
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    tablePosting: state.tablePostings.activePosting
  }
}

export default connect(mapStateToProps)(PostingsTableModal)
