import React from 'react';

function AddTodoForm(props) {

    function handleAddTodo(event) {
        event.preventDefault();
        let todoTitle = event.target.title.value;
        props.onAddTodo(todoTitle);
        event.target.reset();
    };
    
    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title: </label>
            <input type="text" id="todoTitle" name="title" />
            <input type="submit" value="Add" />
        </form>
    );
};

export default AddTodoForm;