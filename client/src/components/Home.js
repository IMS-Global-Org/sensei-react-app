import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Announcements from './Announcements'
import HomePage from './HomePage'

class Home extends Component {
  render() {
    return(
      <Container>
        <Grid columns={2}>
          <Grid.Column width={11}>
            <HomePage />
          </Grid.Column>
          <Grid.Column width={5}>
            <Announcements />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default Home;
