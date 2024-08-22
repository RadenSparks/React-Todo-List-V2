import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from "react";

function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false, createdAt: new Date().toLocaleString(), priority: 'low', details: '' },
    { id: 2, title: 'Task 2', status: false, createdAt: new Date().toLocaleString(), priority: 'medium', details: '' }
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState(null);

  // Add task 
  const addTask = (priority, details) => {
    if (newTask) {
      const newId = toDo.length ? Math.max(toDo.map(task => task.id)) + 1 : 1; // Better ID generation

      setToDo([
        ...toDo,
        { id: newId, title: newTask, status: false, createdAt: new Date().toLocaleString(), priority, details } // Include details
      ]);

      setNewTask('');
    }
  };

  // Delete task 
  const deleteTask = (id) => {
    setToDo(toDo.filter(task => task.id !== id));
  };

  // Mark task as done or completed
  const markDone = (id) => {
    setToDo(toDo.map(
      task => task.id === id
        ? ({ ...task, status: !task.status })
        : task
    ));
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData(null);
  };

  // Change task for update
  const changeHolder = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = (taskId, updatedData) => {
    const updatedTasks = toDo.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    );

    setToDo(updatedTasks);
    setUpdateData(null);
  };

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <br /><br />
      <h2>To Do List App (ReactJS)</h2>
      <button onClick={toggleTheme} className="btn btn-secondary" aria-label={`Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`}>
        Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <br /><br />

      {updateData ? (
        <UpdateForm
          updateData={updateData}
          changeHolder={changeHolder}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}

      {toDo.length === 0 && <p>No Tasks...</p>}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
        updateTask={updateTask} // Pass the updateTask function here
      />
    </div>
  );
}

export default App;
