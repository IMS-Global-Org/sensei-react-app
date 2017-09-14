import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Dropdown } from 'semantic-ui-react'

// Actions
import {
  createMailer,
  updateMailer,
  deleteMailer,
} from '../../actions/mailers'

class MailerForm extends Component {
  defaults = {
    title: '', type_of: '', interval: '', active: '',
    recipients: '', subject: '', notify: '', id: '',
  }
  state = { ...this.defaults }

  recipients = [
    { text: 'Admin', value: 'Admin' },
    { text: 'User', value: 'User' },
    { text: 'Guest', value: 'Guest' },
  ]

  intervals = [
    { text: 'Daily', value: 'Daily' },
    { text: 'Weekly', value: 'Weekly' },
    { text: 'Monthly', value: 'Monthly' },
    { text: 'Yearly', value: 'Yearly' },
  ]

  type_of = [
    { text: 'Birthday', value: 'Birthday' },
    { text: 'Activity', value: 'Activity' },
    { text: 'Billing', value: 'Billing' },
  ]

  componentDidMount = () => {
    const { mailerId, mailer } = this.props
    if( typeof mailerId === 'boolean' )
      this.setState({ ...this.defaults })
    else if ( typeof mailerId === 'number' && mailerId > 0 )
      this.setState({ ...this.props.mailer })
  }

  handleChange = ( event ) => {
    const { target: { id, value } } = event
    this.setState({ [id]: value })
  }

  handleDropdownChange = ( event, data ) => this.setState({ [data.id]: data.value })
  handleBooleanChange = ( event, data ) => this.setState({ [data.id]: data.value })

  handleCancel = () => this.props.closeModal()
  handleNewForm = () => this.setState({ ...this.defaults })
  handleDelete = () => {
    const { dispatch, closeModal } = this.props
    const { id } = this.state
    dispatch(deleteMailer(id))
    closeModal()
  }
  handleSubmit = ( event ) => {
    event.preventDefault()
    const { id } = this.state
    const { dispatch, closeModal } = this.props
    if( id ) {
      dispatch(updateMailer(this.state))
    } else {
      dispatch(createMailer(this.state))
    }
    closeModal()
  }

  render() {
    const {
      title, interval, type_of, active,
      recipients, subject, notify, id,
    } = this.state
    return (
      <Segment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <Input
              id='title'
              value={title}
              onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Subject</label>
            <Input
              id='subject'
              value={subject}
              onChange={this.handleChange} />
          </Form.Field>
          <Form.Group widths='equal'>
            <Form.Field inline>
              <label>Type</label>
              <Dropdown
                id='type_of'
                selection
                options={this.type_of}
                value={type_of}
                placeholder='Type of mailer...'
                onChange={this.handleDropdownChange} />
            </Form.Field>
            <Form.Field inline>
              <label>Interval</label>
              <Dropdown
                id='interval'
                selection
                options={this.intervals}
                placeholder='Time Interval...'
                value={interval}
                onChange={this.handleDropdownChange} />
            </Form.Field>
            <Form.Field inline>
              <label>Recipient</label>
              <Dropdown
                id='recipients'
                selection
                options={this.recipients}
                placeholder='Recipient Group...'
                value={recipients}
                onChange={this.handleDropdownChange} />
            </Form.Field>
          </Form.Group>
          <Form.Group inline>
            <label>Active</label>
            <Form.Radio
              id='active'
              label='Yes'
              checked={active === true}
              onChange={this.handleBooleanChange} />
            <Form.Radio
              id='active'
              label='No'
              checked={active === false}
              onChange={this.handleBooleanChange} />
          </Form.Group>
          <Form.Group inline>
            <label>Notify</label>
            <Form.Radio
              id='notify'
              label='Yes'
              checked={notify === true}
              onChange={this.handleBooleanChange} />
            <Form.Radio
              id='notify'
              label='No'
              checked={notify === false}
              onChange={this.handleBooleanChange} />
          </Form.Group>
          <Segment basic clearing>
            <Button.Group floated='right'>
              <Button
                type='submit'>
                { id ? 'Update' : 'Create' }
              </Button>
              <Button.Or />
              <Button
                type='button'
                onClick={this.handleCancel}>
                Cancel
              </Button>
              <Button.Or />
              <Button
                type='button'
                disabled={ id ? false : true }
                onClick={this.handleNewForm}>
                Create New
              </Button>
              <Button.Or />
              <Button
                type='button'
                onClick={this.handleDelete}>
                Delete
              </Button>
            </Button.Group>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    mailer: state.mailers.data.find( mailer => mailer.id === props.mailerId ) || {},
  }
}

export default connect(mapStateToProps)(MailerForm)
