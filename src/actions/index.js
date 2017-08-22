// 定义常量
import {
    ADD_TODO,
    EDIT_TODO,
    DELETE_TODO
} from './actionTypes.js'

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

export const addTodo = makeActionCreator(ADD_TODO, 'todo')
export const deleteTodo = makeActionCreator(DELETE_TODO, 'id')