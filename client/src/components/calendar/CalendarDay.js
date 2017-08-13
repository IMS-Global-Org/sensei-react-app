import React from 'react'
import styled from 'styled-components'
import CalendarDayTag from './CalendarDayTag'

// Custom Styled Components
const WeekDay = styled.div`
  width: calc(100%/7);
  height: 100px;
  border-right: 1px solid grey;
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
      <WeekDay>
        <CalendarDayTag day={day.date()} />
      </WeekDay>
    )
  } else if( dayType === 'FirstWeekDay' ) {
    return (
      <FirstWeekDay>
        <CalendarDayTag day={day.date()} />
      </FirstWeekDay>
    )
  } else if( dayType === 'LastWeekDay' ) {
    return (
      <LastWeekDay>
        <CalendarDayTag day={day.date()} />
      </LastWeekDay>
    )
  }
}

export default CalendarDay
