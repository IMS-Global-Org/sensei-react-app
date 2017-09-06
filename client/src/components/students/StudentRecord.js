import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Input, Button } from 'semantic-ui-react'

// Actions
import {
  showStudent,
  updateStudent,
  createStudent,
} from '../../actions/students'


// TODO: date selector for the birthdate field of the form
class StudentRecord extends Component {
  defaults = {
    first: '', last: '', birthday: '',
    gender: '', belt: '', level: '',
    photo: '', id: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { student, studentId } = this.props
    if( studentId > 0 && !student.first ) {
      this.loadStudent( studentId )
    } else if( student && student.first ) {
      this.setState({ ...student })
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    const { id } = this.state
    const { studentId, student } = nextProps
    if( id && studentId !== id ) {
      this.loadStudent( studentId )
    } else if( student && student.first ) {
      this.setState({ ...student })
    }
  }


  loadStudent = ( studentId ) => {
    const { student, dispatch } = this.props
    if( studentId && (!student || !student.fist) ) {
      dispatch(showStudent( studentId ))
      this.setState({ id: studentId })
    }
  }

  handleChange = ( event ) => {
    const { target: { id, value } } = event
    this.setState({ [id]: value })
  }

  handleClearForm = () => this.setState({ ...this.defaults })

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    if( this.state.id ) {
      dispatch(updateStudent(this.state))
    } else {
      dispatch(createStudent(this.state))
    }
  }

  render() {
    const { id, first, last, birthday, gender, belt, level, photo } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='First'
            id='first'
            value={first}
            placeholder='First Name...'
            onChange={this.handleChange} />
          <Form.Field
            control={Input}
            label='Last'
            id='last'
            value={last}
            placeholder='Last Name...'
            onChange={this.handleChange} />
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field
            control={Input}
            label='Birthday'
            id='birthday'
            value={birthday}
            placeholder='Birthday...'
            onChange={this.handleChange} />
          <Form.Field
            control={Input}
            label='Gender'
            id='gender'
            value={gender}
            placeholder='Gender...'
            onChange={this.handleChange} />
          <Form.Field
            control={Input}
            label='Belt'
            id='belt'
            value={belt}
            placeholder='Belt...'
            onChange={this.handleChange} />
          <Form.Field
            control={Input}
            label='Level'
            id='level'
            value={level}
            placeholder='Level...'
            onChange={this.handleChange} />
        </Form.Group>
        <Segment basic clearing={true}>
          <Button.Group size='mini' floated='right'>
            <Button type='submit'>
              { id ? 'Update' : 'Create' }
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.props.handleCancelForm}>
              Cancel
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.handleClearForm}>
              New Form
            </Button>
          </Button.Group>
        </Segment>
      </Form>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    student: state.students.student
  }
}

export default connect(mapStateToProps)(StudentRecord)
