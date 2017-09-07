import category from '../../src/reducers/category'
import * as types from '../../src/actions/actionTypes'

const sources = ['all', 'ithome', '36kr', 'ifanr']

describe('reducer: category', () => {
  // 初始状态
  // 读取rss源：all；ithome；36kr；ifanr
  const stateInit = 'all'

  test('no action; should return stateInit', () => {
    expect(category()).toEqual(stateInit)
  })

  test('handle action: SWITCH_CATEGORY; newState be value in sources', () => {
    sources.map(source => {
      const testAction = {
        type: types.SWITCH_CATEGORY,
        payload: { category: source }
      }

      expect(category(stateInit, testAction)).toEqual(source)
    })
  })

  test('handle action: SWITCH_CATEGORY; throw error if action dont have category option', () => {
    const testAction = {
      type: types.SWITCH_CATEGORY,
      payload: { something: 'something' }
    }

    expect(() => category(stateInit, testAction)).toThrow('action dont have category option!')
  })
})
