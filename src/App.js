import React, { useState } from 'react';
import TodoList from './TodoList.js';
import AddTodoForm from './AddTodoForm.js';

function App() {
  const [newTodo, setNewTodo] = useState('');
  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodoForm onAddTodo={setNewTodo} />
      <p>{newTodo}</p>
      <TodoList />
    </div>
  );
};

export default App;