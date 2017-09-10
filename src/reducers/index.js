import { combineReducers } from 'redux-immutable'
import rss from './rss'
import category from './category'
import readable from './readable'
import popPanel from './popPanel'

const appReducer = combineReducers({
  rss,
  category,
  readable,
  popPanel
})

export default appReducer
