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
import Dialog from "./Dialog.js"
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  //my part
  const [open, setOpen] = React.useState(false);
  //
  const [dialogData, setDialogData] = useState({
    task: {
      name: "",
      description: "",
      completed: false,
    },
    index: -1,
  });
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  // my part
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // 

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { name: taskInput, description: descriptionInput, completed: false }]);
      setTaskInput("");
      setDescriptionInput("");
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
      
      
      <Dialog />
      
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
                      name: task.name,
                      description: task.description,
                      completed: task.completed,
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
          handleDeleteTask={handleDeleteTask}
        />
      </Container>
    </Box>
  );
};

export default TodoList;
