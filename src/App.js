import React from 'react';

const todoList = [
  {
    id: 0,
    title: "Complete Physics homework"
  },
  {
    id: 1,
    title: "Read Discrete Math Chapter 1"
  },
  {
    id: 2,
    title: "Watch nutrition documentary"
  }
]

function App() {
  const todoListTasks = todoList.map(task => 
    <li key={task.id}>
      {task.title}
    </li>
  )

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>{todoListTasks}</ul>
    </div>
  );
}

export default App;