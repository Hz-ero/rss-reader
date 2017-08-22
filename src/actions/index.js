// 定义常量
import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from './actionTypes.js'

let nextTodoId = 0
// Action生成器
const makeActionCreator = (type, ...argNames) => {
    return (...argValues) => {
        let action = {type}
        argNames.map((item, index) => {
            action[item] = argValues[index]
        })
        return action
    }
}
export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    todo
})
export const deleteTodo = makeActionCreator(DELETE_TODO, 'id')