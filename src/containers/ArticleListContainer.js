import { connect } from 'react-redux'
import { panelPop } from '../actions'
import ArticleList from '../components/ArticleList/index.jsx'

/**
 * 依据阅读分类和rss源筛选要显示的文章列表
 * @param {Object} state 
 * @returns {Array} articles
 */
const queryArticlesByState = (state) => {
  const rssArray = state.rss
  const readable = state.readable
  const category = state.category
  const articles_by_readable = []
  const articles_by_catgory = []

  if (rssArray) {
    rssArray.map((item) => {
      switch (readable) {
        case 'noRead':
          if (item.readed === false) {
            articles_by_readable.push(item)
          }
          break
        case 'readed':
          if (item.readed === true) {
            articles_by_readable.push(item)
          }
          break
        default:
          articles_by_readable.push(item)
      }
    })

    if (articles_by_readable.length > 0) {
      articles_by_readable.map((item) => {
        switch (category) {
          case 'ithome':
            if (item.source === 'ithome') {
              articles_by_catgory.push(item)
            }
            break
          case '36kr':
            if (item.source === '36kr') {
              articles_by_catgory.push(item)
            }
            break
          case 'ifanr':
            if (item.source === 'ifanr') {
              articles_by_catgory.push(item)
            }
            break
          default:
            articles_by_catgory.push(item)
        }
      })
    }
  }

  return articles_by_catgory
}

const mapStateToProps = (state) => {
  const immu_state = state.toObject()
  const showArticles = queryArticlesByState(immu_state)
  return {
    needFix: immu_state.popPanel.visible,
    showArticles
  }
}

const mapDispatchToProps = dispatch => ({
  clickPanelPop: ({ articleItem }) => {
    dispatch(panelPop({ articleItem }))
  }
})

const ArticleListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleList)

export default ArticleListContainer
