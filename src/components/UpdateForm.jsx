import React from 'react';
import { Box, Button, Input, Select, Textarea, Flex } from '@chakra-ui/react';

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  return (
    <Box p={5} bg="white" shadow="md" borderRadius="md">
      <Input
        placeholder="Update task title"
        value={updateData.title}
        name="title"
        onChange={changeHolder}
        mb={3}
        borderColor="gray.300"
      />
      <Textarea
        placeholder="Update task details"
        value={updateData.details}
        name="details"
        onChange={changeHolder}
        mb={3}
        borderColor="gray.300"
      />
      <Select
        value={updateData.priority}
        name="priority"
        onChange={changeHolder}
        mb={4}
        borderColor="gray.300"
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </Select>
      <Flex justifyContent="space-between">
        <Button colorScheme="gray" onClick={cancelUpdate}>
          Cancel
        </Button>
        <Button colorScheme="teal" onClick={() => updateTask(updateData.id, updateData)}>
          Update Task
        </Button>
      </Flex>
    </Box>
  );
};

export default UpdateForm;
