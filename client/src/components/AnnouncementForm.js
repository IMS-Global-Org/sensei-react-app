import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import Datetime from 'react-datetime'
import moment from 'moment'

// Redux Actions
import { updateAnnouncement, createAnnouncement } from '../actions/announcements'

// Custom CSS
import 'react-datetime/css/react-datetime.css'

/**
 * Form respresenting a single announcement that can be edited
 * or created from new
 * @author Brennick Langston
 * @version 0.0.1
 */
class AnnouncementForm extends Component {
  // Default form field values
  default = {
    title: '', category: '', message: '', extra: '',
    start_date: moment.utc(), end_date: moment.utc(),
    link: '', cost: '', registration: false,
  }
  state={ ...this.default }

  /**
   * Initializes states' data set
   */
  componentDidMount = () => {
    /** @type {Object} announcement - a single announcement to load */
    const { announcement: ann } = this.props
    const data = ann ? ann : this.default
    this.setState({ ...data })
  }

  /**
   * Handler for Submitting new or changed to announcements
   * @param {Object} event - Form event object
   */
  handleSubmit = ( event ) => {
    event.preventDefault()
    /** @type {String} dataType - string ['edit','create'] */
    const { dispatch, dataType } = this.props
    const method = dataType === 'edit' ? updateAnnouncement : createAnnouncement
    dispatch(method(this.state))
    // TODO submit data to the rails database
  }

  /**
   * Handler for form input field changes and updates
   * @param {Object} event - Form event object
   */
  handleChange = ( { target: { id, value } } ) => {
    this.setState({ [id]: value })
  }

  /**
   * Handler for form radio field changes and updates
   * @param {Object} event - Form event object
   * @param {Object} data - Form data object
   */
   handleChangeRadio = ( event, { id, value, checked } ) => {
     if( checked )
       this.setState({ [id]: value })
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
          label='Title'
          id='title'
          value={ title }
          onChange={this.handleChange} />
        <Form.Input
          label='Category'
          id='category'
          value={ category }
          onChange={this.handleChange} />
        <Form.Input
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
              value={start_date}
              onChange={this.handleStartDatetime} />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <Datetime
              value={end_date}
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
          <Form.Radio
            label='Yes'
            id='registration'
            value={ true }
            checked={ registration === true }
            onChange={this.handleChangeRadio} />
          <Form.Radio
            label='No'
            id='registration'
            value={ false }
            checked={ registration === false }
            onChange={this.handleChangeRadio} />
        </Form.Group>
        <Button type='submit' >
          { this.props.formType === 'create' ? 'Create' : 'Update' }
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcements }
}

export default connect(mapStateToProps)(AnnouncementForm)
