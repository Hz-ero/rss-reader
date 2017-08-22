import { combineReducers } from 'redux'
import { todos } from './todos'

const appReducer = combineReducers({
    todos
})

export default appReducer