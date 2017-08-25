import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'
import styled from 'styled-components'
import {
  updateProgram,
  createProgram,
} from '../../actions/programs'

// Custom Components
const Spacer = styled.div`
  display: inline-block;
  width: 3rem !important;
`

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
      ...nextProps.formDataObject
    })
  }

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(updateProgram)
    this.props.closeActiveForm()
  }

  handleClearForm = () => this.setState({ ...this.defaults })
  handleOnChange = ({target: {id,value}}) => this.setState({ [id]:value })

  render() {
    const { title, description, level, num_req } = this.state
    return (
      <Segment>
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
            <Form.Input
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
            { num_req &&
              <div style={{ display: 'inline-block' }}>
                <label>
                  Program has&nbsp;{num_req}&nbsp;requirements.
                  Modify them by:
                </label>
                <Spacer />
                <Button.Group size='mini'>
                  <Button>Editing</Button>
                  <Button.Or />
                  <Button>Deleting</Button>
                  <Button.Or />
                  <Button>Newly Creating</Button>
                </Button.Group>
                <Spacer />
              </div>
            }
            <Button.Group size='mini' floated='right'>
              <Button type='submit' color='green'>
                { this.state.id ? 'Update' : 'Create' }
              </Button>
              <Button
                type='button'
                color='red'
                onClick={this.props.closeActiveForm}>
                Cancel
              </Button>
              <Button
                type='button'
                color='orange'
                onClick={this.handleClearForm}>
                Clear
              </Button>
            </Button.Group>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

export default connect()(ProgramForm)
