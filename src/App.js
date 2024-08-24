import { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import ToDoGrid from "./components/ToDoGrid.jsx";

// Create a theme that supports light and dark modes
const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

function App() {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode === "true";
  });

  // Tasks (ToDo List) State
  const [toDoList, setToDoList] = useState([
    {
      id: 1,
      title: "Task 1",
      status: false,
      createdAt: new Date().toLocaleString(),
      priority: "low",
      details: "Task 1 Description",
    },
    {
      id: 2,
      title: "Task 2",
      status: false,
      createdAt: new Date().toLocaleString(),
      priority: "medium",
      details: "Task 2 Description",
    },
  ]);

  // Toggle Theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("isDarkMode", newMode); // Save preference in local storage
  };

  const updateTask = (editTask) => {
    let cloneArr = [...toDoList];

    let index = cloneArr.findIndex((obj) => obj.id === editTask.id);

    if (index !== -1) {
      // Edit the object at that index
      cloneArr[index] = { ...editTask };
    }

    setToDoList(cloneArr);
  };

  const deleteTask = (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Delete this task ?")) {
      setToDoList(toDoList.filter((elt) => elt.id != id));
    }
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ChakraProvider theme={theme}>
      <Box className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`} p={5}>
        <Heading as="h2" size="lg" mb={4}>
          Today
        </Heading>

        {/* {updateData ? (
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
        )} */}

        {toDoList.length === 0 ? (
          <Text>No Tasks...</Text>
        ) : (
          <ToDoGrid
            toDoList={toDoList}
            updateTask={updateTask}
            deleteTask={deleteTask}
            columns={6}
            gap={3}
          />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
