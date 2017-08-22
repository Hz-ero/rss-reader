import { connect } from 'react-redux'
import TodoList from '../components/TodoList.jsx'
import { deleteTodo } from '../actions'

const mapStateToProps = (state, ownProps) => ({
    todoArray: state.todos
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    clickDeleteItem: (todoId) => {
        dispatch(deleteTodo(todoId))
    }
})

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)

export default TodoListContainer