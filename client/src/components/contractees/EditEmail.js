import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Select } from 'semantic-ui-react'
import TypeOf from '../helpers/TypeOf'
import OwnerOf from '../helpers/OwnerOf'
import TrueFalse from '../helpers/TrueFalse'

// Actions
import {
  createEmail,
  updateEmail,
} from '../../actions/contractees'


class EditEmail extends Component {
  defaults = {
    id: '', address: '', type_of: '', owner_of: '', html: '', active: ''
  }
  state = { ...this.defaults }
  debugger
  componentDidMount = () => this.loadEmail(this.props)
  componentWillReceiveProps = ( props ) => this.loadEmail(props)
  loadEmail = ( props ) => {
    const { data: email } = props
    const { id } = this.state
    if( email && email.id !== id ) {
      this.setState({ ...email })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onSelectChange = (e,{id,value}) => this.setState({ [id]: value })
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, contracteeId } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updateEmail(this.state))
    } else {
      dispatch(createEmail(contracteeId, this.state))
    }
  }

  render = () => {
    const { id, address, type_of, owner_of, html, active } = this.state
    return (
      <Form>
        <Form.Field
          width={16}
          control={Input}
          label='Address'
          id='address'
          value={address}
          onChange={this.onInputChange} />
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            options={TypeOf.emails}
            label='Type'
            id='type_of'
            value={type_of}
            onChange={this.onSelectChange} />
          <Form.Field
            control={Select}
            options={OwnerOf.options}
            label='Owner'
            id='owner_of'
            value={owner_of}
            onChange={this.onSelectChange} />
          <Form.Field
            control={Select}
            options={TrueFalse.options}
            label='HTML Enabled'
            id='html'
            value={html ? 1 : 0}
            onChange={this.onSelectChange} />
          <Form.Field
            control={Select}
            options={TrueFalse.options}
            label='Active'
            id='active'
            value={active ? 1 : 0}
            onChange={this.onSelectChange} />
        </Form.Group>
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='submit'
              onClick={this.onSubmit}>
              { id ? 'Update' : 'Create' }
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(EditEmail)
