import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('')

    function handleTitleChange(event) {
        const newTodoTitle = event.target.value;
        setTodoTitle(newTodoTitle);
    }

    function handleAddTodo(event) {
        event.preventDefault();
        onAddTodo({ title: todoTitle, id: Date.now() });
        setTodoTitle('');
    };
    
    return (
        <form onSubmit={handleAddTodo}>
            <InputWithLabel 
                todoTitle={todoTitle} 
                handleTitleChange={handleTitleChange} 
                autoFocus
            >
                Task Title 
            </InputWithLabel>
        </form>
    );
};

export default AddTodoForm;