import React from 'react'
import styled from 'styled-components'

const FirstWeek = styled.div`
  display: inline-flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
`
const LastWeek = FirstWeek.extend`
  border-bottom: none;
`
const Week = FirstWeek.extend`
  border-bottom: 1px solid blue;
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
