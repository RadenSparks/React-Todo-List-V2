import { useState, useEffect } from 'react';
import { ChakraProvider, Box, Button, Heading, Text, extendTheme } from '@chakra-ui/react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    return savedMode === 'true';
  });

  const [toDo, setToDo] = useState([
    { id: 1, title: 'Task 1', status: false, createdAt: new Date().toLocaleString(), priority: 'low', details: '' },
    { id: 2, title: 'Task 2', status: false, createdAt: new Date().toLocaleString(), priority: 'medium', details: '' }
  ]);

  const [newTask, setNewTask] = useState('');
  const [updateData, setUpdateData] = useState(null);

  const addTask = (priority, details) => {
    if (newTask.trim()) {
      const newId = toDo.length ? Math.max(toDo.map(task => task.id)) + 1 : 1;

      setToDo(prevTasks => [
        ...prevTasks,
        { id: newId, title: newTask, status: false, createdAt: new Date().toLocaleString(), priority, details }
      ]);

      setNewTask('');
    }
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setToDo(prevTasks => prevTasks.filter(task => task.id !== id));
    }
  };

  const markDone = (id) => {
    setToDo(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, status: !task.status } : task
    ));
  };

  const cancelUpdate = () => {
    setUpdateData(null);
  };

  const handleUpdateChange = (e) => {
    setUpdateData(prevData => ({ ...prevData, title: e.target.value }));
  };

  const updateTask = (taskId, updatedData) => {
    setToDo(prevTasks => prevTasks.map(task => 
      task.id === taskId ? { ...task, ...updatedData } : task
    ));
    setUpdateData(null);
  };

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('isDarkMode', newMode);
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
