import React from 'react'
import { Switch, Route } from 'react-router-dom'
import AnnouncementEdit from './AnnouncementEdit'
import AnnouncementCreate from './AnnouncementCreate'

/**
 * Higher Order Component (HOC) that functions as a simple switch for routes
 * relating to the various aspects of announcement creation and edititing
 */
const AnnouncementManager = () => (
  <Switch>
    <Route exact path='/announcements/edit' component={AnnouncementEdit} />
    <Route exact path='/announcements/create' component={AnnouncementCreate} />
  </Switch>
)
export default AnnouncementManager
