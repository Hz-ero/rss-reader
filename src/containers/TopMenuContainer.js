import { connect } from 'react-redux'
import { fetchRSS, switchReadable, setAllReaded } from '../actions'
import TopMenu from '../components/TopMenu/index.jsx'


/**
 * @param {any} state  
 * @returns true/false
 */
const checkCategoryNoRead = (state) => {
    let isCanSet = false
    let findArticlesNoRead = -1
    
    const category = state.category

    if (!state.rss.length) {
        return false
    }

    if (category === 'all') {
        findArticlesNoRead = state.rss.findIndex(item => {
            return item.readed === false
        })
    } else {
        findArticlesNoRead = state.rss.findIndex(item => {
            return (item.source === category) && (item.readed === false)
        })
    }

    if (findArticlesNoRead >= 0) {
        isCanSet = true
    }

    return isCanSet
}

const mapStateToProps = (state, ownProps) => {
    const immu_state = state.toObject()
    return {
        currentReadable: immu_state.readable,
        canSetAllReaded: checkCategoryNoRead(immu_state),
        readCategory: immu_state.category,
        popPanelState: immu_state.popPanel.visible
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    clickFetchRSS: () => {
        dispatch(fetchRSS())
    },
    clickSwitchReadable: ({ readable }) => {
        dispatch(switchReadable({ readable }))
    },
    clickAllReaded: ({ category }) => {
        dispatch(setAllReaded({ category }))
    }
})

const TopMenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TopMenu)

export default TopMenuContainer