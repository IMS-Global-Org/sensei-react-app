import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Form, Button } from 'semantic-ui-react'
import moment from 'moment'
import Datetime from 'react-datetime'
import WeekdaysSelector from './WeekdaysSelector'

// Actions
import {
  showCalendarEvent,
  clearCalendar,
  updateCalendarEvent,
  createCalendarEvent,
} from '../../actions/calendar/calendar'

class EventEditorForm extends Component {
  defaults = {
    start: '', finish: '',
    title: '', category: '',
    weekday: '',
    description: '', id: null,
  }
  state = { ...this.defaults }

  componentDidMount = () => {
    const { dispatch, eventId } = this.props
    const { id } = this.state
    if( eventId && eventId !== id  ) {
      dispatch(showCalendarEvent(eventId))
    }
  }

  componentWillReceiveProps = ( nextProps ) => {
    const { activeEvent, eventId: newId, dispatch } = nextProps
    const { id } = this.state
    if( newId !== id ) {
      this.setState({ id: newId },()=>{
        dispatch(showCalendarEvent(newId))
      })
    } else if( activeEvent ){
      activeEvent.start = moment.utc(activeEvent.start)
      activeEvent.finish = moment.utc(activeEvent.finish)
      this.setState({ ...activeEvent })
    }
  }

  componentWillUnmount = () => {
    const { dispatch } = this.props
    dispatch(clearCalendar())
  }

  handleStartTime = ( start ) => { this.setState({ start }) }
  handleFinishTime = ( finish ) => { this.setState({ finish }) }
  handleInputChange = ( event ) => {
    const { target: { id, value } } = event
    this.setState({ [id]: value })
  }
  clearForm = () => { this.setState({ ...this.defaults })}

  handleOnSubmit = ( event ) => {
    event.preventDefault()
    const { dispatch } = this.props
    const calEvent = this.state
    delete calEvent.weekday
    calEvent.weekday_attributes = this.weekdayRef.checkedWeekday()
    if( calEvent.id ) {
      dispatch(updateCalendarEvent(calEvent))
    } else {
      dispatch(createCalendarEvent(calEvent))
    }
  }

  updateWeekday = ( weekday ) => this.setState({ weekday })

  render() {
    const {
      id, start, finish, title,
      category, description, weekday,
    } = this.state
    return (
      <Segment>
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <label>Start Date</label>
              <Datetime
                value={start}
                onChange={this.handleStartTime} />
            </Form.Field>
            <Form.Field>
              <label>End Date</label>
              <Datetime
                value={finish}
                onChange={this.handleFinishTime} />
            </Form.Field>
            <Form.Field>
              <label>Category</label>
              <Form.Input
                id='category'
                value={category}
                onChange={this.handleInputChange} />
            </Form.Field>
          </Form.Group>
          <WeekdaysSelector
            weekday={weekday}
            updateWeekday={this.updateWeekday}
            ref={ node => this.weekdayRef = node } />
          <Form.Field>
            <label>Title</label>
            <Form.Input
              id='title'
              value={title}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Form.TextArea
              id='description'
              value={description}
              onChange={this.handleInputChange} />
          </Form.Field>
          <Segment basic textAlign='right'>
            <Button.Group size='tiny'>
              <Button color='orange' onClick={this.handleOnSubmit}>
                { id ? 'Update' : 'Create' }
              </Button>
              <Button color='red' onClick={this.clearForm}>
                Cancel
              </Button>
            </Button.Group>
            {' '}
            <Button.Group size='tiny'>
              <Button color='green' onClick={this.clearForm}>
                New Event
              </Button>
            </Button.Group>
          </Segment>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = ( state ) => {
  return {
    activeEvent: state.calendar.activeEvent
  }
}

export default connect(mapStateToProps)(EventEditorForm)
