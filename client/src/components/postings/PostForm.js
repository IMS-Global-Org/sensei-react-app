import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'

import {
  createPost,
  updatePost,
  deletePost,
} from '../../actions/postings'

class PostForm extends Component {
  defaults = {
    id: '', title: '', message: ''
  }
  state = { ...this.defaults }

  componentDidMount = () => this.loadPost(this.props)
  componentWillReceiveProps = ( props ) => this.loadPost(props)
  loadPost = ( props ) => {
    const { data: post } = props
    const { id } = this.state
    if( post && id !== post.id ) {
      this.setState({ ...post })
    }
  }

  onInputChange = ({target: {id,value}}) => this.setState({ [id]: value })
  onClear = () => this.setState({ ...this.defaults })
  onDelete = () => {
    this.props.dispatch(deletePost(this.state.id))
    this.props.closeModal(true)
  }
  onSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch, stepCompleted, closeModal } = this.props
    const { id } = this.state
    if( id ) {
      dispatch(updatePost(this.state))
    } else {
      dispatch(createPost(this.state))
    }
    if( stepCompleted ) { stepCompleted(1) }
    if( closeModal ) { closeModal() }
  }

  render = () => {
    const { id, title, message } = this.state
    return (
      <Form>
        <Form.Input
          label='Title'
          id='title'
          required
          value={title}
          onChange={this.onInputChange} />
        <Form.Input
          label='Message'
          id='message'
          required
          value={message}
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
              disabled={ title ? false : true }
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

// const mapStateToProps = ( state, props ) => {
//   return {
//     post: state.tablePostings.activePosting,
//   }
// }

export default connect()(PostForm)
