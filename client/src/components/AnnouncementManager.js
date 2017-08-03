import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AnnouncementEdit from './AnnouncementEdit'
import AnnouncementCreate from './AnnouncementCreate'
import { Container } from 'semantic-ui-react'

/**
 * Higher Order Component (HOC) that functions as a simple switch for routes
 * relating to the various aspects of announcement creation and edititing
 */
const AnnouncementManager = () => (
  <Container>
    <Switch>
      <Route exact path='/announcements/edit' component={AnnouncementEdit} />
      <Route exact path='/announcements/create' component={AnnouncementCreate} />
    </Switch>
  </Container>
)
export default AnnouncementManager
