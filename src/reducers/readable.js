import { createReducer } from 'redux-action-tools'
import { SWITCH_READABLE } from '../actions/actionTypes'

// 初始状态
// 设置：已读文章；未读文章；全部文章
const stateInit = 'noRead' 

const switchReadable = (state, action) => action.payload.readable

const readable = createReducer()
  .when(SWITCH_READABLE, switchReadable)
  .build(stateInit)

export default readable
