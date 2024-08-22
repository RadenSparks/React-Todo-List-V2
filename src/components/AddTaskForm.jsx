import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  const [taskDetails, setTaskDetails] = useState(''); // State for task details
  const [priority, setPriority] = useState('low'); // Default priority

  const handleAddTask = () => {
    if (newTask) {
      addTask(priority, taskDetails); // Pass the selected priority and details
      setNewTask(''); // Reset task name
      setTaskDetails(''); // Reset task details
      setPriority('low'); // Reset priority after adding
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div>
      <label htmlFor="taskName">Task Name:</label>
      <input 
        id="taskName"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="form-control"
        placeholder="Add a new task"
        onKeyPress={handleKeyPress}
      />
      
      <label htmlFor="taskDetails">Task Details:</label>
      <input 
        id="taskDetails"
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
        className="form-control"
        placeholder="Add task details"
        onKeyPress={handleKeyPress}
      />
      
      <label htmlFor="taskPriority">Priority:</label>
      <select 
        id="taskPriority"
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
        className="form-control"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
      <button onClick={handleAddTask} className="btn btn-primary">Add Task</button>
    </div>
  );
};

AddTaskForm.propTypes = {
  newTask: PropTypes.string.isRequired,
  setNewTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
