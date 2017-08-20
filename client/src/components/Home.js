import React, { Component } from 'react';
import { Container, Segment, Grid } from 'semantic-ui-react';
import Announcements from './Announcements'
import HomePage from './HomePage'
import styled from 'styled-components'

// Custom Components
const Dragons = styled.div`
  background-image: url('BorderDragons.png');
  background-repeat: repeat-y !important;
  background-position: 1% 0%;
  background-size: auto 25% !important;
  height: 110vh;
`

class Home extends Component {
  render() {
    return(
      <Dragons>
        <Container>
          <Grid columns={2}>
            <Grid.Column width={12}>
              <HomePage />
            </Grid.Column>
            <Grid.Column width={4}>
              <Announcements />
            </Grid.Column>
          </Grid>
        </Container>
      </Dragons>
    )
  }
}

export default Home;
