import React, { Component } from 'react'
import { Segment, Form, Button } from 'semantic-ui-react'

class PostingsTableVideosSubForm extends Component {
  default = { title: '', identifier: '', source: '', notes: '' }
  state = { ...this.default }

  handleChange = ( event ) => {
    const { target: { id, data } } = event
    this.setState({ [id]: data })
  }

  cancelForm = () => {
    debugger
  }

  

  render() {
    const { formType } = this.props
    const { title, identifier, source, notes } = this.state
    return (
      <Segment basic>
        <Form.Field>
          <Button.Group size='mini' floated='right'>
            <Button
              icon='plus'
              onClick={this.addVideoFields} />
            <Button
              icon='minus'
              onClick={this.minusVideoFields} />
          </Button.Group>
        </Form.Field>
        <Form.Input
          label='Title'
          id='title'
          value={title}
          onChange={this.handleChange} />
        <Form.Input
          label='Identifier'
          id='identifier'
          value={identifier}
          onChange={this.handleChange} />
        <Form.Input
          label='Source'
          id='source'
          value={source}
          onChange={this.handleChange} />
        <Form.Input
          label='notes'
          id='notes'
          value={notes}
          onChange={this.handleChange} />
      </Segment>
    )
  }
}

export default PostingsTableVideosSubForm
