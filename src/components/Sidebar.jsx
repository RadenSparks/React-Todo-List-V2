import React from 'react';
import { Box, HStack, Heading, Input, IconButton, Button, VStack, } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'; // Add this import
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed, projects, selectedProjectId, setNewProjectName, newProjectName, addProject, updateProjectName, deleteProject, handleProjectSelect }) => {
  return (
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

      {!isSidebarCollapsed && (
        <>
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
        </>
      )}
    </Box>
  );
};

export default Sidebar;
