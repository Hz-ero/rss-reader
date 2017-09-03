import React from 'react'
import { Icon } from 'semantic-ui-react'
import style from './index.css'
import ArticleListContainer from '../../containers/ArticleListContainer'
import PopPanelContainer from '../../containers/PopPanelContainer'

class ToTop extends React.Component {
  constructor(props) {
    super(props)
    this.handleToTop = this.handleToTop.bind(this)
  }

  handleToTop(e) {
    const PopPanel = document.getElementById('PopPanel')
    if (PopPanel) {
      PopPanel.scrollTop = 0
    } else {
      document.body.scrollTop = 0
    }    
  }

  render() {
    return (
      <div
        className={style.toTop}
        onClick={e => this.handleToTop(e)}
      >
        <img src="./assets/img/arrow_up.png" alt="arrow_up" />
      </div>
    )
  }
}

const MainDiv = () => (
  <div className={style.mainDiv}>
    <ArticleListContainer />
    <PopPanelContainer />
    <ToTop />
  </div>
)

export default MainDiv
