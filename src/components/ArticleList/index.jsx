import React from 'react'
import style from './index.css'

const ArticleCard = ({ articleItem, clickPanelPop }) => {
  const popPanelChangeTitle = () => {
    document.title = articleItem.title
    clickPanelPop({ articleItem })
  }

  return (
    <div className={style.card} onClick={() => popPanelChangeTitle()}>
      <img className={style.cardImg} src={articleItem.imgSrc} />
      <div className={style.cardContent}>
        <h3>{articleItem.title}</h3>
        <p>{articleItem.shortDescrip}</p>
        <p className={style.cardFooter}>{articleItem.source}</p>
      </div>
    </div>
  )
}

const ArticleList = ({ needFix, showArticles, clickPanelPop }) => {

  if (showArticles.length > 0) {
    return (
      <div
        className={style.cardList}
      >
        {
          showArticles.map(item => (
            <ArticleCard key={item.guid} articleItem={item} clickPanelPop={clickPanelPop} />
          ))
        }
      </div>)
  }
  return (<div>nothing</div>)
}

export default ArticleList
