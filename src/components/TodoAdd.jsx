import React from 'react'

const TodoAdd = (props) => {
    let todoInput
    const { clickAddTodo } = props

    const handleSubmit = (event) => {
        event.preventDefault()
        clickAddTodo(todoInput.value)
        todoInput.value = ''
    }

    const handleInputChange = (event) => {
        // 处理输入
    }

    return (
<div>
    <form onSubmit={handleSubmit}>
        <input type="text" ref={input=>todoInput=input}
            onChange={handleInputChange} />
        <input type="submit" value="添加" />
    </form>
</div>
    )    
}

export default TodoAdd