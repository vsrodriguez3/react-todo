import React from 'react';

function AddTodoForm(props) {

    function handleAddTodo(event) {
        event.preventDefault();
        let todoTitle = event.target.elements.title.value;
        props.onAddTodo(todoTitle);
        console.log(todoTitle);
        event.target.elements.title.value = '';
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