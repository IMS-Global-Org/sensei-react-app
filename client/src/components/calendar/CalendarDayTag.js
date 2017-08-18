import React from 'react'
import styled from 'styled-components'

const DayTag = styled.div`
  width: 2rem;
  text-align: center;
  border-right: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  border-radius: 0 0 5px 0;
`

const CalendarDayTag = ({ day }) => {
  return (
    <DayTag>
      { day }
    </DayTag>
  )
}

export default CalendarDayTag
