import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import announcements from './announcements'
import postings from './homePage'
import tablePostings from './postings'

const rootReducer = combineReducers({
  tablePostings,
  postings,
  announcements,
  user,
  flash,
})

export default rootReducer
