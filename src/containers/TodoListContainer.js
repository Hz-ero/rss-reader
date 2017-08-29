import { connect } from 'react-redux'
import TodoList from '../components/TodoList.jsx'
import { deleteTodo } from '../actions'

const mapStateToProps = (state, ownProps) => {
    const immu_state = state.toObject()
    if(!immu_state.todos.size) {
        return {
            todoArray: []
        }
    } else {
        return {
            todoArray: immu_state.todos.toJS()
        }
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    clickDeleteItem: ({todoId}) => {
        dispatch(deleteTodo({todoId}))
    }
})

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default TodoListContainer