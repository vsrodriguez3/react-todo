import React, { useState } from 'react';
import InputWithLabel from './InputWithLabel';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo }) {
    const [todoTitle, setTodoTitle] = useState('')
    
    function handleTitleChange(event) {
        setTodoTitle(event.target.value);
        console.log(event.target)
    }

    function handleAddTodo(event) {
        event.preventDefault();
        onAddTodo(todoTitle); 
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

// propTypes 
AddTodoForm.propTypes = {
    onAddTodo: PropTypes.func.isRequired,
};


export default AddTodoForm;