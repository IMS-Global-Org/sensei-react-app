import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// Actions
import {
  createContractee,
  updateContractee,
} from '../../actions/contractees'


class EditContractee extends Component {
  defaults = {
    id: '', first: '', last: '', birthdate: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadContractee(this.props)
  componentWillReceiveProps = ( props ) => this.loadContractee(props)
  loadContractee = ( props ) => {
    const { contractee } = props
    const { id } = this.state
    if( contractee && contractee.id && contractee.is !== id ) {
      this.setState({ ...contractee })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onDateChange = ( birthday ) => this.setState({ birthday })
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    const params = this.state
    params.birthdate = params.birthdate.format()
    if( params.id ) {
      dispatch(updateContractee(params))
    } else {
      dispatch(createContractee(params))
    }
  }

  render = () => {
    const {
      id, first, last, birthdate,
    } = this.state
    return (
      <Form>
        <Form.Group>
          <Form.Field
            control={Input}
            label='First'
            id='first'
            value={first}
            onChange={this.onInputChange} />
          <Form.Field
            control={Input}
            label='Last'
            id='last'
            value={last}
            onChange={this.onInputChange} />
          <Form.Field
            control={DatePicker}
            label='Birthday'
            selected={birthdate ? moment(birthdate) : moment()}
            onChange={this.onDateChange} />
        </Form.Group>
        <Form.Group floated='right'>
          <Button
            type='submit'
            onClick={this.onSubmit}>
            { id ? 'Update' : 'Create' }
          </Button>
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contractee: state.contractees.contractee,
  }
}

export default connect(mapStateToProps)(EditContractee)
