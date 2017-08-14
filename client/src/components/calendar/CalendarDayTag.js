import React from 'react'
import styled from 'styled-components'

const DayTag = styled.div`
  width: 2rem;
  text-align: center;
  border-right: 1px solid grey;
  border-bottom: 1px solid grey;
`

const CalendarDayTag = ({ day }) => {
  return (
    <DayTag>
      { day }
    </DayTag>
  )
}

export default CalendarDayTag
