import { createReducer } from 'redux-action-tools'
import { PANEL_POP, PANEL_UN_POP } from '../actions/actionTypes'

// 初始状态
const stateInit = {
  article: {},    // 储存需要展示的文章对象
  visible: false, // flag:是否展示
}

// state --> newState
const handlePanelPop = (state, action) => ({
  article: action.payload.articleItem,
  visible: true,
})

// state --> newState
const handlePanelUnPop = () => ({
  article: {},
  visible: false,
})

const popPanel = createReducer()
  .when(PANEL_POP, handlePanelPop)
  .when(PANEL_UN_POP, handlePanelUnPop)
  .build(stateInit)

export default popPanel
