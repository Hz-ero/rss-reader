import React from 'react'
import style from './index.css'
import { Transition } from 'semantic-ui-react'

class PopPanel extends React.Component {
  componentWillUpdate (nextProps) {
    if (nextProps.visible) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'scroll'
    }
  }

  render () {
    const { visible, article, clickUnPop } = this.props
    return (
      <Transition visible={visible} animation="scale" duration={300}>
        <div id="PopPanel"
          className={style.popPanel}
          onClick={() => clickUnPop()}
        >
          <div
            className={style.article}
            onClick={e => e.stopPropagation()}
          >
            <div className={style.title}>
              {article.title}</div>
            <div className={style.info}>
              {article.source}</div>
            <div className={style.divider} />
            <div
              className={style.content}
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </div>
        </div>
      </Transition>
    )
  }
}

export default PopPanel
