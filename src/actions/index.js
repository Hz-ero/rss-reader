// 定义常量
import { createAction, createAsyncAction } from 'redux-action-tools'
import * as types from './actionTypes'

// Fn: xml --> js obj
const ParseString = require('xml2js').parseString


let nextTodoId = 0
export const addTodo = todo => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  todo,
})
export const deleteTodo = createAction(types.DELETE_TODO)

// rss资源
const rssSource = ['ithome', '36kr', 'ifanr']

/**
 * 将异步函数转为Promise表达
 * ParseString：异步函数，将xml转化为JS对象
 * @param {any} xml // xml string
 * @returns {Promise}  // resolve/reject
 */
const PromiseParse = xml => new Promise((resolve, reject) => {
  ParseString(xml, (err, result) => {
    if (result) {
      resolve(result)
    } else {
      reject(err)
    }
  })
})

/**
 * fetch rss源，进行处理解析 
 * @param {any} source // rss源
 * @returns {Promise}  // resolve/reject
 */
const getRss = source => fetch(`/fetch/${source}`)
  .then(res => res.text())
  .then(xmlText => PromiseParse(xmlText))
  .then(parseResult => [source, parseResult])
  .catch(() => {
    console.error(`fetch rss: ${source} fail!`);
  })

/**
 * fetch三个rss资源 
 * @returns {Map}  // resolve/reject
 */
const handleFetchRss = () => {
  // 生成Promise数组
  const promiseArray = rssSource.map(source => getRss(source))

  return Promise.all(promiseArray)
    .then((values) => {
      // 将数据生成Map类返回
      const mapValues = new Map(values)
      return mapValues
    })
    .catch(() => {
      console.error(`Promise all fail!`);
    })
}

export const fetchRSS = createAsyncAction(types.FETCH_RSS, handleFetchRss)
export const panelPop = createAction(types.PANEL_POP)
export const panelUnPop = createAction(types.PANEL_UN_POP)
export const switchCategory = createAction(types.SWITCH_CATEGORY)
export const switchReadable = createAction(types.SWITCH_READABLE)
export const setAllReaded = createAction(types.SET_ALL_READED)
