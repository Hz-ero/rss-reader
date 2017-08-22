import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from '../actions/actionTypes.js'

const makeReducerCreator = (initState, handlers) => {
    return (state = initState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action)
        } else {
            return state
        }        
    }
}

const handle_addTodo = (state, action) => {
    let id = state.length || 0
    return [
        ...state,
        {
            id,
            todo: action.todo
        }
    ]
}

const handle_editTodo = (state, action) => {
    // do some
}

const handle_deleteTodo = (state, action) => {
    // do some
    const newState = [...state]
    newState.splice(action.id, 1)
    return newState
}

const handles = {
    [ADD_TODO] : handle_addTodo,
    [EDIT_TODO] : handle_editTodo,
    [DELETE_TODO] : handle_deleteTodo
}

export const todos = makeReducerCreator({}, handles)