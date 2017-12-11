import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'
import {
  updateProgram,
  createProgram,
  deleteProgram,
} from '../../actions/programs'


class ProgramForm extends Component {
  defaults = { id: '', title: '', description: '', level: '', num_req: '' }
  state = { ...this.defaults }

  componentDidMount = () => {
    this.setState({
      ...this.props.formDataObject
    })
  }

  componentWillReceiveProps = ( nextProps ) => {
    this.setState({
      ...this.defaults,
      ...nextProps.formDataObject,
    })
  }

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    if( this.state.id )
      dispatch(updateProgram(this.state))
    else
      dispatch(createProgram(this.state))
    this.props.closeActiveForm()
  }

  handleClearForm = () => this.setState( this.defaults )
  handleOnChange = ({target: {id,value}}) => this.setState({ [id]:value })

  handleDeleteProgram = () => {
    const { id } = this.state
    const { dispatch } = this.props
    dispatch(deleteProgram(id))
    this.props.closeActiveForm()
  }

  //====================================================
  // Methods for working with program requirements
  //====================================================

  render() {
    const { id, title, description, level } = this.state
    return (
      <Form onSubmit={this.handleOnSubmit}>
        <Form.Field>
          <label>Title</label>
          <Form.Input
            id='title'
            value={title}
            placeholder='A really Cool Title'
            onChange={this.handleOnChange} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Form.TextArea
            id='description'
            value={description}
            onChange={this.handleOnChange} />
        </Form.Field>
        <Form.Field>
          <label>Level</label>
          <Form.Input
            id='level'
            value={level}
            onChange={this.handleOnChange} />
        </Form.Field>
        <Segment basic clearing>
          <Button.Group size='mini' floated='right'>
            <Button type='submit' color='green'>
              { this.state.id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.handleDeleteProgram}>
              Delete
            </Button>
            <Button.Or />
            <Button
              type='button'
              color='red'
              onClick={this.props.closeActiveForm}>
              Cancel
            </Button>
            <Button.Or />
            <Button
              active={ id === '' ? false : true }
              type='button'
              color='orange'
              onClick={this.handleClearForm}>
              Create New
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(ProgramForm)
