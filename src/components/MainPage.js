import React, { useState, useEffect } from "react";
import TaskDetail from "./TaskDetail";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/api";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    task: {
      _id: -1,
      name: "",
      description: "",
      completed: false,
      __v: 0,
    },
    index: -1,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const getResponse = await api.get("/api/tasks")
        setTasks(getResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      try {
        const taskPost = {
          name: taskInput,
          description: descriptionInput,
          completed: false,
        };
        await api.post("/api/tasks", taskPost);
        const getResponse = await api.get("/api/tasks")
        setTasks(getResponse.data);
        setTaskInput("");
        setDescriptionInput("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Todo List
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            flexDirection: "column",
          }}
        >
          <TextField
            label="New Task Name"
            size="small"
            onChange={handleTaskInputChange}
            fullWidth
            value={taskInput}
          />
          <TextField
            label="New Task Description"
            value={descriptionInput}
            onChange={handleDescriptionInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
            onClick={handleAddTask}
          >
            Add
          </Button>
        </Box>
        <List sx={{ mt: 4 }}>
          {tasks.map((task, index) => (
            <ListItem key={index} disablePadding sx={{ fontSize: "1.5rem" }}>
              <ListItemIcon onClick={() => handleTaskCompletion(index)}>
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>
              <ListItemButton
                onClick={() => {
                  setDialogData({
                    task: {
                      _id: task._id,
                      name: task.name,
                      description: task.description,
                      completed: task.completed,
                      __v: task.__v,
                    },
                    index: index,
                  });
                  handleOpenDialog();
                }}
              >
                <ListItemText primary={task.name} sx={{ color: "#333" }} />
              </ListItemButton>
              <IconButton onClick={() => handleDeleteTask(index)}>
                <DeleteIcon sx={{ color: "#333" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <TaskDetail
          isOpen={openDialog}
          dialogData={dialogData}
          handleClose={handleCloseDialog}
          handleTaskCompletion={handleTaskCompletion}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
          setDialogData={setDialogData}
        />
      </Container>
    </Box>
  );
};

export default TodoList;
