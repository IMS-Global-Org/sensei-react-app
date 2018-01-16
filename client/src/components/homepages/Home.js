import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import Announcements from '../announcements/Announcements'
import HomePage from './HomePage'
import styled from 'styled-components'

// Custom Styled Components
const HomePageContainer = styled(Segment)`
  width: 80%;
  margin: 0 10% !important;
`

const Home = () => (
  <HomePageContainer>
    <Grid>
      <Grid.Row columns={1}>
        <Grid.Column width={16}>
          Welcome Message
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={12}>
          <HomePage />
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment basic>
            <Header as='h1' textAlign='center'>
              <Header.Content>
                Announcements
              </Header.Content>
              <Header.Subheader>
                Activities
              </Header.Subheader>
            </Header>
            <Announcements />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </HomePageContainer>
)

export default Home;
