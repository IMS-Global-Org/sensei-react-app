import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Announcements from './Announcements'
import HomePage from './HomePage'


// Custom Components
// const Dragons = styled.div`
//   background-image: url('BorderDragons.png');
//   background-repeat: repeat-y !important;
//   background-position: 1% 0%;
//   background-size: auto 25% !important;
//   height: 110vh;
// `

class Home extends Component {
  render() {
    return(
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
    )
  }
}

export default Home;
