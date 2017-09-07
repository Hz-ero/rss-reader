import { createReducer } from 'redux-action-tools'
import { FETCH_RSS, PANEL_POP, SET_ALL_READED } from '../actions/actionTypes'
const cheerio = require('cheerio')
var he = require('he')
/* 
*  初始状态
*  状态以数组形式包含所有文章
*  数组项： 
*  {guid,title,link,imgSrc,shortDescrip,
*   description,pubDate,source,readed}
*/
const stateInit = [] // 设置：已读文章；未读文章；全部文章

/**
 * 在一段html文本中找出文章简介，一般在文章的第一二段
 * 有些文章开头会以文章来源开头，需要过滤掉
 * ithome过滤：/^感谢IT之家网友.*$/
 * 36kr过滤：/^编者按:本文来自.*$/
 * 不能过长，截取不超过130字符
 * @param {string} content // html文本
 * @param {string} source  // rss源
 * @returns {string} shortDescrip
 */
export const findShortDescrip = (content, source) => {
  const $ = cheerio.load(content)
  let paraIndex = 0
  let regex = ''

  const findParaHasNoImg = (index) => {
    const getImgInPara = $('p').eq(index).find('img')
    if (getImgInPara.length > 0) {
      paraIndex = index + 1
      findParaHasNoImg(paraIndex)
    }
    const thisPara = $('p').eq(paraIndex).text()
    paraIndex = index + 1
    return thisPara
  }
  let shortDescrip = findParaHasNoImg(paraIndex)
  const secondPara = findParaHasNoImg(paraIndex)

  if (source === 'ithome') { regex = /^感谢IT之家网友.*$/ }
  if (source === '36kr') { regex = /^编者按:本文来自.*$/ }

  if (regex.test(shortDescrip)) {
    shortDescrip = secondPara
  }
  if (shortDescrip.length > 131) {
    shortDescrip = `${shortDescrip.slice(0, 130)}...`
  }
  return shortDescrip
}

// ithome rss 项目解析
export const resolve2html_ithome = (rssItem) => {
  const $ = cheerio.load(rssItem.description[0])

  // guid
  let guid = rssItem.guid[0].slice(-10, -4)
  guid = `ithome_${guid}`

  // title
  const title = rssItem.title[0].replace(/(^\s*)|(\s*$)/g, '')

  // link
  const link = rssItem.link[0]

  // imgSrc
  let imgSrc = $('img').first().attr('src')
  if (!imgSrc) {
    imgSrc = './assets/img/ithome.png'
  }

  // shortDescrip
  const shortDescrip = findShortDescrip(rssItem.description[0], 'ithome')

  // description
  $('img').wrap('<strong></strong>')
  const needParseHtml = $.html()
  const description = he.decode(needParseHtml)

  // pubDate
  const pubDate = rssItem.pubDate[0].replace(/(^\s*)|(\s*$)/g, '')

  // all data
  return {
    guid,
    title,
    link,
    imgSrc,
    shortDescrip,
    description,
    pubDate,

    source: 'ithome',
    readed: false
  }
}

// 36kr rss 项目解析
export const resolve2html_36kr = (rssItem) => {
  const $ = cheerio.load(rssItem.description[0])

  // guid
  let guid = rssItem.guid[0].slice(18, 25)
  guid = `36kr_${guid}`

  // title
  const title = rssItem.title[0].replace(/(^\s*)|(\s*$)/g, '')

  // link
  const link = rssItem.link[0]

  // imgSrc
  let imgSrc = $('img').first().attr('src')
  if (!imgSrc) {
    imgSrc = './assets/img/36kr.jpg'
  }

  // shortDescrip
  const shortDescrip = findShortDescrip(rssItem.description[0], '36kr')

  // description
  $('img').wrap('<strong></strong>')
  const needParseHtml = $.html()
  const description = he.decode(needParseHtml)

  // pubDate
  const pubDate = rssItem.pubDate[0].replace(/(^\s*)|(\s*$)/g, '')

  // all data
  return {
    guid,
    title,
    link,
    imgSrc,
    shortDescrip,
    description,
    pubDate,

    source: '36kr',
    readed: false
  }
}

// ifanr rss 项目解析
export const resolve2html_ifanr = (rssItem) => {
  // guid
  const preGuid = rssItem.guid[0]
  let guid = preGuid._.slice(24, 30)
  guid = `ifanr_${guid}`

  // title
  const title = rssItem.title[0].replace(/(^\s*)|(\s*$)/g, '')

  // link
  const link = rssItem.link[0]

  // imgSrc
  let imgSrc = rssItem.image[0]
  if (!imgSrc) {
    imgSrc = './assets/img/ifanr.png'
  }

  // shortDesctiop
  const shortDesHtml = cheerio.load(rssItem.description[0])
  shortDesHtml('body').children().remove()
  let shortDescrip = shortDesHtml('body').text()
  if (shortDescrip.length > 131) {
    shortDescrip = `${shortDescrip.slice(0, 130)}...`
  }

  // description
  const descripHtml = cheerio.load(rssItem['content:encoded'][0])
  descripHtml('img').wrap('<strong></strong>')
  const needParseHtml = descripHtml.html()
  const description = he.decode(needParseHtml)

  // pubDate
  const pubDate = rssItem.pubDate[0].replace(/(^\s*)|(\s*$)/g, '')

  // all data
  return {
    guid,
    title,
    link,
    imgSrc,
    shortDescrip,
    description,
    pubDate,

    source: 'ifanr',
    readed: false
  }
}

/**
 * action.type:FETCH_RSS_COMPLETE
 * 将从三个rss源fetch来的数据分别解析成为统一数据结构，并综合。
 * [ ['ithome',{...}], ['36kr',{...}], ['ifanr',{...}] ]
 * @param {Array} state 
 * @param {Map} action.payload 
 * @returns {Array} newState 
 */
const handleFetchRssDone = (state, action) => {
  // 初始化变量
  let newState = []
  let rssIthome = []
  let rssKr = []
  let rssIfanr = []

  if (typeof action.payload !== 'object') {
    console.error('type error: ction.payload id not Map obj')
    return newState
  }

  // typeof action.payload -->  Map
  // [ ['ithome',{...}], ['36kr',{...}], ['ifanr',{...}] ]
  const rssMap = new Map(action.payload)
  rssMap.forEach((value, key) => {
    const itemsInRss = value.rss.channel[0].item

    if (key === 'ithome') {
      rssIthome = itemsInRss.map(resolve2html_ithome)
    }
    if (key === '36kr') {
      rssKr = itemsInRss.map(resolve2html_36kr)
    }
    if (key === 'ifanr') {
      rssIfanr = itemsInRss.map(resolve2html_ifanr)
    }
  })

  newState = [].concat(rssIthome, rssKr, rssIfanr)
  return newState
}

// action.type:FETCH_RSS_FAIL
const handleFetchRssFail = (state) => {
  console.error('fetch rss fail')
  return state
}

// action.type:PANEL_POP 将显示的文章设为已读
const toggleRssReaded = (state, action) => {
  // action请求reduce 但是state中没有数据
  if ((!state.length) && action) {
    throw new Error('state has no value!')
  }

  const newState = [...state]
  const toggleIndex = newState.findIndex((item) => item.guid === action.payload.articleItem.guid)
  newState[toggleIndex].readed = true
  return newState
}

// action.type:SET_ALL_READED 将所有文章设为已读
const setAllReaded = (state, action) => {
  // action请求reduce 但是state中没有数据
  if ((!state.length) && action) {
    throw new Error('state has no value!')
  }

  const newState = [...state]
  newState.map((item) => {
    if ((item.source === action.payload.category) || (action.payload.category === 'all')) {
      item.readed = true
    }
  })
  return newState
}

const rss = createReducer()
  .when(SET_ALL_READED, setAllReaded)
  .when(PANEL_POP, toggleRssReaded)
  .when(FETCH_RSS)
  .done(handleFetchRssDone)
  .failed(handleFetchRssFail)
  .build(stateInit)

export default rss
