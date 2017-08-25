import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import announcements from './announcements'
import postings from './homePage'
import tablePostings from './postings'
import calendar from './calendar/calendar'
import programs from './programs'

const rootReducer = combineReducers({
  programs,
  calendar,
  tablePostings,
  postings,
  announcements,
  user,
  flash,
})

export default rootReducer
