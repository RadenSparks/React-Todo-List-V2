import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Input, Select, Textarea, Flex, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  // Determine if form fields are valid
  const isValid = updateData.title && updateData.details;

  return (
    <Box
      p={5}
      bg="white"
      shadow="md"
      borderRadius="md"
    >
      <FormControl mb={3} isRequired isInvalid={!updateData.title}>
        <FormLabel htmlFor="title">Task Title</FormLabel>
        <Input
          id="title"
          placeholder="Update task title"
          value={updateData.title || ''}
          name="title"
          onChange={changeHolder}
          borderColor="gray.300"
          aria-label="Task title"
        />
        {!updateData.title && <FormErrorMessage>Title is required.</FormErrorMessage>}
      </FormControl>
      
      <FormControl mb={3} isRequired isInvalid={!updateData.details}>
        <FormLabel htmlFor="details">Task Details</FormLabel>
        <Textarea
          id="details"
          placeholder="Update task details"
          value={updateData.details || ''}
          name="details"
          onChange={changeHolder}
          borderColor="gray.300"
          aria-label="Task details"
        />
        {!updateData.details && <FormErrorMessage>Details are required.</FormErrorMessage>}
      </FormControl>
      
      <FormControl mb={3}>
        <FormLabel htmlFor="summary">Task Summary</FormLabel>
        <Input
          id="summary"
          placeholder="Update task summary"
          value={updateData.summary || ''}
          name="summary"
          onChange={changeHolder}
          borderColor="gray.300"
          aria-label="Task summary"
        />
      </FormControl>
      
      <FormControl mb={4}>
        <FormLabel htmlFor="priority">Priority</FormLabel>
        <Select
          id="priority"
          value={updateData.priority || 'medium'}
          name="priority"
          onChange={changeHolder}
          borderColor="gray.300"
          aria-label="Task priority"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </Select>
      </FormControl>
      
      <FormControl mb={4}>
        <FormLabel htmlFor="deadline">Deadline</FormLabel>
        <Input
          id="deadline"
          type="datetime-local"
          value={updateData.deadline || ''}
          name="deadline"
          onChange={changeHolder}
          borderColor="gray.300"
          aria-label="Task deadline"
        />
      </FormControl>
      
      <Flex justifyContent="space-between">
        <Button colorScheme="gray" onClick={cancelUpdate}>
          Cancel
        </Button>
        <Button
          colorScheme="teal"
          onClick={() => updateTask(updateData.id, updateData)}
          disabled={!isValid} // Use the validation logic here
        >
          Update Task
        </Button>
      </Flex>
    </Box>
  );
};

UpdateForm.propTypes = {
  updateData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    details: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']),
    deadline: PropTypes.string,
    summary: PropTypes.string
  }).isRequired,
  changeHolder: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  cancelUpdate: PropTypes.func.isRequired,
};

export default UpdateForm;
