import { SWITCH_CATEGORY } from '../actions/actionTypes.js'
import { createReducer } from 'redux-action-tools'

const switchCategory = (state, action) => {
    return action.payload.category
}
const category = createReducer()
    .when(SWITCH_CATEGORY, switchCategory)
    .build('all')

export default category