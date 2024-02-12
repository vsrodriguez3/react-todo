import React from 'react';
import style from './TodoListItem.module.css';
import { FaTrash } from "react-icons/fa";


function TodoListItem({ title, id, onRemoveTodo }) {
  
  return (
    <li className={style.ListItem}>
      {title}
      <button
        className={style.trashButton} 
        type="button" 
        onClick={() => onRemoveTodo(id)}
      >
        <FaTrash className={style.trashIcon} />
      </button>
    </li>
  );
};

export default TodoListItem;