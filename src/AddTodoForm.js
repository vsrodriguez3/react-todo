import React from 'react';

function AddTodoForm() {
    return (
        <form>
            <label htmlFor="todoTitle">Title: </label>
            <input type="text" id="todoTitle"></input>
            <input type="submit" value="Add"></input>
        </form>
    );
}

export default AddTodoForm;