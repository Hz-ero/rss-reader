import { combineReducers } from 'redux-immutable';
import { todos } from './todos'
import rss from './rss'

const appReducer = combineReducers({
    todos,
    rss
})

export default appReducer