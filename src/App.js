import React, { useState } from 'react';
import { useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import style from './App.module.css';


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

/*-------------------------Sidebar info begins here-------------------------*/
  // Function to remove leading zeros from hours and convert to 12-hour format
  function formatTime(date) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const isPM = hours >= 12;
    if (hours > 12) {
      hours -= 12; 
    } else if (hours === 0) {
      hours = 12; 
    }
    // Ensure minutes display two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${formattedMinutes}${isPM ? 'pm' : 'am'}`;
  }

  // Sidebar display info
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const personName = "Vanessa Rodriguez";
  const currentDate = new Date().toLocaleDateString();
/*-------------------------Sidebar info ends here-------------------------*/

  return (
    <div className={style.appBackground}>
      <div className={style.sidebar}>
        <div className={style.personInfo}>
          <h3>{personName}</h3>
          <p>{currentDate}</p>
          <p>{currentTime}</p>
        </div>
      </div>
      <div className={style.mainContent}>
        <blockquote className={style.inspirationalQuote}>
          "The only way to do great work is to love what you do."
          <footer className={style.quoteAuthor}>—Steve Jobs</footer>
        </blockquote>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <>
                <h1>Tasks</h1>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                )}
                <AddTodoForm onAddTodo={addTodo} />
              </>
            } />
            <Route path="/new" element={<h1>New To-Do List</h1>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;