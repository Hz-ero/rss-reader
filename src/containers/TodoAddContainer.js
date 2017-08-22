import { connect } from 'react-redux'
import TodoAdd from '../components/TodoAdd.jsx'
import { addTodo } from '../actions'

const mapStateToProps = (state, ownProps) => ({
    // todoArray: state.todos
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    clickAddTodo: (todoInput) => {
        dispatch(addTodo(todoInput))
    }
})

const TodoAddContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoAdd)

export default TodoAddContainer