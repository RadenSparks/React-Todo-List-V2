import React from 'react';
import { Box, Button, Input, Select } from '@chakra-ui/react';

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  const { title, details, priority, id } = updateData;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask(id, { title, details, priority });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" mb={4}>
      <Input
        placeholder="Task Title"
        name="title"  // Add name attribute
        value={title}
        onChange={changeHolder}
        mb={2}
      />
      <Input
        placeholder="Task Details"
        name="details"  // Add name attribute
        value={details}
        onChange={changeHolder}
        mb={2}
      />
      <Select
        placeholder="Select Priority"
        name="priority"  // Add name attribute
        value={priority}
        onChange={changeHolder}
        mb={2}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </Select>
      <Button type="submit" colorScheme="blue" mr={2}>Update Task</Button>
      <Button onClick={cancelUpdate} colorScheme="gray">Cancel</Button>
    </Box>
  );
};

export default UpdateForm;
