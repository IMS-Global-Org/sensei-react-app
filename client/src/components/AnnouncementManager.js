import React from 'react'
import { Route } from 'react-router-dom'
import AnnouncementEdit from './AnnouncementEdit'
import AnnouncementCreate from './AnnouncementCreate'

const AnnouncementManager = () => (
  <Route exact path='/announcements/edit' component={AnnouncementEdit} />
  <Route exact path='/announcements/create' component={AnnouncementCreate} />
)
export default AnnouncementManager
