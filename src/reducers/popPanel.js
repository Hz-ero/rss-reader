import { PANEL_POP, PANEL_UN_POP } from '../actions/actionTypes.js'
import { createReducer } from 'redux-action-tools'

const stateInit = {
    article: {},
    visible: false
}

const handlePanelPop = (state, action) => {
    return {
        article: action.payload.articleItem,
        visible: true
    }
}

const handlePanelUnPop = (state, action) => {
    return {
        article: {},
        visible: false
    }
}

const popPanel = createReducer()
    .when(PANEL_POP, handlePanelPop)
    .when(PANEL_UN_POP, handlePanelUnPop)
    .build(stateInit)
    
export default popPanel