import React from 'react'

const TodoItem = (props) => {
    const { index, todoContent, clickDeleteItem } = props
    
    return (
        <div>
            <span>{todoContent}</span>
            <button onClick={() => clickDeleteItem({todoId:index})} >删除</button>
        </div>
    )
}

const TodoList = (props) => {
    const { todoArray, clickDeleteItem } = props
    
    if (!todoArray.length) {
        return (
<div>please add todo</div>
        )
    } else {
        return (
<div>
    {
        todoArray.map(item => {
            return <TodoItem key={item.id}
                            index={item.id}
                            todoContent={item.todo}
                            clickDeleteItem={clickDeleteItem} />
        })
    }
</div>
        )
    }
    
}

export default TodoList