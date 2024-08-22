import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Input, Select, Button, FormLabel, Stack } from '@chakra-ui/react';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  const [taskDetails, setTaskDetails] = useState(''); // State for task details
  const [priority, setPriority] = useState('low'); // Default priority

  const handleAddTask = () => {
    if (newTask.trim()) { // Ensure task name is not just whitespace
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
    <Box mb={3}> {/* Margin-bottom for spacing */}
      <FormLabel htmlFor="taskName">Task Name:</FormLabel>
      <Input 
        id="taskName"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        onKeyPress={handleKeyPress}
        aria-required="true" // Accessibility attribute
      />
      
      <FormLabel htmlFor="taskDetails" mt={2}>Task Details:</FormLabel>
      <Input 
        id="taskDetails"
        value={taskDetails}
        onChange={(e) => setTaskDetails(e.target.value)}
        placeholder="Add task details"
        onKeyPress={handleKeyPress}
      />
      
      <FormLabel htmlFor="taskPriority" mt={2}>Priority:</FormLabel>
      <Select 
        id="taskPriority"
        value={priority} 
        onChange={(e) => setPriority(e.target.value)} 
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      
      <Button 
        onClick={handleAddTask} 
        colorScheme="blue" // Chakra UI color scheme for button
        mt={3} // Margin-top for spacing
        isDisabled={!newTask.trim()} // Disable button if task name is empty or whitespace
      >
        Add Task
      </Button>
    </Box>
  );
};

AddTaskForm.propTypes = {
  newTask: PropTypes.string.isRequired,
  setNewTask: PropTypes.func.isRequired,
  addTask: PropTypes.func.isRequired,
};

export default AddTaskForm;
