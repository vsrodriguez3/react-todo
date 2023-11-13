import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList }) {
    const todoListTasks = todoList.map(task => (
      <TodoListItem key={task.id} title={task.title} />
    ));

    return (
        <ul>{todoListTasks}</ul>
    );
};

export default TodoList;