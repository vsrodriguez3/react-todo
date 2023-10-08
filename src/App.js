import React from 'react';
import TodoList from './TodoList.js';
import AddTodoForm from './AddTodoForm.js';

function App() {
  return (
    <div>
      <h1>To-Do List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;