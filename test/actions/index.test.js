import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../../src/actions/index'
import * as types from '../../src/actions/actionTypes'
import nock from 'nock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })
  test('creates FETCH_RSS and FETCH_RSS_COMPLETED when fetching rss has been done', () => {
    nock('http://localhost:3030')
      .get('/fetch/ithome')
      .reply(200, '<root>ithome!</root>')
      .get('/fetch/36kr')
      .reply(200, '<root>36kr!</root>')
      .get('/fetch/ifanr')
      .reply(200, '<root>ifanr!</root>')

    const expectedActions = [
      {
        "meta": { "asyncPhase": "START" },
        "type": "FETCH_RSS"
      },
      {
        "meta": { "asyncPhase": "COMPLETED" },
        "payload": [
          ["ithome", { "root": "ithome!" }],
          ["36kr", { "root": "36kr!" }],
          ["ifanr", { "root": "ifanr!" }]
        ],
        "type": "FETCH_RSS_COMPLETED"
      }]

    const store = mockStore({})

    return store.dispatch(actions.fetchRSS())
      .then(() => { // 异步 actions 的返回
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  test('creates FETCH_RSS_FAILED when fetching rss error', () => {
    nock('http://localhost:3030')
      .get('/fetch/test')    

    const store = mockStore({})

    return store.dispatch(actions.fetchForTest())
      .catch(() => {})
      .then(() => { // 异步 actions 的返回
        expect(store.getActions()[1].type).toEqual('FETCH_TEST_FAILED')
      })
  })
})

describe('sync actions', () => {
  test('action: PANEL_POP', () => {
    const article = { title: 'rss title' }
    const exprectAction = {
      type: types.PANEL_POP,
      payload: article
    }

    expect(actions.panelPop(article)).toEqual(exprectAction)
  })

  test('action: PANEL_UN_POP', () => {
    const article = { title: 'rss title' }
    const exprectAction = {
      type: types.PANEL_UN_POP,
    }

    expect(actions.panelUnPop()).toEqual(exprectAction)
  })

  test('action: SWITCH_CATEGORY', () => {
    const article = { title: 'rss title' }
    const exprectAction = {
      type: types.SWITCH_CATEGORY,
      payload: article
    }

    expect(actions.switchCategory(article)).toEqual(exprectAction)
  })

  test('action: SWITCH_READABLE', () => {
    const article = { title: 'rss title' }
    const exprectAction = {
      type: types.SWITCH_READABLE,
      payload: article
    }

    expect(actions.switchReadable(article)).toEqual(exprectAction)
  })

  test('action: SET_ALL_READED', () => {
    const exprectAction = {
      type: types.SET_ALL_READED
    }

    expect(actions.setAllReaded()).toEqual(exprectAction)
  })
})