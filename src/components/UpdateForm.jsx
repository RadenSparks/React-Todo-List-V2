import React from 'react';
import { Box, Button, Input, Select } from '@chakra-ui/react';

const UpdateForm = ({ updateData, changeHolder, updateTask, cancelUpdate }) => {
  const handleChange = (e) => {
    changeHolder(e);
  };

  return (
    <Box display="flex" alignItems="center" mb={4}> {/* Flex container for alignment */}
      <Box flex="1" mr={2}> {/* Flex item for input field */}
        <Input 
          value={updateData?.title || ''} // Binds the input value to updateData.title if updateData exists
          onChange={handleChange} // Calls changeHolder function to update the input value on change
          placeholder="Update task title..." // Placeholder text
          aria-label="Task Title" // Accessibility label
          size="lg" // Size of the input
        />
      </Box>
      <Box mr={2}> {/* Flex item for dropdown */}
        <Select 
          onChange={handleChange} 
          value={updateData?.priority || 'low'} // Default to 'low' if no priority is set
          aria-label="Task Priority" // Accessibility label
          size="lg" // Size of the select
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </Select>
      </Box>
      <Box> {/* Flex item for buttons */}
        <Button
          onClick={updateTask} // Calls updateTask function when clicked
          colorScheme="green" // Chakra UI color scheme for success
          size="lg" // Size of the button
          isDisabled={!updateData?.title?.trim()} // Disable if title is empty or whitespace
          mr={2} // Margin right
        >
          Update
        </Button>
        <Button
          onClick={cancelUpdate} // Calls cancelUpdate function when clicked
          colorScheme="yellow" // Chakra UI color scheme for warning
          size="lg" // Size of the button
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateForm; // Exports the UpdateForm component for use in other parts of the application
