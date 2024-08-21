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
    { id: 1, title: 'Task 1', status: false, createdAt: new Date().toLocaleString() },
    { id: 2, title: 'Task 2', status: false, createdAt: new Date().toLocaleString() }
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState('');

  // Add task 
  const addTask = (priority) => {
    if (newTask) {
      let num = toDo.length + 1;

      setToDo([
        ...toDo,
        { id: num, title: newTask, status: false, createdAt: new Date().toLocaleString(), priority } // Include priority
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
    setUpdateData('');
  };

  // Change task for update
  const changeHolder = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter(task => task.id !== updateData.id);
    setToDo([
      ...removeOldRecord,
      updateData
    ]);

    setUpdateData('');
  };

  // Toggle Theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`container App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <br /><br />
      <h2>To Do List App (ReactJS)</h2>
      <button onClick={toggleTheme} className="btn btn-secondary">
        Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>
      <br /><br />

      {updateData && updateData ? (
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

      {toDo && toDo.length === 0 ? 'No Tasks...' : ''}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;
