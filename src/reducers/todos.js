import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from '../actions/actionTypes.js'
import { List } from 'immutable'

const makeReducerCreator = (initState, handlers) => {
    return (state = List(initState), action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }        
    }
}

const handle_addTodo = (state, action) => {
    return state.push({
        id: action.id,
        todo: action.todo
    })
}

const handle_editTodo = (state, action) => {
    // do some
}

const handle_deleteTodo = (state, action) => {
    // do some
    const delIndex = state.findIndex(item => {
        return item.id === action.id
    })
    return state.splice(delIndex, 1)
}

const handles = {
    [ADD_TODO] : handle_addTodo,
    [EDIT_TODO] : handle_editTodo,
    [DELETE_TODO] : handle_deleteTodo
}

export const todos = makeReducerCreator([], handles)