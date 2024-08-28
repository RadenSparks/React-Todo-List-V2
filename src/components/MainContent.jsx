import React from 'react';
import { Heading, HStack, Button, Text, Grid } from '@chakra-ui/react';
import ToDo from './ToDo.jsx';

const MainContent = ({ selectedProjectName, addDefaultTask, getSortedTasks, markDone, deleteTask, setUpdateData, updateTask, updateData, handleUpdateChange, cancelUpdate }) => {
  return (
    <div>
      <Heading as="h2" size="xl" mb={6} textAlign="center" color="teal.500">
        {selectedProjectName}
      </Heading>

      <HStack mb={4} justifyContent="center">
        <Button colorScheme="teal" onClick={addDefaultTask}>Add A Task</Button>
      </HStack>

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
  );
};

export default MainContent;
