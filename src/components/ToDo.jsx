import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Box, Text, Input, Button, Textarea, Flex, IconButton, Stack, useColorMode } from '@chakra-ui/react';

const priorityColors = {
  low: 'green.200',
  medium: 'yellow.300',
  high: 'red.300',
};

const priorityOrder = {
  high: 1,
  medium: 2,
  low: 3,
};

const ToDo = ({ toDo, markDone, deleteTask, updateTask }) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDetails, setEditedDetails] = useState('');
  const [editedDeadline, setEditedDeadline] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { colorMode } = useColorMode(); // Get color mode

  const handleEditTask = (taskId) => {
    updateTask(taskId, { title: editedTitle, details: editedDetails, deadline: editedDeadline });
    setEditingTaskId(null);
  };

  const sortedTasks = [...toDo].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const filteredTasks = sortedTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Input
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
        borderColor="blue.300"
        focusBorderColor="blue.500"
        bg={colorMode === 'dark' ? 'gray.700' : 'white'} // Adjust background for dark mode
        color={colorMode === 'dark' ? 'white' : 'black'} // Adjust text color for dark mode
        _placeholder={{ color: colorMode === 'dark' ? 'gray.400' : 'gray.500' }} // Adjust placeholder color
      />
      {filteredTasks.map((task, index) => {
        const createdAt = new Date(task.createdAt).toLocaleString();
        const deadline = task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline set';

        return (
          <Box key={task.id} p={4} borderWidth={1} borderRadius="md" mb={4} className="taskBg">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontWeight={task.status ? 'bold' : 'normal'} textDecoration={task.status ? 'line-through' : 'none'}>
                <span className="taskNumber">{index + 1}</span>
                {editingTaskId === task.id ? (
                  <Input
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    placeholder="Edit task title..."
                    mt={2}
                  />
                ) : (
                  <Text as="span" ml={2}>{task.title}</Text>
                )}
                <Text as="span" ml={2} fontSize="sm" color="gray.500">{createdAt}</Text>
                <Box 
                  as="span" 
                  ml={2} 
                  bg={priorityColors[task.priority]} 
                  color="black" 
                  px={2} 
                  py={1} 
                  borderRadius="md"
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </Box>
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
                  onClick={() => {
                    setEditingTaskId(task.id);
                    setEditedTitle(task.title);
                    setEditedDetails(task.details || '');
                    setEditedDeadline(task.deadline || '');
                  }}
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
            <Stack spacing={2} mt={4}>
              <Text><strong>Details:</strong> {task.details || 'No details provided.'}</Text>
              <Text><strong>Deadline:</strong> {deadline}</Text>
              {editingTaskId === task.id && (
                <>
                  <Textarea
                    value={editedDetails}
                    onChange={(e) => setEditedDetails(e.target.value)}
                    rows={3}
                    placeholder="Edit task details..."
                  />
                  <Input
                    type="date"
                    value={editedDeadline}
                    onChange={(e) => setEditedDeadline(e.target.value)}
                    placeholder="Edit task deadline..."
                    mt={2}
                  />
                  <Flex justifyContent="space-between">
                    <Button
                      onClick={() => handleEditTask(task.id)}
                      colorScheme="blue"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingTaskId(null)}
                      colorScheme="red"
                    >
                      Cancel
                    </Button>
                  </Flex>
                </>
              )}
            </Stack>
          </Box>
        );
      })}
    </>
  );
}

export default ToDo;
