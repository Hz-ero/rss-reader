import { createReducer } from 'redux-action-tools'
import { SWITCH_READABLE } from '../actions/actionTypes'

const switchReadable = (state, action) => action.payload.readable

const readable = createReducer()
  .when(SWITCH_READABLE, switchReadable)
  .build('noRead')

export default readable
