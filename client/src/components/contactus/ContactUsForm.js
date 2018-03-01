import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Segment,
  Form, Button, Label
} from 'semantic-ui-react'

// CSS Styles
import '../../styles/input_forms.css'


class ContactUsForm extends Component {
  defaults = {
    last_name: '', first_name: '', phone: '',
    address: '', subject: '', body: '', attachments: ''
  }
  state = { ...this.defaults }

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    debugger
  }

  checkForErrors = () => {
    this.errors = {}
    Object.keys(this.state).forEach( field =>
      this.errors[field] = this.state[field].length === 0
    )
    this.errors.phone = this.state['phone']
      .match(/^\(\d{3}\)\s\d{3}\s\-\s\d{4}$/) === null
    return this.errors
  }

  formIsValid = () => {
    // FIXME: check for attachments
    return Object.keys(this.errors).every( field => this.errors[field] === false )
  }

  handleInputChange = ({target: {id,value}}) => { this.setState({ [id]: value })}

  render() {
    const {
      first_name, last_name, phone,
      address, subject, body, attachments
    } = this.state

    // TODO: Add input selector for adding files, attachments
    // TODO: Check for errors
    const errors = this.checkForErrors()
    debugger
    return (
      <Form>
        <Form.Group inline width='equal'>
          <Form.Input
            className={errors.first_name ? 'error' : ''}
            type='text'
            required
            label='First Name'
            name='first_name'
            id='first_name'
            value={first_name}
            onChange={this.handleInputChange} />
          <Form.Input
            type='text'
            className={errors.last_name ? 'error' : ''}
            required
            label='Last Name'
            name='last_name'
            id='last_name'
            value={last_name}
            onChange={this.handleInputChange} />
          <Form.Input
            type='tel'
            className={errors.phone ? 'error' : ''}
            required
            placeholder='(XXX) XXX - XXXXX'
            label='Phone Number'
            name='phone'
            id='phone'
            value={phone}
            onChange={this.handleInputChange} />
        </Form.Group>
        <Form.Input
          type='email'
          className={errors.address ? 'error' : ''}
          label="E-Mail Address"
          required
          name='address'
          id='address'
          value={address}
          onChange={this.handleInputChange} />
        <Form.Input
          type='text'
          className={errors.subject ? 'error' : ''}
          label='Subject'
          required
          name='subject'
          id='subject'
          value={subject}
          onChange={this.handleInputChange} />
        <Form.TextArea
          required
          className={errors.body ? 'error' : ''}
          label='Message'
          name='body'
          id='body'
          value={body}
          onChange={this.handleInputChange} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='submit'
              disabled={!this.formIsValid()}
              onClick={this.handleOnSubmit}>
                Send to Sensei
              </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(ContactUsForm)
