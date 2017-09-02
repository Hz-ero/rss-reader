import { connect } from 'react-redux'
import { switchCategory, panelUnPop } from '../actions'
import SideBar from '../components/SideBar/index.jsx'

const mapStateToProps = (state) => {
  let noReadNum_all = 0
  let noReadNum_ithome = 0
  let noReadNum_kr = 0
  let noReadNum_ifanr = 0

  const rssArray = state.toObject().rss

  if (rssArray) {
    rssArray.map((item) => {
      if (item.readed === false && item.source === 'ithome') {
        noReadNum_ithome += 1
      }
      if (item.readed === false && item.source === '36kr') {
        noReadNum_kr += 1
      }
      if (item.readed === false && item.source === 'ifanr') {
        noReadNum_ifanr += 1
      }
    })
  }
  noReadNum_all = noReadNum_ithome + noReadNum_kr + noReadNum_ifanr
  return {
    noReadNum_all,
    noReadNum_ithome,
    noReadNum_kr,
    noReadNum_ifanr,
  }
}


const mapDispatchToProps = dispatch => ({
  clickSwitchCategory: ({ category }) => {
    document.body.scrollTop = 0
    dispatch(switchCategory({ category }))
  },
  clickUnPop: () => {
    dispatch((panelUnPop()))
  },
})

const SideBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SideBar)

export default SideBarContainer
