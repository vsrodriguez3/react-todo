import React, { useState } from 'react';
import { useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ data: { todoList: JSON.parse(localStorage.getItem('savedTodoList')) || [] } }); 
      }, 2000); 
    })
    .then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []); 

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  function addTodo(newTodo) {
    setTodoList(prevList => [...prevList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(prevList => prevList.filter(task => task.id !== id));
  }

  return (
    <>
      <h1>To-Do List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </>
  );
};

export default App;