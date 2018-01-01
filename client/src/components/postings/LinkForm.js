import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'

// Actions
import {
  updateLink,
  createLink,
  deleteLink,
} from '../../actions/postings'


class LinkForm extends Component {
  defaults = {
    id: '', title: '', url: '', abbreviation: '', description: ''
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadLink(this.props)
  componentWillReceiveProps = ( props ) => this.loadLink( props )
  loadLink = ( props ) => {
    const { data: link } = props
    const { id } = this.state
    if( link && link.id !== id ) {
      this.setState({ ...link })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onClear = () => this.setState({ ...this.defaults })
  onDelete = () => {
     this.props.dispatch(deleteLink(this.state.id))
     this.props.closeModal()
  }
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, closeModal, postId } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updateLink(this.state))
    } else {
      dispatch(createLink(postId, this.state))
    }
    if( closeModal ){ closeModal() }
    this.onClear()
  }

  render = () => {
    const { id, title, url, abbreviation, description } = this.state
    return (
      <Form>
        <Form.Input
          label='Title'
          id='title'
          value={title}
          required
          onChange={this.onInputChange} />
        <Form.Input
          label='URL'
          id='url'
          value={url}
          required
          onChange={this.onInputChange} />
        <Form.Input
          label='Abbreviation'
          id='abbreviation'
          value={abbreviation}
          onChange={this.onInputChange} />
        <Form.Input
          label='Description'
          id='description'
          value={description}
          required
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

export default connect()(LinkForm)
