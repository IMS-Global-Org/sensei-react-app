import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form } from 'semantic-ui-react'

class AnnouncementForm extends Component {
  // Default form field values
  default = {
    title: '', category: '', message:'', extra: ''
    start_date: '', end_date: '', link: '', cost: '', registration: '' }
  }
  state={ ...default }

  /**
   * Handler for Submitting new or changed to announcements
   * @param {Object} event - Form event object
   */
  handleSubmit = ( event ) => {
    event.preventDefault()
    // TODO submit data to the rails database
  }

  /**
   * Handler for form input field changes and updates
   * @param {Object} event - Form event object
   */
  handleChange = ( event: { target: { id, value } } ) => {
    this.setState({ [id]: value })
  }

  /**
   * Handler for form radio field changes and updates
   * @param {Object} event - Form event object
   * @param {Object} data - Form data object
   */
   handleChangeRadio = ( event, data: { id, value } ) => {
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

  render(){
    const {
      title, category, message, extra,
      start_date, end_date, link, cost
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
        <Form.Input
          label='Start Date'
          control={Datetime}
          value={start_date}
          id='start_date'
          onChange={this.handleStartDatetime} />
        <Form.Input
          label='End Date'
          control={Datetime}
          value={end_date}
          id='end_date'
          onChange={this.handleEndDatetime} />
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
            onChangeRadio={this.handleChangeRadio} />
          <Form.Radio
            label='No'
            id='registration'
            value={ false }
            onChangeRadio={this.handleChangeRadio} />
        </Form.Group>
        <Button type='submit' name='submit'>
          { this.prop.formType === 'create' ? 'Create' : 'Update' }
        </Button>
      </Form>
    )
  }
}

const mapStateToProps = ( state ) => {
  return { notices: state.announcement || [] }
}

export default AnnouncementForm
