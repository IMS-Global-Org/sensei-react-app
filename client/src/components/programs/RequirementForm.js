import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'

// Custom Actions
import {
  updateRequirement,
  createRequirement,
  // clearRequirements,
} from '../../actions/requirements'

class RequirementForm extends Component {
  defaults = { id: '', level: '', title: '', description: '', program_id: '' }
  state = { ...this.defaults }

  componentDidMount = () => {
    this.setRequirement(this.props)
  }

  componentWillReceiveProps = ( nextProps ) => {
    this.setRequirement(nextProps)
  }

  setRequirement = ( props ) => {
    this.setState({
      ...props.requirement,
      program_id: props.programId,
    })
  }

  handleChange = ( event ) => {
    const { target: { id, value } } = event
    this.setState({ [id]: value })
  }

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { id } = this.state
    const { dispatch } = this.props
    if( id ) {
      dispatch(updateRequirement(this.state))
    } else {
      dispatch(createRequirement(this.state))
    }
  }

  // handleCancel = ( event ) => {
  //   event.preventDefault()
  //   const { dispatch } = this.props
  //   dispatch(clearRequirements())
  //   this.setState({ ...this.defaults })
  // }

  handleCreateNew = ( event ) => {
    event.preventDefault()
    this.setState({ ...this.defaults, program_id: this.props.programId })
  }

  handleDelete = ( requirementId ) => {
    this.setState({ ...this.defaults }, () => {
      this.props.deleteRequirement(requirementId)
    })
  }

  render() {
    const { id, level, title, description } = this.state
    return (
      <Form>
        <Form.Field>
          <label>Level</label>
          <Form.Input
            id='level'
            value={level}
            onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Title</label>
          <Form.Input
            id='title'
            value={title}
            onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <Form.Input
            id='description'
            value={description}
            onChange={this.handleChange} />
        </Form.Field>
        <Segment basic clearing>
          <Button.Group size='mini' floated='right'>
            <Button
              type='submit'
              onClick={this.handleSubmit}>
              { id ? 'Update' : 'Create' }
            </Button>
            { id &&
                <Button.Or />
            }
            { id &&
                <Button
                  onClick={() => this.handleDelete(id)}>
                  Delete
                </Button>
            }
            <Button.Or />
            <Button
              onClick={this.handleCreateNew}>
              Create New
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

export default connect()(RequirementForm)
