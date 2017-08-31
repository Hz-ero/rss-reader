import React from 'react'
import style from './index.css'
import { Icon, Dropdown, Label, Menu } from 'semantic-ui-react'

const ArticleCard = ({ articleItem, clickPanelPop}) => {
    const popPanelChangeTitle = () => {
        document.title = articleItem.title
        clickPanelPop({articleItem})
    }
    
    return (
<div className={style.card} onClick={()=>popPanelChangeTitle()}>
    <img className={style.cardImg} src={articleItem.imgSrc}/>
    <div className={style.cardContent}>
        <h3>{articleItem.title}</h3>
        <p>{articleItem.shortDescrip}</p>
        <p className={style.cardFooter}>{articleItem.source}</p>
    </div>
</div>
)}

const ArticleList = ({needFix, showArticles, clickPanelPop}) => {

    const scrollToChangeTop = (e) => {
        
    }

    if (showArticles.length > 0) {
        return (
<div 
    className={style.cardList}>
            {showArticles.map(item => {
                return (<ArticleCard  key={item.guid} articleItem={item} clickPanelPop={clickPanelPop}/>)
            })}
        </div>)

    } else {
        return (<div>
            nothing
        </div>)
    }
}

export default ArticleList