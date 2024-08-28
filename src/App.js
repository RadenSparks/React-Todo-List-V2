import React, { useState, useEffect, useCallback } from 'react';
import { ChakraProvider, Box, Heading, Text, extendTheme, Grid, Flex, Button, useToast, VStack, Input, IconButton, HStack, Spinner } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import ToDo from './components/ToDo.jsx';
import Clock from './components/Clock.jsx';
import Parallax from './components/Parallax.jsx';
import SortingMenu from './components/SortingMenu.jsx'; // Import SortingMenu
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './App.css'; // Import your CSS file for animations

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        color: 'gray.800',
      },
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: 'teal.500',
            borderColor: 'teal.500',
            color: 'white',
          },
          _hover: {
            borderColor: 'teal.600',
          },
          _focus: {
            boxShadow: '0 0 0 2px rgba(0, 255, 255, 0.5)',
          },
        },
        label: {
          fontWeight: 'bold',
          fontSize: 'lg',
        },
      },
    },
  },
});

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Project 1',
      tasks: [
        { id: 1, title: 'Task 1', status: false, createdAt: new Date().toLocaleString(), priority: 'low', details: '', deadline: '2024-09-01' },
        { id: 2, title: 'Task 2', status: false, createdAt: new Date().toLocaleString(), priority: 'medium', details: '', deadline: '2024-08-30' }
      ]
    },
    {
      id: 2,
      name: 'Project 2',
      tasks: [
        { id: 3, title: 'Task 3', status: false, createdAt: new Date().toLocaleString(), priority: 'high', details: '', deadline: '2024-08-28' }
      ]
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [newProjectName, setNewProjectName] = useState('');
  const [updateData, setUpdateData] = useState(null);
  const [sortCriteria, setSortCriteria] = useState({ priority: false, title: false, deadline: false, status: false, createdAt: false });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const addProject = useCallback(() => {
    if (newProjectName.trim()) {
      const newId = projects.length ? Math.max(...projects.map(project => project.id)) + 1 : 1;
      setProjects([...projects, { id: newId, name: newProjectName, tasks: [] }]);
      setNewProjectName('');
      setSelectedProjectId(newId);
      toast({
        title: "Project Added.",
        description: "Your new project has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [newProjectName, projects, toast]);

  const deleteProject = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
      toast({
        title: "Project Deleted.",
        description: "The project has been deleted successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      if (id === selectedProjectId) {
        setSelectedProjectId(projects.length > 1 ? projects[0].id : null);
      }
    }
  }, [selectedProjectId, projects, toast]);

  const deleteTask = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setProjects(prevProjects => prevProjects.map(project =>
        project.id === selectedProjectId
          ? { ...project, tasks: project.tasks.filter(task => task.id !== id) }
          : project
      ));
      toast({
        title: "Task Deleted.",
        description: "The task has been deleted successfully.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [selectedProjectId, toast]);

  const markDone = useCallback((id) => {
    setProjects(prevProjects => prevProjects.map(project =>
      project.id === selectedProjectId
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === id ? { ...task, status: !task.status } : task
            )
          }
        : project
    ));
    toast({
      title: "Task Status Updated.",
      description: "The task status has been updated.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  }, [selectedProjectId, toast]);

  const cancelUpdate = useCallback(() => {
    setUpdateData(null);
  }, []);

  const handleUpdateChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdateData(prevData => ({ ...prevData, [name]: value }));
  }, []);

  const updateTask = useCallback((taskId, updatedData) => {
    setProjects(prevProjects => prevProjects.map(project =>
      project.id === selectedProjectId
        ? {
            ...project,
            tasks: project.tasks.map(task =>
              task.id === taskId ? { ...task, ...updatedData } : task
            )
          }
        : project
    ));
    setUpdateData(null);
    toast({
      title: "Task Updated.",
      description: "The task has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [selectedProjectId, toast]);

  const handleProjectSelect = useCallback((projectId) => {
    setSelectedProjectId(projectId);
    const selectedProject = projects.find(project => project.id === projectId);
    setNewProjectName(selectedProject.name);
  }, [projects]);

  const updateProjectName = useCallback((id, newName) => {
    setProjects(prevProjects => 
      prevProjects.map(project => 
        project.id === id ? { ...project, name: newName } : project
      )
    );
    toast({
      title: "Project Updated.",
      description: "The project name has been updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [toast]);

  const handleSortChange = useCallback((e) => {
    const { name, checked } = e.target;
    setSortCriteria(prevState => ({ ...prevState, [name]: checked }));
  }, []);

  const resetSort = useCallback(() => {
    setSortCriteria({ priority: false, title: false, deadline: false, status: false, createdAt: false });
  }, []);

  const selectAllSort = useCallback(() => {
    setSortCriteria({ priority: true, title: true, deadline: true, status: true, createdAt: true });
  }, []);

  const addDefaultTask = useCallback(() => {
    const newTaskId = (projects.find(p => p.id === selectedProjectId)?.tasks.length || 0) + 1;
    const newTask = { id: newTaskId, title: `Default Task ${newTaskId}`, status: false, createdAt: new Date().toLocaleString(), priority: 'low', details: '', deadline: '' };

    setProjects(prevProjects => prevProjects.map(project =>
      project.id === selectedProjectId
        ? { ...project, tasks: [...project.tasks, newTask] }
        : project
    ));
    toast({
      title: "Default Task Added.",
      description: "A new default task has been added.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }, [selectedProjectId, projects, toast]);

  const getSortedTasks = () => {
    const project = projects.find(p => p.id === selectedProjectId);
    if (!project) return [];
    
    let sortedTasks = [...project.tasks];
    
    if (sortCriteria.priority) {
      sortedTasks.sort((a, b) => {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    }

    if (sortCriteria.title) {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortCriteria.deadline) {
      sortedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    }

    if (sortCriteria.status) {
      sortedTasks.sort((a, b) => b.status - a.status); // Completed tasks first
    }

    if (sortCriteria.createdAt) {
      sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Newest to oldest
    }

    return sortedTasks;
  };

  const selectedProject = projects.find(project => project.id === selectedProjectId);
  const selectedProjectName = selectedProject ? selectedProject.name : 'No Project Selected';

  return (
    <ChakraProvider theme={theme}>
      {loading ? (
        <Flex
          height="100vh"
          align="center"
          justify="center"
          direction="column"
          backgroundColor="gray.100"
        >
          <Spinner size="xl" color="teal.500" mb={4} />
          <Text fontSize="2xl" fontWeight="bold" color="teal.600">Now Loading...</Text>
        </Flex>
      ) : (
        <Parallax backgroundImage="https://i.imgur.com/yo7TZq6.jpeg">
          <Flex direction={{ base: "column", md: "row" }} minH="100vh">
            {/* Sidebar */}
            <Box
              width={isSidebarCollapsed ? "50px" : { base: "full", md: "300px" }}
              p={5}
              bg="rgba(255, 255, 255, 0.8)" 
              boxShadow="lg" 
              borderBottomWidth={{ base: "1px", md: "0" }}
              borderBottomColor="gray.300"
              borderRadius="md" 
              transition="width 0.3s"
            >
              <HStack justifyContent="space-between" mb={4}>
                <Heading as="h4" size="md" color="teal.500" display={isSidebarCollapsed ? "none" : "block"}>
                  Projects
                </Heading>
                <IconButton
                  icon={isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  aria-label="Toggle Sidebar"
                />
              </HStack>

              {/* Form to add a new project */}
              {!isSidebarCollapsed && (
                <HStack mb={4} spacing={2}>
                  <Input
                    placeholder="New Project Name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    borderColor="teal.500" 
                  />
                  <IconButton
                    icon={<AddIcon />}
                    colorScheme="teal"
                    onClick={addProject}
                    aria-label="Add Project"
                  />
                  <Button
                    colorScheme="teal"
                    onClick={() => updateProjectName(selectedProjectId, newProjectName)}
                  >
                    Save
                  </Button>
                </HStack>
              )}

              {!isSidebarCollapsed && (
                <VStack align="stretch" spacing={4}>
                  {projects.map(project => (
                    <HStack key={project.id} justifyContent="space-between">
                      <Button
                        flex="1"
                        variant={selectedProjectId === project.id ? "solid" : "outline"}
                        colorScheme="teal"
                        onClick={() => handleProjectSelect(project.id)}
                      >
                        {project.name}
                      </Button>
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => deleteProject(project.id)}
                        aria-label="Delete Project"
                      />
                    </HStack>
                  ))}
                </VStack>
              )}
            </Box>

            {/* Main Content */}
            <Flex direction="column" flex="1">
              <Box p={5} flex="1">
                <TransitionGroup>
                  <CSSTransition
                    in={!loading}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <div>
                      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">
                        {selectedProjectName}
                      </Heading>

                      {/* Button to add a default task */}
                      <HStack mb={4} justifyContent="center">
                        <Button colorScheme="teal" onClick={addDefaultTask}>Add A Task</Button>
                      </HStack>

                      {/* Displaying tasks in a grid */}
                      {getSortedTasks().length === 0 ? (
                        <Text textAlign="center" color="gray.500" mt={4}>No Tasks...</Text>
                      ) : (
                        <Grid templateColumns={{ base: "1fr", md: "repeat(auto-fill, minmax(300px, 1fr))" }} gap={6} mt={4}>
                          <ToDo
                            toDo={getSortedTasks()}
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
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </Box>

              <Box p={4} bg="teal.500" color="white" textAlign="center" borderTopRadius="md">
                <Text fontSize="lg">© 2024 To-Do App</Text>
              </Box>
            </Flex>

            {/* Container for Sorting Menu and Clock */}
            <Flex direction="column" p={4} width="300px" bg="rgba(255, 255, 255, 0.8)" boxShadow="lg">
              {/* Sorting Menu */}
              <SortingMenu
                sortCriteria={sortCriteria}
                handleSortChange={handleSortChange}
                resetSort={resetSort}
                selectAllSort={selectAllSort}
              />
              {/* Clock */}
              <Box mt={4}>
                <Clock />
              </Box>
            </Flex>
          </Flex>
        </Parallax>
      )}
    </ChakraProvider>
  );
}

export default App;
