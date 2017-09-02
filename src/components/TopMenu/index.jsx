import React from 'react'
import { Dropdown, Menu, Modal, Button } from 'semantic-ui-react'
import style from './index.css'

class TopMenu extends React.Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.clickOpenModal = this.clickOpenModal.bind(this)
    this.clickCloseModal = this.clickCloseModal.bind(this)
    this.clickConfirmSetReaded = this.clickConfirmSetReaded.bind(this)
    this.beforeYOffset = null
    this.checkClass = [null, null]
    this.state = {
      change: false,
      openModal: false,
    }
  }

  componentWillMount() {
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    const { clickFetchRSS } = this.props
    clickFetchRSS()
  }

  componentWillUnmont() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  clickOpenModal() {
    const { canSetAllReaded } = this.props
    if (canSetAllReaded) {
      this.setState({
        openModal: true,
      })
    } else {
      return false
    }
  }

  clickCloseModal() {
    this.setState({
      openModal: false,
    })
  }

  clickConfirmSetReaded() {
    const {
      readCategory,
      clickAllReaded,
    } = this.props

    this.setState({
      openModal: false,
    })
    clickAllReaded({ category: readCategory })
  }

  handleScroll(e) {
    // 检测popPanel是否显示，若弹出显示，则函数跳出执行
    if (this.props.popPanelState) {
      return false
    }

    if (!this.beforeYOffset) {
      this.beforeYOffset = window.pageYOffset
    }

    const diffY = this.beforeYOffset - window.pageYOffset
    this.checkClass.shift()
    if (diffY < 0) {
      this.checkClass.push('down')
      if (this.checkClass[0] != this.checkClass[1]) {
        this.setState({
          change: true,
        })
      }
    } else {
      this.checkClass.push('up')
      if (this.checkClass[0] != this.checkClass[1]) {
        this.setState({
          change: false,
        })
      }
    }
    this.beforeYOffset = window.pageYOffset
  }

  render() {
    const {
      currentReadable,
      canSetAllReaded,
      clickFetchRSS,
      clickSwitchReadable,
    } = this.props

    return (
      <div>
        <Menu className={this.state.change ? style.topMenu_fix : style.topMenu}>
          <Menu.Menu position="right">
            <Menu.Item
              disabled={!canSetAllReaded}
              icon='checkmark'
              onClick={() => this.clickOpenModal()}
            />
            <Menu.Item icon="refresh" onClick={() => clickFetchRSS()} />
            <Dropdown icon="setting" simple item>
              <Dropdown.Menu>
                <Dropdown.Item
                  active={currentReadable === 'noRead'}
                  onClick={() => clickSwitchReadable({ readable: 'noRead' })}
                >
                  未读文章</Dropdown.Item>
                <Dropdown.Item
                  active={currentReadable === 'all'}
                  onClick={() => clickSwitchReadable({ readable: 'all' })}
                >
                  所有文章</Dropdown.Item>
                <Dropdown.Item
                  active={currentReadable === 'readed'}
                  onClick={() => clickSwitchReadable({ readable: 'readed' })}
                >
                  已读文章</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Menu.Item icon="alarm" />
          </Menu.Menu>
        </Menu>

        <Modal
          open={this.state.openModal}
        >
          <Modal.Header>
            确认
          </Modal.Header>
          <Modal.Content>
            <p>将本栏目下的全部未读文章全部置为已读？</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              onClick={() => this.clickCloseModal()}
              negative
              labelPosition='right'
              icon='close'
              content='No'
            />
            <Button
              onClick={() => this.clickConfirmSetReaded()}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
            />
          </Modal.Actions>
        </Modal>

      </div>
    )
  }
}

export default TopMenu
