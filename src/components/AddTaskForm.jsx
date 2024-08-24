import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Input, Select, Button, FormLabel, FormErrorMessage } from '@chakra-ui/react';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  const [taskDetails, setTaskDetails] = useState('');
  const [priority, setPriority] = useState('low');
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (!newTask.trim()) {
      setError("Task name cannot be empty");
      return;
    }
    addTask(priority, taskDetails, deadline);
    setNewTask('');
    setTaskDetails('');
    setPriority('low');
    setDeadline('');
    setError(''); // Clear error on successful add
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <Box mb={3}>
      <FormLabel htmlFor="taskName">Task Name:</FormLabel>
      <Input 
        id="taskName"
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
          setError(''); // Clear error when user types
        }}
        placeholder="Add a new task"
        onKeyPress={handleKeyPress}
        aria-required="true"
        aria-invalid={!!error} // Indicate if there's an error
      />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      
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
      
      <FormLabel htmlFor="taskDeadline" mt={2}>Deadline:</FormLabel>
      <Input 
        id="taskDeadline"
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      
      <Button 
        onClick={handleAddTask} 
        colorScheme="blue"
        mt={3}
        isDisabled={!newTask.trim()}
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
