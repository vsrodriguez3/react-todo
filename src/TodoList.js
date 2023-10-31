import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
    {
      id: 0,
      title: "Complete Physics homework"
    },
    {
      id: 1,
      title: "Read Discrete Math Chapter 1"
    },
    {
      id: 2,
      title: "Watch nutrition documentary"
    }
  ];

function TodoList() {
    const todoListTasks = todoList.map(task => (
      <TodoListItem key={task.id} title={task.title} />
    ));

    return (
        <ul>{todoListTasks}</ul>
    );
};

export default TodoList;