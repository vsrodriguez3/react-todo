import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoList.module.css';


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
    <ul className={style.todoList}>{todoListTasks}</ul>
  );
};

export default TodoList;