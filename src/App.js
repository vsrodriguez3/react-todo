import React, { useState } from 'react';
import { useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function useSemiPersistentState() {
  const [todoList, setTodoList] = useState(() => 
    JSON.parse(localStorage.getItem('savedTodoList')) || []
  );

  useEffect(() => {
    localStorage.setItem('savedTodoList', JSON.stringify(todoList))

  }, [todoList]);

  return [todoList, setTodoList];
}

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList(prevList => [...prevList, newTodo]);
  }

  return (
    <>
      <h1>To-Do List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <p></p>
      <TodoList todoList={todoList} />
    </>
  );
};

export default App;