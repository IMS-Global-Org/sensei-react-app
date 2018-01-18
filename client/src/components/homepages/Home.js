import React from 'react';
import Welcome from './Welcome'
import styled from 'styled-components'

// Custom Styled Components
const HomePageContainer = styled.div`
  width: 80%;
  margin: 0 10% !important;
`

const Home = () => (
  <HomePageContainer>
    <Welcome />
  </HomePageContainer>
)

export default Home;
