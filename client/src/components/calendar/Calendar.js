import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import styled from 'styled-components'
import moment from 'moment'

// Custom Components
import CalendarWeek from './CalendarWeek'
import CalendarDay from './CalendarDay'

// Custom Actions
import {
  indexCalendar
} from '../../actions/calendar/calendar'

// Custom Styled Components
const CalendarArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border: 1px solid grey;
  border-radius: 0 0 5px 5px;
  background-color: white;
`
const CalendarHeader = CalendarArea.extend`
  flex-direction: row;
  border-bottom: none;
  border-radius: 5px 5px 0 0 ;
`
const HeaderDay = styled.div`
  width: calc(100%/7);
  padding: 1rem 0;
  border-right: ${ props => props.last ? 'none' : '1px solid grey'};
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
`

/**
 * Calendar that displays the current martial arts training schedules
 * @author Brennick Langston
 * @version 0.0.1
 */
class Calendar extends Component {
  state = {
    activeDate: moment.utc()
  }

  /**
   * Initialize the calendar data and attributes
   * FIXME create the database table that will hold the calendar information
   */
  componentDidMount = () => {
    const { activeDate, calendar, dispatch } = this.props
    // retrieve the remote set of schedule events for the calendar
    if( !calendar.events || calendar.events.length <= 0 ) {
      const dates = {}
      const active = activeDate ? activeDate : this.state.activeDate
      dates.start = moment.utc().year(active.year())
        .month(active.month()).day(1)
      dates.finish = moment.utc().year(active.year())
        .month(active.month()).day(active.daysInMonth())
      dispatch(indexCalendar( dates ))
    }
  }

  //===============================================//
  // Calendar Functions
  //===============================================//

  /**
   * Setter method. Sets the information need for creating and displaying the
   * days of the current month on the page. Creates an object with 'moment'
   * objects representing the active days date, the first of the active month,
   * as well as the end of the active month.
   */
  currentCalendarMonth = () => {
    const { activeDate } = this.props
    let curr = {}
    curr.today = activeDate ? activeDate : this.state.activeDate
    curr.start = moment.utc().year(curr.today.year())
      .month(curr.today.month()).date(1)
    curr.end = moment.utc().year(curr.today.year())
      .month(curr.today.month()).date(curr.today.daysInMonth())
    return curr
  }

  /**
   * Loads the days of the calendar month along with days from the previous
   * and next month to finish display of the current month
   * @return {Array} array of CalendarDay components
   */
  generateCalendarDays = () => {
    let calendarDays = []
    const month = this.currentCalendarMonth()
    this.fillCurrentDayOfMonth( month.today, calendarDays )
    this.fillUntilFirstOfMonth( month.today, month.start, calendarDays )
    this.fillUntilLastOfMonth( month.today, month.end, calendarDays )
    // TODO add events to each calendar day that will be displayed
    this.addEventsToDates(calendarDays)
    return calendarDays
  }

  /**
   * Determines which events belong to which day and attaches them accordingly
   * @param {Array} calendarDays - All the days displayed in the calendar view
   */
  addEventsToDates = ( calendarDays ) => {
    let { calendar: { events } } = this.props
    // TODO sort the events in asc order when pulling from the database
    // for every day, find its events
    if( events && events.length > 0 ){
      events.forEach( this.eventToMoments )
      calendarDays.forEach( day => {
        // search only the events upto and including the current day
        let todaysEvents = []
        let good = events.every( event => {
          if( day.isBetween(event.start, event.finish,'day','[]') ) {
            todaysEvents.push( event )
            return true
          } else if( event.start.isAfter(day,'day') ) {
            return false
          }
        })
        if( todaysEvents.length > 0 )
          day.events = todaysEvents
      })
    }
  }

  /**
   * Helper method for converting string timestamps to moment objects
   * @param {Object} event - simple json event object from the database
   */
  eventToMoments = ( event ) => {
    event.start = moment.utc(event.start)
    event.finish = moment.utc(event.finish)
  }

  /**
   * Sets the current calendar day of the month
   * @param {Moment} current - today
   * @param {Array} calendarDays - container for new components
   */
  fillCurrentDayOfMonth = ( current, calendarDays ) => {
    // Mark it as the active day or date
    let activeDate = current.clone()
    activeDate.activeDay = true
    calendarDays.push( activeDate )
  }

  /**
   * Fills the calender days until the first day of the month
   * @param {Moment} current - actual date of today
   * @param {Moment} start - first day of the month
   * @param {Array} calendarDays - container for new components
   */
  fillUntilFirstOfMonth = ( current, start, calendarDays ) => {
    let today = current.clone()
    while( today.subtract(1, 'day').isSameOrAfter(start) ) {
      calendarDays.unshift( today.clone() )
    }
    this.preFillCalendarDays( today, calendarDays )
  }

  /**
   * Fills the calender days until the last day of the month
   * @param {Moment} current - actual date of today
   * @param {Moment} end - last day of the month
   * @param {Array} calendarDays - container for new components
   */
  fillUntilLastOfMonth = ( current, end, calendarDays ) => {
    let today = current.clone()
    while( today.add(1, 'day').isSameOrBefore(end) ) {
      calendarDays.push( today.clone() )
    }
    this.backFillCalendarDays( today, calendarDays )
  }

  /**
   * Pre fills days at the beginning of the month to complete the display of
   * the calendar days.
   * @param {Moment} start - first day of month
   * @param {Array} calendarDays - container for new components
   */
  preFillCalendarDays = ( start, calendarDays ) => {
    while( start.day() < 6 ) {
      calendarDays.unshift( start.clone() )
      start.subtract(1,'day')
    }
  }

  /**
   * Pre fills days at the end of the month to complete the display of
   * the calendar days.
   * @param {Moment} start - last day of month
   * @param {Array} calendarDays - container for new components
   */
  backFillCalendarDays = ( end, calendarDays ) => {
    while( end.day() > 0 ) {
      calendarDays.push( end.clone() )
      end.add(1,'day')
    }
  }

  /**
   * Produces the actual components representing the individual weeks of
   * the month. Each week is condsidered it's own row in the calendar
   */
  generateCalendarWeeks = () => {
    let calendarDays = this.generateCalendarDays()
    let weekDays = this.generateWeekDays(calendarDays)
    return weekDays.map( (days,index) => {
      const week = this.generateCalendarWeek( days )
      if( index === 0 ) {
         return ( <CalendarWeek week={week} weekType='FirstWeek' /> )
      } else if( index === 4 ) {
        return ( <CalendarWeek week={week} weekType='LastWeek' /> )
      } else {
        return ( <CalendarWeek week={week} weekType='Week' /> )
      }
    })
  }

  /**
   * Generate the individual weeks of the active month with the given set
   * set of day.
   * @param {Array} calendarDays - set of days for the given calendar month
   * @return {Array} array of arrays containing 'moment' objects
   */
  generateWeekDays = ( calendarDays ) => {
    let range = 7
    let weekDays = []
    let start = 0
    let finish = range
    while( start < calendarDays.length ) {
      weekDays.push( calendarDays.slice( start, finish ) )
      start = finish
      finish += range
    }
    return weekDays
  }

  /**
   * Does the formatting for the individual days of the week depending
   * on which weekday they represent
   * @param {Array} weekDays - array of 'moment' objects for the given week
   * @return {Array} array of components, one for each day of the week
   */
  generateCalendarWeek = ( weekDays ) => {
    let week = []
    weekDays.forEach( (day,index) => {
      if( index === 0 ) {
        week.push( <CalendarDay day={day} dayType='FirstWeekDay' /> )
      } else if( index === 6 ) {
        week.push( <CalendarDay day={day} dayType='LastWeekDay' />)
      } else {
        week.push( <CalendarDay day={day} dayType='WeekDay' /> )
      }
    })
    return week
  }

  /**
   * Container for the Calendar that will be displayed as a single component
   */
  generateCalendar = () => {
    return (
      <CalendarArea>
        { this.generateCalendarWeeks() }
      </CalendarArea>
    )
  }

  generateCalendarHeader = () => {
    let week = moment.utc()
    return [0,1,2,3,4,5,6].map( day => {
      if( day !== 6 ) {
        return (
          <HeaderDay>
            { week.day(day).format('dddd') }
          </HeaderDay>
        )
      } else {
        return (
          <HeaderDay last>
            { week.day(day).format('dddd') }
          </HeaderDay>
        )
      }
    })
  }

  render() {
    return (
      <Container>
        <CalendarHeader>
          { this.generateCalendarHeader() }
        </CalendarHeader>
        { this.generateCalendar() }
      </Container>
    )
  }
}


const mapStateToProps = ( state, props ) => {
  return {
    calendar: state.calendar,
  }
}

export default connect(mapStateToProps)(Calendar)
