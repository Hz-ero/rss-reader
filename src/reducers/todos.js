import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from '../actions/actionTypes.js'
import reducerCreator from './reducerCreator'
import { List } from 'immutable'

const handle_addTodo = (state, action) => {
    const newState = List(state)
    return newState.push({
        id: action.id,
        todo: action.todo
    })
}

const handle_editTodo = (state, action) => {
    // do some
}

const handle_deleteTodo = (state, action) => {
    const newState = List(state)
    // do some
    const delIndex = newState.findIndex(item => {
        return item.id === action.id
    })
    return newState.splice(delIndex, 1)
}

const handles = {
    [ADD_TODO] : handle_addTodo,
    [EDIT_TODO] : handle_editTodo,
    [DELETE_TODO] : handle_deleteTodo
}

export const todos = reducerCreator([], handles)