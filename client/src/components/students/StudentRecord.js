import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Input, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

// Actions
import {
  showStudent,
  updateStudent,
  createStudent,
  deleteStudent,
  inactivateStudent,
  clearStudent,
} from '../../actions/students'

class StudentRecord extends Component {
  defaults = {
    first: '', last: '', birthday: '',
    gender: '', belt: '', level: '',
    photo: '', id: '',
  }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { student, studentId } = this.props
    if( studentId <= 0 ) {
      this.setState({ ...this.defaults })
    } else if( studentId > 0 ) {
      this.loadStudent( studentId )
    } else if( student && student.first ) {
      this.setState({ ...student })
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    const { id } = this.state
    const { studentId, student } = nextProps
    if( studentId <= 0) {
      this.setState({ ...this.defaults })
    } else if( studentId !== id ) {
      this.loadStudent( studentId )
    } else if( student && student.first ) {
      this.setState({ ...student })
    }
  }

  componentWillUnmount = () => this.props.dispatch(clearStudent())

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

  handleInactivateStudent = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(inactivateStudent(this.state.id))
    this.props.handleCancelForm()
  }

  handleDeleteStudent = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    dispatch(deleteStudent(this.state.id))
    this.props.handleCancelForm()
  }

  handleDateChange = ( moment ) => {
    this.setState({ birthday: moment.utc().format('YYYY/MM/DD') })
  }

  render() {
    const { id, first, last, birthday, gender, belt, level } = this.state
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
            control={DatePicker}
            dateFormat="YYYY/MM/DD"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            label='Birthday'
            id='birthday'
            value={birthday}
            placeholder='Birthday...'
            onChange={this.handleDateChange} />
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
              onClick={this.handleDeleteStudent}>
              Delete
            </Button>
            <Button.Or />
            <Button
              type='button'
              disabled={true}
              onClick={this.handleInactivateStudent}>
              Inactivate
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.handleClearForm}>
              New Form
            </Button>
            <Button.Or />
            <Button
              type='button'
              onClick={this.props.handleCancelForm}>
              Cancel
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
