import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import styled from 'styled-components'

// import BorderDragons from './images/BorderDragons.png'
const Dragons = styled.div`
  background-image: url('BorderDragons.png');
  background-repeat: repeat-y !important;
  background-position: 1% 0%;
  background-size: auto 25% !important;
  height: 100vh;
`

const Courses = () => {
  return (
    <Dragons>
      <Container>Courses Page</Container>
    </Dragons>
  )
}

export default Courses
