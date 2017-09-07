import popPanel from '../../src/reducers/popPanel'
import * as types from '../../src/actions/actionTypes'

describe('reducer: popPanel', () => {
  // 初始状态
  const stateInit = {
    article: {}, // 储存需要展示的文章对象
    visible: false // flag:是否展示
  }

  test('no action; should return stateInit', () => {
    expect(popPanel()).toEqual(stateInit)
  })

  test('handle action: PANEL_UN_POP', () => {
    const testAction = {
      type: types.PANEL_UN_POP
    }
    const expectState = {
      article: {},
      visible: false
    }
    expect(popPanel(stateInit, testAction)).toEqual(expectState)
  })

  test('handle action: PANEL_POP', () => {
    const testAction = {
      type: types.PANEL_POP,
      payload: {articleItem: '文章'}
    }
    const expectState = {
      article: '文章',
      visible: true
    }
    expect(popPanel(stateInit, testAction)).toEqual(expectState)
  })

  test('handle action: PANEL_POP; throw error if action dont have article Obj', () => {
    const testAction = {
      type: types.PANEL_POP,
      payload: { something: 'something' }
    }

    expect(() => popPanel(stateInit, testAction)).toThrow('action dont have article Obj!')
  })

  
})
