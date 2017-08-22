import { combineReducers } from 'redux-immutable';
import { todos } from './todos'

const appReducer = combineReducers({
    todos
})

export default appReducer