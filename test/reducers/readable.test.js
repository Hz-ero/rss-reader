import readable from '../../src/reducers/readable'
import * as types from '../../src/actions/actionTypes'

describe('reducer: readable', () => {
  // 初始状态
  // 设置：已读文章；未读文章；全部文章
  const stateInit = 'noRead'
  const readOptions = ['noRead', 'readed', 'all']

  test('no action; should return stateInit', () => {
    expect(readable()).toEqual(stateInit)
  })

  test('handle action: SWITCH_READABLE; newState be value in readOptions', () => {
    readOptions.map(option => {
      const testAction = {
        type: types.SWITCH_READABLE,
        payload: {readable: option}
      }

      expect(readable(stateInit, testAction)).toEqual(option)
    })
  })

  test('handle action: SWITCH_READABLE; throw error if action dont have readable option', () => {
    const testAction = {
      type: types.SWITCH_READABLE,
      payload: {something: 'something'}
    }

    expect(() => readable(stateInit, testAction)).toThrow('action dont have readable option!')
  })
})
