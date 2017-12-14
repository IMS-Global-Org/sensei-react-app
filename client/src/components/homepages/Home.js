import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Announcements from '../announcements/Announcements'
import HomePage from './HomePage'

const Home = () => (
  <Container>
    <Grid>
      <Grid.Row columns={2}>
        <Grid.Column width={12}>
          <HomePage />
        </Grid.Column>
        <Grid.Column width={4}>
          <Announcements />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Container>
)

export default Home;
