import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input } from 'semantic-ui-react'

class EditAddress extends Component {
  defaults = {
    id: '', street1: '', street2: '', city: '',
    state: '', zipcode: '', country: '',
  }
  state = { ...this.defaults }

  render = () => {
    const {
      id, street1, street2, city, state, zipcode, country,
    } = this.state

    return (
      <Form>
        <Form.Field
          width={16}
          inline
          control={Input}
          label='Street'
          id='street1'
          value={street1}
          onChange={this.onInputChange} />
        <Form.Field
          width={16}
          inline
          control={Input}
          label='Street'
          id='street2'
          value={street2}
          onChange={this.onInputChange} />
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='City'
            id='city'
            value={city}
            onChange={this.onInputChange} />
          <Form.Field
            control={Input}
            label='state'
            id='state'
            value={state}
            onChange={this.onInputChange} />
          <Form.Field
            control={Input}
            label='ZipCode'
            id='zipcode'
            value={zipcode}
            onChange={this.onInputChange} />
          <Form.Field
            control={Input}
            label='Country'
            id='country'
            value={country}
            onChange={this.onInputChange} />
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

export default connect()(EditAddress)
