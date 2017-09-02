import React from 'react'
import { Icon } from 'semantic-ui-react'
import style from './index.css'
import ArticleListContainer from '../../containers/ArticleListContainer'
import PopPanelContainer from '../../containers/PopPanelContainer'

class ToTop extends React.Component {
  constructor(props) {
    super(props)
    this.handleToTop = this.handleToTop.bind(this)
    this.handleScroll = this.handleScroll.bind(this)

    this.state = {
      dontShow: true,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmont() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll(e) {
    if (document.body.scrollTop > 700) {
      this.setState({ dontShow: false })
    } else {
      this.setState({ dontShow: true })
    }
  }

  handleToTop(e) {
    document.documentElement.scrollTop = document.body.scrollTop = 0
  }

  render() {
    return (
      <div
        className={this.state.dontShow ? style.noToTop : style.toTop}
        onClick={e => this.handleToTop(e)}
      >
        <Icon name="arrow circle up" size="big" />
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
