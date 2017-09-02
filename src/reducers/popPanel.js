import { createReducer } from 'redux-action-tools'
import { PANEL_POP, PANEL_UN_POP } from '../actions/actionTypes'

const stateInit = {
  article: {},
  visible: false,
}

const handlePanelPop = (state, action) => ({
  article: action.payload.articleItem,
  visible: true,
})

const handlePanelUnPop = () => ({
  article: {},
  visible: false,
})

const popPanel = createReducer()
  .when(PANEL_POP, handlePanelPop)
  .when(PANEL_UN_POP, handlePanelUnPop)
  .build(stateInit)

export default popPanel
