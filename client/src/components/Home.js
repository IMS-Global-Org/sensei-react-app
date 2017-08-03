import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Announcements from './Announcements'

class Home extends Component {
  render() {
    return(
      <Container>
        <Grid columns={3}>
          <Grid.Column width={3}>
            Links Area
          </Grid.Column>
          <Grid.Column width={8}>
            Main Area
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
