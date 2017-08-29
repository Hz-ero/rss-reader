// 定义常量
import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO,
    FETCH_RSS
} from './actionTypes.js'
import { createAction, createAsyncAction } from 'redux-action-tools'


let nextTodoId = 0
export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    todo
})
export const deleteTodo = createAction(DELETE_TODO)


export const fetchRSS = createAsyncAction(FETCH_RSS, ()=>{
    return Promise.resolve(44)
})