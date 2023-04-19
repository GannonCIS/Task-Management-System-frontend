import React, { useState } from "react";
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

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    console.log("I got here");
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
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
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <TextField
            label="New Task"
            variant="outlined"
            size="small"
            fullWidth
            value={taskInput}
            onChange={handleTaskInputChange}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
            }}
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
              <ListItemButton onClick={() => handleOpenDialog()}>
                <TaskDetail
                  isOpen={openDialog}
                  name={task.text}
                  handleClose={handleCloseDialog}
                />
                <ListItemText primary={task.text} sx={{ color: "#333" }} />
              </ListItemButton>
              <IconButton onClick={() => handleDeleteTask(index)}>
                <DeleteIcon sx={{ color: "#333" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
};

export default TodoList;
