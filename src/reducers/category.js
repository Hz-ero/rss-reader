import { createReducer } from 'redux-action-tools'
import { SWITCH_CATEGORY } from '../actions/actionTypes'

// 初始状态
// 读取rss源：all；ithome；36kr；ifanr
const stateInit = 'all'

const switchCategory = (state, action) => {
  if (!action.payload.category) {
    throw new Error('action dont have category option!')
  } else {
    return action.payload.category
  }
}

const category = createReducer()
  .when(SWITCH_CATEGORY, switchCategory)
  .build(stateInit)

export default category
