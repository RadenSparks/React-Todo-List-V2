import React from 'react';
import { Box, HStack, Heading, IconButton, VStack, Button, Input } from '@chakra-ui/react';
import { AddIcon, DeleteIcon, ChevronLeftIcon, ChevronRightIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Sidebar = ({ isSidebarCollapsed, toggleSidebar, colorMode, toggleColorMode, projects, selectedProjectId, handleProjectSelect, deleteProject, newProjectName, setNewProjectName, addProject, updateProjectName }) => (
  <Box
    className="sidebar"
    width={{ base: "full", md: isSidebarCollapsed ? "50px" : "300px" }}
    p={5}
    bg="rgba(255, 255, 255, 0.8)" 
    boxShadow="lg" 
    borderBottomWidth={{ base: "1px", md: "0" }}
    borderBottomColor="gray.300"
    borderRadius="md" 
    transition="width 0.3s"
  >
    <HStack justifyContent="space-between" mb={4}>
      <HStack>
        <Heading as="h4" size={{ base: "sm", md: "md" }} color="teal.500" display={isSidebarCollapsed ? "none" : "block"}>
          Projects
        </Heading>
        {!isSidebarCollapsed && (
          <IconButton
            aria-label="Toggle Dark Mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            colorScheme="teal"
          />
        )}
      </HStack>
      <IconButton
        icon={isSidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        onClick={toggleSidebar}
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
          width={{ base: "100%", md: "auto" }}
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
);

export default Sidebar;
