import {
    FETCH_RSS_REQUEST,
    FETCH_RSS_SUCCESS,
    FETCH_RSS_FAIL
} from '../actions/actionTypes.js'
import reducerCreator from './reducerCreator'

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

const handles = {
    [FETCH_RSS_REQUEST]: handle_fetchRssReq,
    [FETCH_RSS_SUCCESS]: handle_fetchRssRes,
    [FETCH_RSS_FAIL]: handle_fetchRssFail
}

const rss = reducerCreator([], handles)

export default rss