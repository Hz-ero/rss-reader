import rss, {
  findShortDescrip,
  resolve2html_ithome,
  resolve2html_36kr,
  resolve2html_ifanr
} from '../../src/reducers/rss'
import * as types from '../../src/actions/actionTypes'
import {parse_ithome, parse_36kr, parse_ifanr,
  expect_ithome, expect_36kr, expect_ifanr} from './testParseData.js'

const stateInit = [] // 设置：已读文章；未读文章；全部文章
const categoryOptions = ['all', 'ithome', '36kr', 'ifanr']

const fetchRss = () => ([
  { guid: 'ithome_01', source: 'ithome', readed: false },
  { guid: 'ithome_02', source: 'ithome', readed: false },
  { guid: '36kr_01', source: '36kr', readed: false },
  { guid: '36kr_02', source: '36kr', readed: false },
  { guid: 'ifanr_01', source: 'ifanr', readed: false },
  { guid: 'ifanr_02', source: 'ifanr', readed: false },
  { guid: 'ifanr_03', source: 'ifanr', readed: false }
])

const filterByCategory = (newState, category) => {
  const array = []
  newState.map(item => {
    if ((item.source === category) || (category === 'all')) {
      array.push(item.readed)
    }
  })
  return array
}

describe('reducer: rss', () => {
  describe('no action', () => {
    test('no action; should return stateInit', () => {
      expect(rss()).toEqual(stateInit)
    })
  })

  describe('handle action: SET_ALL_READED', () => {
    test('handle action: SET_ALL_READED; throw error if state no value', () => {
      const testAction = {
        type: types.SET_ALL_READED,
        payload: {category: 'ithome'}
      }
      expect(() => rss(stateInit, testAction)).toThrow('state has no value!')
    })

    test('handle action: SET_ALL_READED; throw error if action payload has no value', () => {
      const testAction = {
        type: types.SET_ALL_READED
      }
      const stateAfterFetch = fetchRss()
      expect(() => rss(stateAfterFetch, testAction)).toThrow('Cannot read property \'category\' of undefined')
    })

    test('handle action: SET_ALL_READED', () => {
      categoryOptions.map(category => {
        const testAction = {
          type: types.SET_ALL_READED,
          payload: {category: category}
        }

        const stateAfterFetch = fetchRss()
        const newState = rss(stateAfterFetch, testAction)

        const allReadedByCategory = filterByCategory(newState, category)

        expect(allReadedByCategory).not.toEqual(expect.arrayContaining([false]))
      })
    })
  })

  describe('handle action: PANEL_POP', () => {
    test('handle action: PANEL_POP; set article readed', () => {
      const articleItem = { guid: 'ithome_02', source: 'ithome', readed: false }
      const testAction = {
        type: types.PANEL_POP,
        payload: { articleItem }
      }

      const stateAfterFetch = fetchRss()
      const newState = rss(stateAfterFetch, testAction)

      const toggleIndex = newState.findIndex((item) => item.guid === articleItem.guid)

      expect(newState[toggleIndex].readed).toBe(true)
    })

    test('handle action: PANEL_POP; throw error if state no value', () => {
      const articleItem = { guid: 'ithome_02', source: 'ithome', readed: false }
      const testAction = {
        type: types.PANEL_POP,
        payload: { articleItem }
      }

      expect(() => rss(stateInit, testAction)).toThrow('state has no value!')
    })

    test('handle action: PANEL_POP; throw error if action payload has no value', () => {
      const testAction = {
        type: types.PANEL_POP
      }
      const stateAfterFetch = fetchRss()
      expect(() => rss(stateAfterFetch, testAction)).toThrow('Cannot read property \'articleItem\' of undefined')
    })
  })

  describe('handle action: FETCH_RSS_COMPLETED', () => {
    test.skip('should behave...', () => {
      const testAction = {
        type: 'FETCH_RSS_COMPLETED',
        payload: [ ['ithome', parse_ithome], ['36kr', parse_36kr], ['ifanr', parse_ifanr] ]
      }

      const expectState = [].concat(expect_ithome, expect_36kr, expect_ifanr)
      expect(rss(stateInit, testAction)).toEqual(expectState)
    })

    test('test fn: resolve2html_ithome', () => {
      const testItem = parse_ithome.rss.channel[0].item[0]
      const testFnResult = resolve2html_ithome(testItem)
      const expectItem = expect_ithome[0]

      expect(testFnResult.guid).toBe(expectItem.guid)
      expect(testFnResult.title).toBe(expectItem.title)
      expect(testFnResult.link).toBe(expectItem.link)
      expect(testFnResult.imgSrc).toBe(expectItem.imgSrc)
      expect(testFnResult.pubDate).toBe(expectItem.pubDate)
      expect(testFnResult.source).toBe(expectItem.source)
      expect(testFnResult.readed).toBe(expectItem.readed)
    })

    test('test fn: resolve2html_36kr', () => {
      const testItem = parse_36kr.rss.channel[0].item[0]
      const testFnResult = resolve2html_36kr(testItem)
      const expectItem = expect_36kr[0]

      expect(testFnResult.guid).toBe(expectItem.guid)
      expect(testFnResult.title).toBe(expectItem.title)
      expect(testFnResult.link).toBe(expectItem.link)
      expect(testFnResult.imgSrc).toBe(expectItem.imgSrc)
      expect(testFnResult.pubDate).toBe(expectItem.pubDate)
      expect(testFnResult.source).toBe(expectItem.source)
      expect(testFnResult.readed).toBe(expectItem.readed)
    })

    test('test fn: resolve2html_ifanr', () => {
      const testItem = parse_ifanr.rss.channel[0].item[0]
      const testFnResult = resolve2html_ifanr(testItem)
      const expectItem = expect_ifanr[0]

      expect(testFnResult.guid).toBe(expectItem.guid)
      expect(testFnResult.title).toBe(expectItem.title)
      expect(testFnResult.link).toBe(expectItem.link)
      expect(testFnResult.imgSrc).toBe(expectItem.imgSrc)
      expect(testFnResult.pubDate).toBe(expectItem.pubDate)
      expect(testFnResult.source).toBe(expectItem.source)
      expect(testFnResult.readed).toBe(expectItem.readed)
    })

    test('test fn: findShortDescrip', () => {
      const test_ithome_00 = parse_ithome.rss.channel[0].item[0].description[0]
      const test_ithome_01 = parse_ithome.rss.channel[0].item[1].description[0]
      const test_36kr_00 = parse_36kr.rss.channel[0].item[0].description[0]
      const test_36kr_01 = parse_36kr.rss.channel[0].item[1].description[0]

      const expect_ithome_00 = expect_ithome[0].shortDescrip
      const expect_ithome_01 = expect_ithome[1].shortDescrip
      const expect_36kr_00 = expect_36kr[0].shortDescrip
      const expect_36kr_01 = expect_36kr[1].shortDescrip

      expect(findShortDescrip(test_ithome_00, 'ithome')).toBe(expect_ithome_00)
      expect(findShortDescrip(test_ithome_01, 'ithome')).toBe(expect_ithome_01)
      expect(findShortDescrip(test_36kr_00, 'ithome')).toBe(expect_36kr_00)
      expect(findShortDescrip(test_36kr_01, 'ithome')).toBe(expect_36kr_01)
    })
  })
})
