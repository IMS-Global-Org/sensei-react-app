import React, { Component } from 'react'
import {
  Segment,
  Form, Button
} from 'semantic-ui-react'
import styled from 'styled-components'
import { reduxForm, Field } from 'redux-form'

// Custom Components
const Error = styled.div`
  width: 100% !important;
  text-align: center !important;
  color: '#9B0013' !important;
  font-size: 0.8rem !important;
  font-weight: bold;
`
const Warn = styled.div`
  width: 100% !important;
  text-align: center !important;
  color: '#FF761A' !important;
  font-size: 0.8rem !important;
  font-weight: bold;
`

// Form Field Validations, required Params
const validate = ( formFields ) => {
  const errors = {}
  if( !formFields.address ) {
    errors.address = 'Ooops! Forgot Your E-mail Address!'
  }
  if( !formFields.first_name ){
    errors.first_name = 'Full Name is Required!'
  }
  if( !formFields.last_name ) {
    errors.last_name = 'Full Name is Required!'
  }
  if( !formFields.subject ){
    errors.subject = 'A Ssubject is Required!'
  }
  if( !formFields.body ){
    errors.body = 'Please include a message!'
  }
  return errors
}

// Form Field Warnings
const warn = ( formFields ) => {
  const warnings = {}
  if( formFields.phone.match(/^\(\d{3}\)\s\d{3}\s-\s\d{4}$/) === null ) {
    warnings.phone = 'Incorrect format! Must be (XXX) XXX - XXXX'
  }
  if( formFields.last_name.match(/\d/) !== null ) {
    warnings.last_name = 'Must Not Contain Numbers!'
  }
  if( formFields.first_name.match(/\d/) !== null ) {
    warnings.first_name = 'Must Not Contain Numbers!'
  }
  return warnings
}

// Input field Helper
const renderInputField = ({input, label, type, required, meta: {touched, error, warning}}) => (
  <Form.Field>
    <Form.Input
      {...input}
      required={required ? true : false}
      type={type}
      label={label} />
    { touched &&
      (
        (error && <Error style={{ color: '#9B0013'}}>{error}</Error>) ||
        (warning && <Warn style={{ color: '#FF761A'}}>{warning}</Warn>)
      )
    }
  </Form.Field>
)

// TextArea Field Helper
const renderTextAreaField = ({input, label, required, meta: {touched, error, warning}}) => (
  <Form.Field>
    <Form.TextArea
      {...input}
      required={required ? true : false}
      label={label}
      rows={10} />
      { touched &&
        (
          (error && <Error style={{ color: '#9B0013'}}>{error}</Error>) ||
          (warning && <Warn style={{ color: '#FF761A'}}>{warning}</Warn>)
        )
      }
  </Form.Field>
)

class ContactUsForm extends Component {
  render() {
    const { handleSubmit, pristine, reset, submitting} = this.props
    return (
      <Form onSubmit={handleSubmit} >
        <Form.Group inline width='equal'>
          <Field
            component={renderInputField}
            required
            type='text'
            label='First Name'
            name='first_name' />
          <Field
            component={renderInputField}
            required
            type='text'
            label='Last Name'
            name='last_name' />
          <Field
            component={renderInputField}
            type='tel'
            placeholder='(XXX) XXX - XXXXX'
            label='Phone Number'
            name='phone' />
        </Form.Group>
        <Field
          component={renderInputField}
          required
          type='email'
          label="E-Mail Address"
          name='address' />
        <Field
          component={renderInputField}
          required
          type='text'
          label='Subject'
          name='subject' />
        <Field
          component={renderTextAreaField}
          required
          label='Message'
          name='body' />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='submit'
              disabled={submitting}>
              Send to Sensei
            </Button>
            <Button
              type='button'
              disabled={pristine || submitting}
              onClick={reset}>
              Clear
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

// Connect Redux Form Validation State
export default reduxForm({
  form: 'ContactUsForm',
  validate,
  warn,
})(ContactUsForm)
