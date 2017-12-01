import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Announcements from '../announcements/Announcements'
import HomePage from './HomePage'

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
