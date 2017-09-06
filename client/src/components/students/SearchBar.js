import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Input, Button } from 'semantic-ui-react'
import {
  queryStudents,
} from '../../actions/students'

class SearchBar extends Component {
  defaults = { first: '', last: '', belt: '', level: '', age: '', gender: '' }
  state = { ...this.defaults }

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, setQuery } = this.props
    dispatch(queryStudents(this.state))
    if( setQuery ) {
      setQuery(this.state)
    }
  }
  handleChange = ( event ) => {
    const { target: { id, value } } = event
    this.setState({ [id]: value })
  }
  handleClearForm = () => {
    this.setState({ ...this.defaults })
  }

  render() {
    const { first, last, belt, level, age, gender } = this.state
    return (
      <Segment basic>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='First'
              labelPosition='left'
              id='first'
              value={first}
              onChange={this.handleChange}
              placeholder='First name...' />
            <Form.Field
              control={Input}
              label='Last'
              labelPosition='left'
              id='last'
              value={last}
              onChange={this.handleChange}
              placeholder='Last name...' />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              type='number'
              max={100}
              min={0}
              label='Age'
              id='age'
              value={age}
              onChange={this.handleChange}
              placeholder='Age...' />
            <Form.Field
              control={Input}
              label='Gender'
              id='gender'
              value={gender}
              onChange={this.handleChange}
              placeholder='Gender...' />
            <Form.Field
              control={Input}
              label='Belt'
              id='belt'
              value={belt}
              onChange={this.handleChange}
              placeholder='Belt...' />
            <Form.Field
              control={Input}
              label='Level'
              id='level'
              value={level}
              onChange={this.handleChange}
              placeholder='Level...' />
          </Form.Group>
          <Form.Group widths={16}>
              <Button.Group
                size='mini'
                style={{ margin: '1rem 25%', width: '50%' }}>
                <Button
                  compact={true}
                  icon='search'
                  type='submit'
                  onClick={this.handleSubmit}>Search</Button>
                <Button.Or />
                <Button
                  compact={true}
                  type='button'
                  onClick={this.handleClearForm}>Clear</Button>
              </Button.Group>
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

export default connect()(SearchBar)
