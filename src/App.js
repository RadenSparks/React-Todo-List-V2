import { useState, useEffect } from 'react';
import { ChakraProvider, Box, Button, Heading, Text, VStack, extendTheme } from '@chakra-ui/react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

// Create a theme that supports light and dark modes
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false, createdAt: new Date().toLocaleString(), priority: 'low', details: '' },
    { id: 2, title: 'Task 2', status: false, createdAt: new Date().toLocaleString(), priority: 'medium', details: '' }
  ]);

  // Temp State
  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState(null);

  // Add task 
  const addTask = (priority, details) => {
    if (newTask.trim()) { // Validate input
      const newId = toDo.length ? Math.max(toDo.map(task => task.id)) + 1 : 1;

      setToDo([
        ...toDo,
        { id: newId, title: newTask, status: false, createdAt: new Date().toLocaleString(), priority, details }
      ]);

      setNewTask('');
    }
  };

  // Delete task 
  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setToDo(toDo.filter(task => task.id !== id));
    }
  };

  // Mark task as done or completed
  const markDone = (id) => {
    setToDo(toDo.map(task => 
      task.id === id ? { ...task, status: !task.status } : task
    ));
  };

  // Cancel update
  const cancelUpdate = () => {
    setUpdateData(null);
  };

  // Change task for update
  const handleUpdateChange = (e) => {
    setUpdateData({ ...updateData, title: e.target.value });
  };

  // Update task
  const updateTask = (taskId, updatedData) => {
    const updatedTasks = toDo.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    );

    setToDo(updatedTasks);
    setUpdateData(null);
  };

  // Toggle Theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', newMode); // Save preference in local storage
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <ChakraProvider theme={theme}>
      <Box className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`} p={5}>
        <Heading as="h2" size="lg" mb={4}>To Do List App (ReactJS)</Heading>
        <Button onClick={toggleTheme} colorScheme="teal" mb={4}>
          Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button>

        {updateData ? (
          <UpdateForm
            updateData={updateData}
            changeHolder={handleUpdateChange}
            updateTask={updateTask}
            cancelUpdate={cancelUpdate}
          />
        ) : (
          <AddTaskForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />
        )}

        {toDo.length === 0 ? (
          <Text>No Tasks...</Text>
        ) : (
          <ToDo
            toDo={toDo}
            markDone={markDone}
            setUpdateData={setUpdateData}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
