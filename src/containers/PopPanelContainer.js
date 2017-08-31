import { connect } from 'react-redux'
import { panelUnPop } from '../actions'
import PopPanel from '../components/PopPanel/index.jsx'

const mapStateToProps = (state, ownProps) => {
    const immu_state = state.toObject()
    return {
        visible: immu_state.popPanel.visible,
        article: immu_state.popPanel.article
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    clickUnPop: () => {
        dispatch((panelUnPop()))
    }
})

const PopPanelContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PopPanel)

export default PopPanelContainer