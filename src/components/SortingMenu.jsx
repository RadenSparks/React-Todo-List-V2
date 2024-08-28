import React from 'react';
import { Box, Heading, VStack, Checkbox, Button, Stack, Text } from '@chakra-ui/react';

const SortingMenu = ({ sortCriteria, handleSortChange, resetSort, selectAllSort }) => {
  return (
    <Box 
      width={{ base: "full", md: "250px" }} 
      p={5} 
      bg="gray.200" 
      boxShadow="md" 
      borderTopWidth={{ base: "1px", md: "0" }} 
      borderTopColor="gray.300"
      borderRadius="md"
    >

      <Heading as="h5" size="sm" mb={3} color="teal.600">
        Sort Tasks
      </Heading>
      <VStack align="start" spacing={4}>
        <Checkbox 
          name="priority" 
          onChange={handleSortChange} 
          isChecked={sortCriteria.priority} 
          colorScheme="teal"
        >
          <Text color="black">From Highest to Lowest Priority</Text>
        </Checkbox>
        <Checkbox 
          name="title" 
          onChange={handleSortChange} 
          isChecked={sortCriteria.title} 
          colorScheme="teal"
        >
          <Text color="black">From A to Z</Text>
        </Checkbox>
        <Checkbox 
          name="deadline" 
          onChange={handleSortChange} 
          isChecked={sortCriteria.deadline} 
          colorScheme="teal"
        >
          <Text color="black">From Closest Deadline to Furthest</Text>
        </Checkbox>
        <Checkbox 
          name="status" 
          onChange={handleSortChange} 
          isChecked={sortCriteria.status} 
          colorScheme="teal"
        >
          <Text color="black">From Newest to Oldest</Text>
        </Checkbox>

        <Stack spacing={4} mt={4}>
          <Button colorScheme="red" onClick={resetSort}>Reset</Button>
          <Button colorScheme="teal" onClick={selectAllSort}>Select All</Button>
        </Stack>
      </VStack>
    </Box>
  );
};

export default SortingMenu;
