import React, { useState } from 'react';
import { useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodoForm from './components/AddTodoForm';
import { BrowserRouter, Routes, Route, NavLink,  } from 'react-router-dom';
import style from './App.module.css';


function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function fetchData() {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=Grid%20view&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc`;

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


      // Sorting lesson-5-1
      data.records.sort((objectA, objectB) => {
        const titleA = objectA.fields.title.toUpperCase(); 
        const titleB = objectB.fields.title.toUpperCase();
        if (titleA < titleB) {
          return 1;
        }
        if (titleA > titleB) {
          return -1;
        } else {
          return 0; 
        }
      });
      // Sorting ends

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

// start POST
  const postTodoToAirtable = async (newTodoTitle) => {
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    
    const data = {
      fields: {
        title: newTodoTitle,
      },
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      //update state to include new task
      setTodoList((prevList) => [...prevList, {
        id: responseData.id, 
        title: newTodoTitle, 
      }]);
    } catch (error) {
      console.error('There was an error:', error);
    }
  };
// end POST   


  useEffect(() => {
    fetchData();
  }, []); 

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(todoTitle) {
    postTodoToAirtable(todoTitle);
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
    <BrowserRouter> 
      <div className={style.appBackground}>
        <div className={style.sidebar}>
          <div className={style.personInfo}>
            <h3>{personName}</h3>
            <p>{currentDate}</p>
            <p>{currentTime}</p>
          </div>
          <nav className={style.sidebarNav}>
            <ul>
              <li>
                <NavLink to="/" className={({ isActive }) => isActive ? style.activeLink : style.link}>Dashboard</NavLink>
              </li>
              <li>
                <NavLink to="/new" className={({ isActive }) => isActive ? style.activeLink : style.link}>New List</NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className={style.mainContent}>
          <blockquote className={style.inspirationalQuote}>
            "The only way to do great work is to love what you do."
            <footer className={style.quoteAuthor}>—Steve Jobs</footer>
          </blockquote>
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
            <Route path="/new" element={ 
              <>
                <h1>New List</h1>
                <AddTodoForm onAddTodo={addTodo} />
              </>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;