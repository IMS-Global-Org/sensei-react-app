import React from 'react'
import styled from 'styled-components'

const Week = styled.div`
  display: inline-flex;
  flex-direction: row;
  border: none;
  border-top: 1px solid lightgrey;
`
const FirstWeek = Week.extend`
  border: none;
`
const LastWeek = Week.extend`
`

const CalendarWeek = ({ week, weekType }) => {
  if( weekType === 'FirstWeek' ) {
    return (
      <FirstWeek>
        { week }
      </FirstWeek>
    )
  } else if( weekType === 'Week' ) {
    return (
      <Week>
        { week }
      </Week>
    )
  } else if( weekType === 'LastWeek' ) {
    return (
      <LastWeek>
        { week }
      </LastWeek>
    )
  }
}

export default CalendarWeek
