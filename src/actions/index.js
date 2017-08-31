// 定义常量
import * as types from './actionTypes.js'
import { createAction, createAsyncAction } from 'redux-action-tools'
// Fn: xml --> js obj
const ParseString = require('xml2js').parseString


let nextTodoId = 0
export const addTodo = (todo) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    todo
})
export const deleteTodo = createAction(types.DELETE_TODO)

// rss资源
const rssSource = ['ithome', '36kr', 'ifanr']

const PromiseParse = (xml) => {
    return new Promise((resolve, reject) => {
        ParseString(xml, (err, result) => {
            if (result) {
                resolve(result)
            } else {
                reject(err)
            }
        })
    })
}

// fetch rss资源，参数：source
const getRss = (source) => {
    return fetch(`/rss/${source}`)
        .then(res => res.text())
        .then(xmlText => PromiseParse(xmlText))
        .then(parseResult => [source, parseResult])
        .catch(()=>{
            console.error(`fetch rss: ${source} fail!`);
        })
}

// fetch三个rss资源，需要返回Promise对象
const handleFetchRss = () => {
    const promiseArray = rssSource.map(source => {
        return getRss(source)
    })

    return Promise.all(promiseArray)
            .then(values => {
                // 将数据生成Map类返回
                const mapValues = new Map(values)
                return mapValues
            })
}

export const fetchRSS = createAsyncAction(types.FETCH_RSS, handleFetchRss)
export const panelPop = createAction(types.PANEL_POP)
export const panelUnPop = createAction(types.PANEL_UN_POP)
export const switchCategory = createAction(types.SWITCH_CATEGORY)
export const switchReadable = createAction(types.SWITCH_READABLE)
export const setAllReaded = createAction(types.SET_ALL_READED)