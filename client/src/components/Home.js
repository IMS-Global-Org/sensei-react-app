import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return(
      <Grid columns={3}>
        <Grid.Column width={3}>
          Links Area
        </Grid.Column>
        <Grid.Column width={9}>
          Main Area
        </Grid.Column>
        <Grid.Column width={4}>
          Announcements
        </Grid.Column>
      </Grid>
    )
  }
}

export default Home;
