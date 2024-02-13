import React from 'react';
import TodoListItem from './TodoListItem';
import style from './TodoList.module.css';
import PropTypes from 'prop-types';


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

// propTypes 
TodoList.propTypes = {
  todoList: PropTypes.array.isRequired, 
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;