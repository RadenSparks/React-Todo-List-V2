import React, { useState } from "react";
import ToDoItem from "./ToDoItem";
import { GridItem, SimpleGrid } from "@chakra-ui/react";

const ToDoGrid = ({ toDoList, updateTask, deleteTask, columns, gap }) => {
  return (
    <SimpleGrid columns={columns} gap={gap}>
      {toDoList &&
        toDoList
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((task, index) => (
            <GridItem w="100%" h="10" key={index}>
              <ToDoItem
                task={task}
                toDoList={toDoList}
                updateTask={updateTask}
                deleteTask={deleteTask}
              ></ToDoItem>
            </GridItem>
          ))}
    </SimpleGrid>
  );
};

export default ToDoGrid;
