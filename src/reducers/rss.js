import { FETCH_RSS } from '../actions/actionTypes.js'
import { createReducer } from 'redux-action-tools'

const handle_fetchRssReq = (state, action) => {
    console.log('fet req');
    return state
}

const handle_fetchRssRes = (state, action) => {
    console.log('fet res');
    return state
}

const handle_fetchRssFail = (state, action) => {
    console.log('fet fail');
    return state
}

const rss = createReducer()
    .when(FETCH_RSS, handle_fetchRssReq)
    .done(handle_fetchRssRes)
    .failed(handle_fetchRssFail)
    .build([])

export default rss