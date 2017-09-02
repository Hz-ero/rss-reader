import { createReducer } from 'redux-action-tools'
import { FETCH_RSS, PANEL_POP, SET_ALL_READED } from '../actions/actionTypes'

const cheerio = require('cheerio')

const findShortDescrip = (content, source) => {
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
    shortDescrip = `${shortDescrip.slice(0, 130)  }...`
  }
  return shortDescrip
}

// ithome rss 项目解析
const resolve2html_ithome = (rssItem) => {
  const $ = cheerio.load(rssItem.description[0])

  // guid
  let guid = rssItem.guid[0].slice(-10, -4)
  guid = `ithome_${  guid}`

  // title
  const title = rssItem.title[0]

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
  const description = $.html()

  // pubDate
  const pubDate = rssItem.pubDate[0]

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
    readed: false,
  }
}

// 36kr rss 项目解析
const resolve2html_36kr = (rssItem) => {
  const $ = cheerio.load(rssItem.description[0])

  // guid
  let guid = rssItem.guid[0].slice(18, 25)
  guid = `36kr_${  guid}`

  // title
  const title = rssItem.title[0]

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
  const description = $.html()

  // pubDate
  const pubDate = rssItem.pubDate[0]

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
    readed: false,
  }
}

// ifanr rss 项目解析
const resolve2html_ifanr = (rssItem) => {
  // guid
  const preGuid = rssItem.guid[0]
  let guid = preGuid._.slice(24, 30)
  guid = `ifanr_${  guid}`

  // title
  const title = rssItem.title[0]

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
    shortDescrip = `${shortDescrip.slice(0, 130)  }...`
  }

  // description
  const descripHtml = cheerio.load(rssItem['content:encoded'][0])
  descripHtml('img').wrap('<strong></strong>')
  const description = descripHtml.html()

  // pubDate
  const pubDate = rssItem.pubDate[0]

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
    readed: false,
  }
}

const handleFetchRssDone = (state, action) => {
  // 初始化变量
  let newState = {}
  let rssIthome = {}
  let rssKr = {}
  let rssIfanr = {}

  if (typeof action.payload !== 'object') {
    console.error('type error: ction.payload id not Map obj');
    return newState
  }

  // typeof action.payload -->  Map
  // [ ['ithome',{...}], ['36kr',{...}], ['ifanr',{...}] ]
  action.payload.forEach((value, key) => {
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

const handleFetchRssFail = (state) => {
  console.error('fetch rss fail');
  return state
}

const toggleRssReaded = (state, action) => {
  const newState = [...state]
  const toggleIndex = newState.findIndex((item) => item.guid === action.payload.articleItem.guid)
  newState[toggleIndex].readed = true
  return newState
}
const setAllReaded = (state, action) => {
  const newState = [...state]
  newState.findIndex((item) => {
    if (item.source === action.pryload.category) {
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
  .build([])

export default rss
