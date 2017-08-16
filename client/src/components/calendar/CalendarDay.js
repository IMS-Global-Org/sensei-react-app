import React from 'react'
import styled from 'styled-components'
import CalendarDayTag from './CalendarDayTag'
import CalendarEvent from './CalendarEvent'

// Custom Styled Components
const WeekDay = styled.div`
  width: calc(100%/7);
  height: 100px;
  overflow: auto;
  border-right: 1px solid grey;
  ${ props => props.activeDay && 'background-color: #f2f2f2;' }
`
const LastWeekDay = WeekDay.extend`
  border-right: none;
`
const FirstWeekDay = WeekDay.extend`
  border-left: none;
`

/**
 * Simple Registrar for dynamic component instantiation
 * FIXME create the styles in the registrar itself
 */
const registrar = {
  'WeekDay': WeekDay,
  'LastWeekDay': LastWeekDay,
  'FirstWeekDay': FirstWeekDay
}

/**
 * Creates the component that is displayed for each day
 * @param {Moment} day - 'moment' object for the given day with 'events' array
 * @param {String} dayType - representation of the weekday to be shown
 */
const CalendarDay = ({ day, dayType }) => {
  const Day = registrar[dayType]
  return (
    <Day activeDay={ day.activeDay }>
      <CalendarDayTag day={day.date()} />
      { day.events && day.events.map( event =>
        <CalendarEvent event={event} />
      )}
    </Day>
  )
}

export default CalendarDay
