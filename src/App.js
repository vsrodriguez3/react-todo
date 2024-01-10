import React, { useState } from 'react';
import { useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function fetchData() {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;

    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      }
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      };

      const data = await response.json();

      const todos = data.records.map(record => ({
        title: record.fields.title, 
        id: record.id
      })); 

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log('There was an error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setTodoList(prevList => [...prevList, newTodo]);
  }

  function removeTodo(id) {
    setTodoList(prevList => prevList.filter(task => task.id !== id));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <h1>To-Do List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
          </>
        } />
        <Route path="/new" element={<h1>New To-Do List</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;