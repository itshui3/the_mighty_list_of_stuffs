import React, { useState, useEffect, useRef } from 'react'

import './TodoInput.css'

function TodoInput({
    todo,
    writeTodo,
    toggleAddingTodo,
    todoInputRef,
    addTodo,
}) {

    const handleBlurSet = (ev) => {

        if (ev.relatedTarget === null) { return toggleAddingTodo() }
        const matcher = ev.relatedTarget.className

        if (
            matcher !== 'input_cont' &&
            matcher !== 'todo_card' &&
            matcher !== 'addTodo_btn'
        ) {
            toggleAddingTodo()
        }

    }

    const handleAddTodo = (ev) => {
        preventBlur()
        ev.preventDefault()

        if (todo.length) {
            toggleAddingTodo()
            addTodo()
        } else {
            todoInputRef.current.focus()
        }
    }

// the focusable nature of tabIndex='0' elements adds some default border styling on focus
return (
<>

<div 
className='input_cont' 

tabIndex='0'
onBlur={handleBlurSet}
>

    <input
    className='todo_card'
    value={todo}
    onChange={writeTodo}
    ref={todoInputRef}

    tabIndex='0'
    onBlur={handleBlurSet}
    />

    <button 
    className='addTodo_btn'

    tabIndex='0'
    onBlur={handleBlurSet}

    onClick={handleAddTodo}
    >Add Todo</button>

</div>
    
</>
)
}

export default TodoInput
