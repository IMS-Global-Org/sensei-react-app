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
`

/**
 * Calendar that displays the current martial arts training schedules
 * @author Brennick Langston
 * @version 0.0.1
 */
class Calendar extends Component {
  state = {
    // default dates for initializing the calendar
    dates: {
      start: moment.utc().subtract( 1, 'hour' ),
      end: moment.utc().add( 1, 'hour' ),
    },
  }

  /**
   * Initialize the calendar data and attributes
   */
  // componentDidMount = () => {
    // let { calendar, dispatch } = this.props
    // // retrieve the remote set of schedule items for the calendar
    // if( !calendar.events || calendar.events.length <= 0 ) {
    //   dispatch(indexCalendar( this.state.dates ))
    // }
  // }

  /**
   * Calendar Functions
   */

  currentCalendarMonth = () => {
    let curr = {}
    curr.today = moment.utc()
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
    return calendarDays
  }

  /**
   * Sets the current calendar day of the month
   * @param {Moment} current - today
   * @param {Array} calendarDays - container for new components
   */
  fillCurrentDayOfMonth = ( current, calendarDays ) => {
    calendarDays.push( current.clone() )
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

  generateWeekDays = ( calendarDays ) => {
    let range = 7
    let weekDays = []
    let start = 0
    let finish = range
    while( start <= calendarDays.length ) {
      weekDays.push( calendarDays.slice( start, finish ) )
      start = finish
      finish += range
    }
    return weekDays
  }

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

  generateCalendar = () => {
    return (
      <CalendarArea>
        { this.generateCalendarWeeks() }
      </CalendarArea>
    )
  }


  render() {
    return (
      <Container>
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
