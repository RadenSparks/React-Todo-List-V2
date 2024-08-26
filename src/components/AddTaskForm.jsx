import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Input, Button, Select, Textarea, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  const [priority, setPriority] = useState('low');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (!newTask) {
      setError('Task title is required');
      return;
    }
    setError('');
    addTask(priority, details, deadline, summary);
    setPriority('low');
    setDetails('');
    setDeadline('');
    setSummary('');
    setNewTask('');
    toast({
      title: "Task Added",
      description: "Your task has been added successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const isFormValid = newTask.trim() !== '';

  return (
    <Box
      p={6}
      bg="white"
      shadow="md"
      borderRadius="md"
      maxW="md"
      mx="auto"
    >
      <FormControl id="task-title" mb={4} isInvalid={!!error}>
        <FormLabel fontWeight="bold">Task Title</FormLabel>
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter task title"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <FormControl id="task-priority" mb={4}>
        <FormLabel fontWeight="bold">Priority</FormLabel>
        <Select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          borderColor="gray.300"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </FormControl>
      <FormControl id="task-details" mb={4}>
        <FormLabel fontWeight="bold">Details</FormLabel>
        <Textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Enter task details"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
        />
      </FormControl>
      <FormControl id="task-deadline" mb={4}>
        <FormLabel fontWeight="bold">Deadline</FormLabel>
        <Input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          borderColor="gray.300"
        />
      </FormControl>
      <FormControl id="task-summary" mb={4}>
        <FormLabel fontWeight="bold">Summary</FormLabel>
        <Textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter task summary"
          borderColor="gray.300"
          _placeholder={{ color: 'gray.500' }}
        />
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handleAddTask}
        isDisabled={!isFormValid}
        w="full"
        mt={4}
        borderRadius="md"
        _hover={{ bg: 'teal.600' }}
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
