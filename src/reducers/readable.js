import { SWITCH_READABLE } from '../actions/actionTypes.js'
import { createReducer } from 'redux-action-tools'

const switchReadable = (state, action) => {
    return action.payload.readable
}
const readable = createReducer()
    .when(SWITCH_READABLE, switchReadable)
    .build('noRead')

export default readable