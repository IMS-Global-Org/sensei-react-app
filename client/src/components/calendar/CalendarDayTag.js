import React from 'react'
import styled from 'styled-components'

const DayTag = styled.div`
  width: 2rem;
  padding: 0.5rem 1rem;
`

const CalendarDayTag = ({ day }) => {
  return (
    <DayTag>
      { day }
    </DayTag>
  )
}

export default CalendarDayTag
