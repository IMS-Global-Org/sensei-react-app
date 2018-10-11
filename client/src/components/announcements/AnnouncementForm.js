import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import Datetime from 'react-datetime'
import moment from 'moment'

// Redux Actions
import {
  updateAnnouncement,
  createAnnouncement,
  deleteAnnouncement,
} from '../../actions/announcements'

/**
 * Form respresenting a single announcement that can be edited
 * or created from new
 * @author Brennick Langston
 * @version 0.0.1
 */
class AnnouncementForm extends Component {
  // Default form field values
  defaults = {
    id: '',
    title: '', category: '', message: '', extra: '',
    start_date: moment(), end_date: moment(),
    link: '', cost: '', registration: 0,
  }
  state={ ...this.defaults }

  /**
   * Loads announcements passed to the component after its initial mount.
   * NOTE: This ensures that new props are loaded into state before each re-render
   * since the component only mounts once
   * @param {Object} nextProps - The new set of props that are passed in
   */
  componentWillReceiveProps = ( nextProps ) => {
    let { activeAnnouncement } = nextProps
    if( activeAnnouncement && activeAnnouncement.id > 0 ) {
      // remove any nul valued attributes
      const formValues = {}
      for( let attributeName in activeAnnouncement ) {
        if( activeAnnouncement[attributeName] ) {
          formValues[attributeName] = activeAnnouncement[attributeName]
        }
      }
      this.setState({ ...this.defaults, ...formValues })
    }
  }

  /**
   * Handler for Submitting new or changed to announcements
   * @param {Object} event - Form event object
   */
  handleSubmit = ( event ) => {
    event.preventDefault()
    /** @type {String} dataType - string ['edit','create'] */
    const { dispatch, formType } = this.props
    if( this.state.title ) {
      const method = formType === 'edit' ? updateAnnouncement : createAnnouncement
      dispatch(method(this.state))
    }
  }

  /**
   * Handler for form input field changes and updates
   * @param {Object} event - Form event object
   */
  handleChange = ( { target: { id, value } } ) => {
    this.setState({ [id]: value })
  }

  /**
   * Handler for form checkbox field changes and updates
   * @param {Object} event - Form event object
   * @param {Object} data - Form data object
   */
   handleChangeCheckbox = ( event, { id, checked } ) => {
     this.setState({ [id]: checked ? 1 : 0 })
   }

   /**
    * Handler for starting date field changes and updates
    * @param {moment} date - moment.js date object
    */
  handleStartDatetime = ( date ) => {
    this.setState({ start_date: date })
  }

  /**
   * Handler for ending date field changes and updates
   * @param {moment} date - moment.js date object
   */
  handleEndDatetime = ( date ) => {
    this.setState({ end_date: date })
  }

  handleClearForm = () => {
    this.setState({
      ...this.defaults
    },this.props.clearAnnouncement)
  }

  handleDeleteAnnouncement = () => {
    const { dispatch } = this.props
    const { id } = this.state
    dispatch(deleteAnnouncement(id))
    this.props.clearAnnouncement()
    this.setState({ ...this.defaults })
  }

  /**
   * Renders the actual form that is to be displayed
   */
  render() {
    const {
      title, category, message, extra,
      start_date, end_date, link, cost,
      registration,
    } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Input
          required
          label='Title'
          id='title'
          value={ title }
          onChange={this.handleChange} />
        <Form.Input
          required
          label='Category'
          id='category'
          value={ category }
          onChange={this.handleChange} />
        <Form.Input
          required
          label='Message'
          id='message'
          value={ message }
          onChange={this.handleChange} />
        <Form.Input
          label='Extra'
          id='extra'
          value={ extra }
          onChange={this.handleChange} />
        <Form.Group inline>
          <Form.Field>
            <label>Start Date</label>
            <Datetime
              value={moment.isMoment(start_date) ? start_date : moment(start_date)}
              onChange={this.handleStartDatetime} />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <Datetime
              value={moment.isMoment(end_date) ? end_date : moment(end_date)}
              onChange={this.handleEndDatetime} />
          </Form.Field>
        </Form.Group>
        <Form.Input
          label='Link'
          type='url'
          id='link'
          value={ link }
          onChange={this.handleChange} />
        <Form.Input
          label='Cost'
          type='number'
          id='cost'
          value={ cost }
          onChange={this.handleChange} />
        <Form.Group>
          <label>Registration Required</label>
          <Form.Checkbox
            label='Yes'
            id='registration'
            checked={ registration === 1 }
            onChange={this.handleChangeCheckbox} />
        </Form.Group>
        <Button.Group size='mini'>
          <Button type='submit' >
            { this.props.formType === 'create' ? 'Create' : 'Update' }
          </Button>
          <Button type='button' onClick={this.handleClearForm}>
            Clear
          </Button>
          <Button type='button' onClick={this.handleDeleteAnnouncement}>
            Remove
          </Button>
        </Button.Group>
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {}
}

export default connect(mapStateToProps)(AnnouncementForm)
