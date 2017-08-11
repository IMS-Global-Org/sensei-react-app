import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Button } from 'semantic-ui-react'
import PostingsTableForm from './PostingsTableForm'

// Custom Actions
import {
  showPostingsTable,
  updatePostingsTable,
  createPostingsTable,
} from '../actions/postings'

class PostingsTableModal extends Component {
  state = { open: false, dimmer: 'dimmer', activePosting: null, formType: null }

  /**
   * Callback function allowing the child's form component state to be accessed
   */
  formState = null

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
    } else {
      this.forceUpdate()
    }
  }

  /**
   * Close the Modal and all Child components
   */
  close = () => this.setState({
    open: false,
    dimmer: 'dimmer',
  })

  /**
   * Sets the actual child components method that can be used to access
   * its state. Use for updating or creating a new posting in the form
   * @param {Function} callback - callback accessor function in child component
   */
  setStateCallback = ( callback ) => {
    this.formState = callback
  }

  /**
   * Triggers the update or create actions for sending form data to the db
   */
  onSubmit = () => {
    const { dispatch } = this.props
    const { formType } = this.state
    // TODO repackage the data so home_page_* are set. required by server
    const updatedData = this.repackFormData(this.formState())
    if( formType === 'edit' ) {
      dispatch(updatePostingsTable(updatedData))
    } else if( formType === 'new' ) {
      dispatch(createPostingsTable(updatedData))
    }
    this.close()
  }

  repackFormData = ( data ) => {
    let updated = Object.assign({},data)
    delete updated.videos
    delete updated.links
    /**
     * NOTE
     * Must always include the _attributes attached to the end
     * of the nested objects name if using the following cmd in the model
     * 'accepts_nested_attributes_for'
     */
    updated.home_page_videos_attributes = data.videos
    updated.home_page_links_attributes = data.links
    return updated
  }

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
            setStateCallback={this.setStateCallback}
            activePosting={this.props.tablePosting} />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group size='mini'>
            <Button
              color='green'
              onClick={this.onSubmit}>
              { formType === 'edit' ? 'Update' : 'Create' }
            </Button>
            <Button
              color='red'
              onClick={this.close}>
              Cancel
            </Button>
          </Button.Group>
          {' '}
          <Button.Group size='mini'>
            <Button
              color='blue'
              onClick={this.displayEmptyForm}>
              New Posting
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
