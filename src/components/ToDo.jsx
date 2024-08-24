import React from 'react';
import { Box, Text, Flex, IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ toDo, markDone, deleteTask, setUpdateData }) => {
  const { colorMode } = useColorMode();
  
  // Use different text colors depending on the color mode
  const textColor = useColorModeValue('black', 'white'); // Black in light mode, white in dark mode

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'green.100'; // Light green for low priority
      case 'medium':
        return 'yellow.100'; // Light yellow for medium priority
      case 'high':
        return 'red.100'; // Light red for high priority
      default:
        return 'white'; // Default background
    }
  };

  return (
    <>
      {toDo.map((task, index) => (
        <Box
          key={task.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          mb={4}
          bg={getPriorityColor(task.priority)} // Set background color based on priority
          className="taskBg"
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text 
              fontWeight={task.status ? 'bold' : 'normal'} 
              textDecoration={task.status ? 'line-through' : 'none'}
              color={textColor} // Set the text color based on the color mode
            >
              <span style={{ fontWeight: 'bold', color: 'teal' }}>{index + 1}. </span>
              {task.title}
            </Text>
            <Flex>
              <IconButton
                icon={<FontAwesomeIcon icon={faCircleCheck} />}
                onClick={() => markDone(task.id)}
                aria-label="Mark as done"
                variant="outline"
                colorScheme="green"
                mr={2}
              />
              <IconButton
                icon={<FontAwesomeIcon icon={faPen} />}
                onClick={() => setUpdateData(task)} // Ensure this includes all necessary fields
                aria-label="Edit task"
                variant="outline"
                colorScheme="blue"
                mr={2}
              />
              <IconButton
                icon={<FontAwesomeIcon icon={faTrashCan} />}
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                variant="outline"
                colorScheme="red"
              />
            </Flex>
          </Flex>
          <Text mt={2} color={textColor}><strong>Details:</strong> {task.details || 'No details provided.'}</Text>
          <Text color={textColor}><strong>Priority:</strong> {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</Text>
          <Text color={textColor}><strong>Created At:</strong> {new Date(task.createdAt).toLocaleString()}</Text>
          <Text color={textColor}><strong>Deadline:</strong> {task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline set.'}</Text>
        </Box>
      ))}
    </>
  );
};

export default ToDo;
