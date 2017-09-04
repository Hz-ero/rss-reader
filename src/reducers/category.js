import { createReducer } from 'redux-action-tools'
import { SWITCH_CATEGORY } from '../actions/actionTypes'

// 初始状态
// 读取rss源：all；ithome；36kr；ifanr
const stateInit = 'all' 

const sources = ['all', 'ithome', '36kr', 'ifanr']
const switchCategory = (state, action) => {
  const checkCategory = sources.find(source => {
    return source === action.payload.category
  })
  if (!checkCategory) {
    throw new Error('rss source out of value')
  } else {
    return action.payload.category
  }
}

const category = createReducer()
  .when(SWITCH_CATEGORY, switchCategory)
  .build(stateInit)

export default category
