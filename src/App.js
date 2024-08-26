import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Text, extendTheme, Grid, Flex, Button, Icon, useToast } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'; // Importing an icon
import AddTaskForm from './components/AddTaskForm.jsx';
import ToDo from './components/ToDo.jsx';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(to right, #f0f4f8, #e0e7ef)', // Gradient background
        color: 'gray.800',
      },
    },
  },
});

function App() {
  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false, createdAt: new Date().toLocaleString(), priority: 'low', details: '' },
    { id: 2, title: 'Task 2', status: false, createdAt: new Date().toLocaleString(), priority: 'medium', details: '' }
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState(null);
  const toast = useToast(); // Chakra UI toast hook

  const addTask = (priority, details, deadline, summary) => {
    if (newTask.trim()) {
      const newId = toDo.length ? Math.max(...toDo.map(task => task.id)) + 1 : 1;
  
      setToDo(prevTasks => [
        ...prevTasks,
        { id: newId, title: newTask, status: false, createdAt: new Date().toLocaleString(), priority, details, deadline, summary }
      ]);
  
      setNewTask('');
      toast({
        title: "Task Added.",
        description: "Your new task has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setToDo(prevTasks => prevTasks.filter(task => task.id !== id));
      toast({
        title: "Task Deleted.",
        description: "The task has been deleted successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const markDone = (id) => {
    setToDo(prevTasks => prevTasks.map(task =>
      task.id === id ? { ...task, status: !task.status } : task
    ));
    toast({
      title: "Task Status Updated.",
      description: "The task status has been updated.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  const cancelUpdate = () => {
    setUpdateData(null);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData(prevData => ({ ...prevData, [name]: value }));
  };

  const updateTask = (taskId, updatedData) => {
    setToDo(prevTasks => prevTasks.map(task =>
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
    setUpdateData(null);
    toast({
      title: "Task Updated.",
      description: "The task has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Flex direction="column" minH="100vh">
        <Box p={5} flex="1">
          <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">
            To-Do List App
          </Heading>

          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />

          {toDo.length === 0 ? (
            <Text textAlign="center" color="gray.500" mt={4}>No Tasks...</Text>
          ) : (
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6} mt={4}>
              <ToDo
                toDo={toDo}
                markDone={markDone}
                setUpdateData={setUpdateData}
                deleteTask={deleteTask}
                updateTask={updateTask}
                updateData={updateData}
                handleUpdateChange={handleUpdateChange}
                cancelUpdate={cancelUpdate}
              />
            </Grid>
          )}
        </Box>
        <Box p={4} bg="teal.500" color="white" textAlign="center" borderTopRadius="md">
          <Text fontSize="lg">© 2024 To-Do App</Text>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
