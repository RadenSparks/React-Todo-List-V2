import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Flex, Button, Collapse, Divider } from '@chakra-ui/react';
import UpdateForm from './UpdateForm.jsx';

// Helper function for formatting date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
};

const ToDo = ({
  toDo,
  markDone,
  setUpdateData,
  deleteTask,
  updateTask,
  updateData,
  handleUpdateChange,
  cancelUpdate
}) => {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(new Set());

  const handleMouseEnter = useCallback((taskId) => {
    if (updateData && updateData.id === taskId) return;
    setHoveredTaskId(taskId);
  }, [updateData]);

  const handleMouseLeave = useCallback(() => {
    if (updateData) return;
    setHoveredTaskId(null);
  }, [updateData]);

  const toggleCompletion = (taskId) => {
    setCompletedTasks((prev) => {
      const newCompletedTasks = new Set(prev);
      if (newCompletedTasks.has(taskId)) {
        newCompletedTasks.delete(taskId);
      } else {
        newCompletedTasks.add(taskId);
      }
      return newCompletedTasks;
    });
  };

  return (
    <>
      {toDo.map((task, index) => (
        <Box
          key={task.id}
          p={6}
          bg={completedTasks.has(task.id) ? 'green.50' : (index % 2 === 0 ? 'gray.50' : 'gray.100')}
          shadow="lg"
          borderRadius="md"
          borderLeft="6px solid"
          borderColor={
            task.priority === 'low' ? 'green.400' :
            task.priority === 'medium' ? 'yellow.400' :
            'red.400'
          }
          mb={4}
          position="relative"
          onMouseEnter={() => handleMouseEnter(task.id)}
          onMouseLeave={handleMouseLeave}
          _hover={{ transform: 'scale(1.03)', transition: 'transform 0.3s ease-in-out', shadow: 'xl' }}
        >
          <Text
            fontWeight="bold"
            color={completedTasks.has(task.id) ? 'green.800' : 'gray.800'}
            fontSize="xl"
            mb={2}
            textDecoration={completedTasks.has(task.id) ? 'line-through' : 'none'}
          >
            {task.title}
          </Text>
          <Divider borderColor="gray.300" mb={3} />
          <Box
            filter={completedTasks.has(task.id) ? 'blur(2px)' : 'none'}
            mt={4}
          >
            <Flex direction="column" mb={4}>
              <Text
                fontSize="md"
                color={completedTasks.has(task.id) ? 'green.600' : 'gray.700'}
                mb={4}
                textDecoration={completedTasks.has(task.id) ? 'line-through' : 'none'}
              >
                <strong>Summary:</strong> {task.details}
              </Text>
              <Flex mb={4} alignItems="center">
                <Box
                  p={2}
                  bg={
                    task.priority === 'low' ? 'green.100' :
                    task.priority === 'medium' ? 'yellow.100' :
                    'red.100'
                  }
                  borderRadius="md"
                  mr={4}
                >
                  <Text fontSize="sm" color={
                    task.priority === 'low' ? 'green.700' :
                    task.priority === 'medium' ? 'yellow.700' :
                    'red.700'
                  }>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                  </Text>
                </Box>
                <Text fontSize="sm" color="gray.500">
                  <strong>Deadline:</strong> {task.deadline ? formatDate(task.deadline) : 'No deadline set'}
                </Text>
              </Flex>
            </Flex>
          </Box>
          {updateData && updateData.id === task.id && (
            <Box mt={4} p={4} bg="teal.50" shadow="lg" borderRadius="md" borderTop="4px solid" borderColor="teal.300">
              <UpdateForm
                updateData={updateData}
                changeHolder={handleUpdateChange}
                updateTask={updateTask}
                cancelUpdate={cancelUpdate}
              />
            </Box>
          )}
          <Collapse in={hoveredTaskId === task.id && !(updateData && updateData.id === task.id)}>
            <Box
              p={4}
              bg="white"
              borderRadius="md"
              shadow="md"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              zIndex="10"
            >
              <Text
                fontWeight="bold"
                color={completedTasks.has(task.id) ? 'green.800' : 'gray.800'}
                textDecoration={completedTasks.has(task.id) ? 'line-through' : 'none'}
              >
                {task.title}
              </Text>
              <Text fontSize="sm" color="gray.600" mt={2}><strong>Summary:</strong> {task.summary || 'No summary available'}</Text>
              <Text fontSize="sm" color="gray.600"><strong>Details:</strong> {task.details || 'No details available'}</Text>
              <Text fontSize="sm" color="gray.600"><strong>Created at:</strong> {formatDate(task.createdAt)}</Text>
              <Text fontSize="sm" color="gray.600"><strong>Deadline:</strong> {task.deadline ? formatDate(task.deadline) : 'No deadline set'}</Text>
              <Flex mt={4} justifyContent="space-between" width="100%">
                <Button size="sm" colorScheme="teal" onClick={() => toggleCompletion(task.id)}>
                  {completedTasks.has(task.id) ? 'Undo' : 'Complete'}
                </Button>
                <Button size="sm" colorScheme="teal" onClick={() => setUpdateData(task)}>
                  Edit
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => deleteTask(task.id)}>
                  Delete
                </Button>
              </Flex>
            </Box>
          </Collapse>
        </Box>
      ))}
    </>
  );
};

ToDo.propTypes = {
  toDo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    details: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
    deadline: PropTypes.string,
    createdAt: PropTypes.string,
    summary: PropTypes.string
  })).isRequired,
  markDone: PropTypes.func,
  setUpdateData: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  updateData: PropTypes.object,
  handleUpdateChange: PropTypes.func.isRequired,
  cancelUpdate: PropTypes.func.isRequired
};

export default ToDo;
