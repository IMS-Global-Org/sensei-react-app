import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button, Input, Select } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

// Actions
import {
  resetContract,
  archiveContractInfo,
  updateContractInfo,
  createContractInfo,
} from '../../actions/contracts'

class EditContractInfoForm extends Component {
  default = {
    id: '', start_date: '', end_date: '',
    amount: '', interval: '', status: '',
  }
  state = { ...this.default }

  componentDidMount = () => {
    const { contract } = this.props
    if( contract.start_date ){
      this.setState({
        ...contract,
        start_date: moment(contract.start_date),
        end_date: moment(contract.end_date),
      })
    }
  }
  componentWillUnmount = () => {
    this.props.dispatch(resetContract())
  }

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, handleOnClose } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updateContractInfo(this.state))
    } else {
      dispatch(createContractInfo(this.state))
    }
    handleOnClose()
  }

  handleStartDate = ( date ) => this.setState({ start_date: date })
  handleEndDate = ( date ) => this.setState({ end_date: date })
  handleOnChange = ( {target: {id,value}} ) => this.setState({ [id]: value })
  handleSelectChange = (e,{id, value}) => this.setState({ [id]: value })
  handleNewForm = () => this.setState({ ...this.default })
  handleArchive = () => {
    const { dispatch } = this.props
    const { id } = this.state
    dispatch(archiveContractInfo(id))
  }

  render = () => {
    const { id, start_date, end_date, amount, interval, status } = this.state
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Amount'
            id='amount'
            value={amount}
            onChange={this.handleOnChange} />
          <Form.Field
            control={Select}
            options={[
              { key: '6', text: '6 Months', value: 6 },
              { key: '12', text: '12 Months', value: 12 },
            ]}
            label='Interval'
            id='interval'
            value={interval}
            onChange={this.handleSelectChange} />
          <Form.Field
            control={Select}
            options={[
              { key: '1', text: 'Active', value: 1 },
              { key: '0', text: 'Inactive', value: 0 },
            ]}
            label='Status'
            id='status'
            value={status}
            onChange={this.handleSelectChange} />
        </Form.Group>
        <Form.Group widths='three'>
          <Form.Field>
            <label>Start Date</label>
            <DatePicker
              selected={start_date}
              onChange={this.handleStartDate} />
          </Form.Field>
          <Form.Field>
            <label>End Date</label>
            <DatePicker
              selected={end_date}
              onChange={this.handleEndDate} />
          </Form.Field>
        </Form.Group>
        <Segment basic clearing>
          <Button.Group size='mini' floated='right'>
            <Button
              type='submit'>
              { id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.handleNewForm}>
              New
            </Button>
            <Button.Or />
            <Button
              type='button'
              disabled={ id ? false : true }
              onClick={this.handleArchive}>
              Archive
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(EditContractInfoForm)
