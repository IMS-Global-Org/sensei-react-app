import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Select } from 'semantic-ui-react'
import TypeOf from '../helpers/TypeOf'
import OwnerOf from '../helpers/OwnerOf'
import TrueFalse from '../helpers/TrueFalse'

// Actions
import {
  createPhone,
  updatePhone,
} from '../../actions/contractees'

class EditPhone extends Component {
  defaults = {
    id: '', phone_number: '', type_of: '',
    owner_of: '', texting: '', active: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadPhone(this.props)
  componentWillReceiveProps = ( props ) => this.loadPhone(props)
  loadPhone = ( props ) => {
    const { data: phone } = props
    const { id } = this.state
    if( phone && id !== phone.id ) {
      this.setState({ ...phone })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onSelectChange = (e,{id,value}) => this.setState({ [id]: value })
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, contracteeId } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updatePhone(this.state))
    } else {
      dispatch(createPhone(contracteeId,this.state))
    }
    this.props.closeModal()
  }

  render = () => {
    const {
      id, phone_number, type_of, owner_of, texting, active
    } = this.state

    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Phone Number'
            id='phone_number'
            value={phone_number}
            onChange={this.onInputChange} />
          <Form.Field
            control={Select}
            options={TypeOf.telephones}
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
        </Form.Group>
        <Form.Group>
          <Form.Field
            control={Select}
            options={TrueFalse.options}
            label='Texting Enable'
            id='texting'
            value={texting ? 1 : 0}
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

export default connect()(EditPhone)
