import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

class ContractSearchForm extends Component {
  defaults = {
    id: '', first: '', last: '',
    start_date: '', end_date: '',
    interval: '', status: '',
  }
  state = { ...this.defaults }

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { queryContracts } = this.props
    const query = this.state
    if( query.start_date )
      query.start_date = query.start_date.utc().format()
    if( query.end_date )
      query.end_date = query.end_date.utc().format()
    queryContracts(query)
  }

  handleChange = ( event ) => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }
  handleStartDate = ( moment ) => this.setState({ start_date: moment })
  handleEndDate = ( moment ) => this.setState({ end_date: moment })
  handleInterval = ( event, data ) => this.setState({ interval: data.value })
  handleStatus = ( event, data ) => this.setState({ status: data.value })

  render() {
    const {
      first, last,
      start_date, end_date,
      interval, status
    } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='First Name'
            placeholder='...'
            id='first'
            value={first}
            onChange={this.handleChange} />
          <Form.Input
            label='Last Name'
            placeholder='...'
            id='last'
            value={last}
            onChange={this.handleChange} />
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Start Date:</label>
            <DatePicker
              selected={start_date}
              selectsStart
              startDate={start_date}
              endDate={end_date}
              onChange={this.handleStartDate}
              />
          </Form.Field>
          <Form.Field>
            <label>End Date:</label>
            <DatePicker
              selected={end_date}
              selectsEnd
              startDate={start_date}
              endDate={end_date}
              onChange={this.handleEndDate}
              />
          </Form.Field>
          <Form.Select
            options={[
              { key: '6', text: '6 Months', value: '6' },
              { key: '12', text: '12 Months', value: '12' }
            ]}
            label='interval'
            placeholder='...'
            id='interval'
            value={interval}
            onChange={this.handleInterval} />
          <Form.Select
            options={[
              { key: true, text: 'Active', value: 1 },
              { key: false, text: 'InActive', value: 0 }
            ]}
            label='status'
            placeholder='...'
            id='status'
            value={status}
            onChange={this.handleStatus} />
        </Form.Group>
        <Button.Group size='mini'>
          <Button
            type='submit'>
            Submit
          </Button>
        </Button.Group>
      </Form>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    contract: state.contracts.contract,
  }
}

export default connect(mapStateToProps)(ContractSearchForm)
