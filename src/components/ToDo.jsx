import React from 'react';
import { Box, Text, Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const ToDo = ({ toDo, markDone, deleteTask, setUpdateData }) => {
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const lowPriorityColor = useColorModeValue('green.100', 'green.900');
  const mediumPriorityColor = useColorModeValue('yellow.100', 'yellow.900');
  const highPriorityColor = useColorModeValue('red.100', 'red.900');
  const defaultColor = useColorModeValue('white', 'gray.800');

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return lowPriorityColor;
      case 'medium':
        return mediumPriorityColor;
      case 'high':
        return highPriorityColor;
      default:
        return defaultColor;
    }
  };

  return (
    <>
      {toDo.map((task) => (
        <Box
          key={task.id}
          p={4}
          borderWidth={1}
          borderRadius="md"
          mb={4}
          bg={getPriorityColor(task.priority)}
          shadow="sm"
          _hover={{ shadow: 'md' }}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text
              fontWeight={task.status ? 'bold' : 'normal'}
              textDecoration={task.status ? 'line-through' : 'none'}
              color={textColor}
              fontSize="lg"
            >
              {task.title}
            </Text>
            <Flex>
              <IconButton
                icon={<FontAwesomeIcon icon={faCircleCheck} />}
                onClick={() => markDone(task.id)}
                aria-label="Mark as done"
                colorScheme="green"
                mr={2}
              />
              <IconButton
                icon={<FontAwesomeIcon icon={faPen} />}
                onClick={() => setUpdateData(task)}
                aria-label="Edit task"
                colorScheme="blue"
                mr={2}
              />
              <IconButton
                icon={<FontAwesomeIcon icon={faTrashCan} />}
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
                colorScheme="red"
              />
            </Flex>
          </Flex>
          <Text mt={2} color={textColor}><strong>Details:</strong> {task.details || 'No details provided.'}</Text>
          <Text color={textColor}><strong>Priority:</strong> {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</Text>
          <Text color={textColor}><strong>Created At:</strong> {task.createdAt}</Text>
          <Text color={textColor}><strong>Deadline:</strong> {task.deadline ? task.deadline : 'No deadline set.'}</Text>
        </Box>
      ))}
    </>
  );
};

export default ToDo;
