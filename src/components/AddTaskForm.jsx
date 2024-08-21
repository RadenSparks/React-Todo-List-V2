import React, { useState } from 'react';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  const [taskDetails, setTaskDetails] = useState(''); // State for task details
  const [priority, setPriority] = useState('low'); // Default priority

  const handleAddTask = () => {
    if (newTask && taskDetails) {
      addTask(newTask, taskDetails, priority); // Pass name, details, and priority
      setNewTask(''); // Reset task name
      setTaskDetails(''); // Reset task details
      setPriority('low'); // Reset priority after adding
    }
  };

  return (
    <div>
      <input 
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="form-control"
        placeholder="Add a new task"
      />
      <input 
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
        className="form-control"
        placeholder="Add task details"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="form-control">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button onClick={handleAddTask} className="btn btn-primary">Add Task</button>
    </div>
  );
};

export default AddTaskForm;
