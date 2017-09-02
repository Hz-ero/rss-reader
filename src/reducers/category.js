import { createReducer } from 'redux-action-tools'
import { SWITCH_CATEGORY } from '../actions/actionTypes'

const switchCategory = (state, action) => action.payload.category

const category = createReducer()
  .when(SWITCH_CATEGORY, switchCategory)
  .build('all')

export default category
