import React from 'react';
import style from './TodoListItem.module.css';
import { FaTrash } from "react-icons/fa";
import PropTypes from 'prop-types';


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

// propTypes
TodoListItem.propTypes = {
  title: PropTypes.string.isRequired, 
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, 
  onRemoveTodo: PropTypes.func.isRequired, 
};

export default TodoListItem;