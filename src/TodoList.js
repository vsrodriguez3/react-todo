import React from 'react';
import TodoListItem from './TodoListItem';

function TodoList({ todoList, onRemoveTodo }) {
    const todoListTasks = todoList.map(task => (
      <TodoListItem
        key={task.id}
        id={task.id} 
        title={task.title}
        onRemoveTodo={onRemoveTodo} 
      />
    ));

    return (
        <ul>{todoListTasks}</ul>
    );
};

export default TodoList;