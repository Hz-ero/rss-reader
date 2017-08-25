import { connect } from 'react-redux'
import About from '../components/About.jsx'
import { fetchRSS } from '../actions'

const mapStateToProps = (state, ownProps) => ({
    // todoArray: state.todos
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    clickFetch: () => {
        dispatch(fetchRSS())
    }
})

const AboutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(About)

export default AboutContainer