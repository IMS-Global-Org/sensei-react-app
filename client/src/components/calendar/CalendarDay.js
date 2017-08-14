import React from 'react'
import styled from 'styled-components'
import CalendarDayTag from './CalendarDayTag'

// Custom Styled Components
const WeekDay = styled.div`
  width: calc(100%/7);
  height: 100px;
  border-right: 1px solid grey;
  ${ props => props.activeDay && 'background-color: #f2f2f2;' }
`
const LastWeekDay = WeekDay.extend`
  border-right: none;
`
const FirstWeekDay = WeekDay.extend`
  border-left: none;
`

const CalendarDay = ({ day, dayType }) => {
  if( dayType === 'WeekDay' ){
    return (
      <WeekDay activeDay={day.activeDay}>
        <CalendarDayTag day={day.date()} />
      </WeekDay>
    )
  } else if( dayType === 'FirstWeekDay' ) {
    return (
      <FirstWeekDay activeDay={day.activeDay}>
        <CalendarDayTag day={day.date()} />
      </FirstWeekDay>
    )
  } else if( dayType === 'LastWeekDay' ) {
    return (
      <LastWeekDay activeDay={day.activeDay}>
        <CalendarDayTag day={day.date()} />
      </LastWeekDay>
    )
  }
}

export default CalendarDay
