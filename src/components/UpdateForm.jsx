import React from 'react';
import { Box, Button, Input, Select } from '@chakra-ui/react';

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  const handleChange = (e) => {
    changeHolder(e);
  };

  return (
    <Box display="flex" alignItems="center" mb={4}>
      <Box flex="1" mr={2}>
        <Input 
          value={updateData?.title || ''}
          onChange={handleChange}
          placeholder="Update task title..."
          aria-label="Task Title"
          size="lg"
        />
      </Box>
      <Box mr={2}>
        <Select 
          onChange={handleChange} 
          value={updateData?.priority || 'low'}
          aria-label="Task Priority"
          size="lg"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </Box>
      <Box flex="1" mr={2}>
        <Input 
          type="date"
          value={updateData?.deadline || ''}
          onChange={handleChange}
          aria-label="Task Deadline"
          size="lg"
        />
      </Box>
      <Box>
        <Button
          onClick={updateTask}
          colorScheme="green"
          size="lg"
          isDisabled={!updateData?.title?.trim()}
          mr={2}
        >
          Update
        </Button>
        <Button
          onClick={cancelUpdate}
          colorScheme="yellow"
          size="lg"
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateForm;
