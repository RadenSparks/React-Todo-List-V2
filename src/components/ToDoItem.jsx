import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Text,
  Input,
  Button,
  Textarea,
  Flex,
  IconButton,
  Stack,
  Card,
  CardHeader,
  Heading,
  CardBody,
  StackDivider,
  Grid,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import PriorityColors from "./PriorityColor";
import TodoActionButton from "./TodoActionButton";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faClose } from "@fortawesome/free-solid-svg-icons/faClose";

const ToDoItem = ({ task, updateTask, deleteTask, toDoList }) => {
  const [edit, setEdit] = useState(false);
  const [editTask, setEditTask] = useState(task);
  const createdAt = new Date(task.createdAt).toLocaleString();

  const confirm = () => {
    updateTask(editTask);
    setEdit(false);
  };

  const cancel = () => {
    setEditTask(task);
    setEdit(false);
  };

  const onChangeTitle = (e) => {
    setEditTask((prev) => ({ ...prev, title: e.target.value }));
  };

  const onChangeDescription = (e) => {
    setEditTask((prev) => ({ ...prev, details: e.target.value }));
  };

  return (
    <Card
      sx={{
        border: "1px solid",
      }}
    >
      <CardHeader>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Heading size="md">#{editTask.id}</Heading>
          </Box>
          <Box>
            {!edit ? (
              <TodoActionButton
                colorScheme={"yellow"}
                icon={faPen}
                variant={"outline"}
                label={"Edit task"}
                onClick={() => setEdit(true)}
              />
            ) : (
              <>
                <TodoActionButton
                  colorScheme={"green"}
                  icon={faCheck}
                  variant={"outline"}
                  label={"Confirm editing"}
                  onClick={confirm}
                />
                <TodoActionButton
                  colorScheme={"red"}
                  icon={faClose}
                  variant={"outline"}
                  label={"Cancel editing"}
                  onClick={cancel}
                />
              </>
            )}
            {!edit && (
              <>
                <TodoActionButton
                  colorScheme={"green"}
                  icon={faCircleCheck}
                  variant={"outline"}
                  label={"Marks as Done"}
                />
                <TodoActionButton
                  colorScheme={"red"}
                  icon={faTrashCan}
                  variant={"outline"}
                  label={"Delete this task"}
                  onClick={() => deleteTask(editTask.id)}
                />
              </>
            )}
          </Box>
        </Box>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Title
            </Heading>
            {!edit ? (
              <Text pt="2" fontSize="sm">
                {editTask.title}
              </Text>
            ) : (
              <Textarea
                value={editTask.title}
                onChange={onChangeTitle}
              ></Textarea>
            )}
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Description
            </Heading>
            {!edit ? (
              <Text pt="2" fontSize="sm">
                {editTask.details}
              </Text>
            ) : (
              <Textarea
                value={editTask.details}
                onChange={onChangeDescription}
              ></Textarea>
            )}
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ToDoItem;
