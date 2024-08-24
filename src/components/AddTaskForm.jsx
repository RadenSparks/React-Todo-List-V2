import React, { useState } from 'react';
import { Box, Button, Input, Select, Textarea, Flex } from '@chakra-ui/react';

const AddTaskForm = ({ newTask, setNewTask, addTask }) => {
  const [priority, setPriority] = useState('medium');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddTask = () => {
    addTask(priority, details, deadline);
    setDetails('');
    setDeadline(''); // Reset deadline input after adding the task
  };

  return (
    <Box p={5} bg="white" shadow="md" borderRadius="md">
      <Input
        placeholder="Enter task title"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        mb={3}
        borderColor="gray.300"
      />
      <Textarea
        placeholder="Enter task details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        mb={3}
        borderColor="gray.300"
      />
      <Input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        mb={3}
        borderColor="gray.300"
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        mb={4}
        borderColor="gray.300"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </Select>
      <Flex justifyContent="flex-end">
        <Button colorScheme="teal" onClick={handleAddTask}>
          Add Task
        </Button>
      </Flex>
    </Box>
  );
};

export default AddTaskForm;
