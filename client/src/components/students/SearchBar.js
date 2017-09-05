import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Input, Button } from 'semantic-ui-react'
import {
  queryStudents,
} from '../../actions/students'

class SearchBar extends Component {
  defaults = { first: '', last: '', belt: '', level: '' }
  state = { ...this.defaults }

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(queryStudents(this.state))
  }
  handleChange = ( event ) => {
    const { target: { id, value } } = event
    this.setState({ [id]: value })
  }

  render() {
    const { first, last, belt, level } = this.state
    return (
      <Segment basic>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='First'
              id='first'
              value={first}
              onChange={this.handleChange}
              placeholder='First name...' />
            <Form.Field
              control={Input}
              label='Last'
              id='last'
              value={last}
              onChange={this.handleChange}
              placeholder='Last name...' />
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
            <div>
              <Button
                style={{ height: '50%', position: 'relative', marginTop: '50%' }}
                fluid={false}
                compact={true}
                icon='search'
                type='submit'
                onClick={this.handleSubmit} />
            </div>
          </Form.Group>
        </Form>
      </Segment>
    )
  }
}

export default connect()(SearchBar)
