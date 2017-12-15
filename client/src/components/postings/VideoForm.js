import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'

// Actions
import {
  updateVideo,
  createVideo,
  deleteVideo,
} from '../../actions/postings'


class VideoForm extends Component {
  defaults = {
    id: '', title: '', identifier: '', source: '', notes: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadVideo(this.props)
  componentWillReceiveProps = ( props ) => this.loadVideo(props)
  loadVideo = ( props ) => {
    const { data: video } = props
    const { id } = this.state
    if( video && video.id !== id ) {
      this.setState({ ...video })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onClear = () => this.setState({ ...this.defaults })
  onDelete = () => this.props.dispatch(deleteVideo(this.state.id))
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, stepCompleted } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updateVideo(this.state))
    } else {
      dispatch(createVideo(this.state))
    }
    stepCompleted(2)
  }

  render = () => {
    const { id, title, identifier, source, notes } = this.state
    return (
      <Form>
        <Form.Input
          label='Title'
          id='title'
          value={title}
          required
          onChange={this.onInputChange} />
        <Form.Input
          label='Identifier'
          id='identifier'
          value={identifier}
          required
          onChange={this.onInputChange} />
        <Form.Input
          label='Source'
          id='source'
          value={source}
          required
          onChange={this.onInputChange} />
        <Form.Input
          label='Notes'
          id='notes'
          value={notes}
          onChange={this.onInputChange} />
        <Segment basic textAlign='right'>
          <Button.Group size='mini'>
            <Button
              type='submit'
              onClick={this.onSubmit}>
              { id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              disabled={ id ? false : true }
              onClick={this.onClear}>
              Clear Form
            </Button>
            <Button.Or />
            <Button
              type='button'
              disabled={ id ? false : true }
              onClick={this.onDelete}>
              Delete
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(VideoForm)
