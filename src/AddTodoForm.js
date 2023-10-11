import React from 'react';

function AddTodoForm() {
    return (
        <form>
            <label htmlFor="todoTitle">Title: </label>
            <input type="text" id="todoTitle" />
            <input type="submit" value="Add" />
        </form>
    );
}

export default AddTodoForm;