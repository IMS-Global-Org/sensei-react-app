import { combineReducers } from 'redux'
import user from './user'
import flash from './flash'
import announcements from './announcements'
import postings from './homePage'

const rootReducer = combineReducers({
  postings,
  announcements,
  user,
  flash,
})

export default rootReducer
