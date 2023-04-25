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
import FormDialog from "./TaskDialog.js";
import ProjectDialogbutton from "./ProjectDialog.js";

import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const[projects,setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [projectInput, setProjectInput] = useState("");
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

  //
  const handleProjectInputChange = (e) => {
    setProjectInput(e.target.value);
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
  //
  const handleAddProject = () => {
    if (taskInput.trim() !== "") {
      setProjects([...projects, { name: projectInput, description: descriptionInput, completed: false }]);
      setProjectInput("");
      setDescriptionInput("");
    }
  };
  

  const handleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };
  //
  const handleProjectCompletion = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].completed = !updatedProjects[index].completed;
    setProjects(updatedProjects);
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };
  //
  // const handleUpdateProjects = (index, updatedProjects) => {
  //   const updatedProjects = [...projects];
  //   updatedProjects[index] = updatedProjects;
  //   setProjects(updatedProjects);
  // };
  


  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };
  //
  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 4 }}>
          Todo List
        </Typography>
        <center><FormDialog 
          tasks={tasks}
          setTasks={setTasks} /></center>
        <br></br>
        <center><ProjectDialogbutton
          projects={projects}
          setProjects={setProjects} /></center>

        
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
        
        <List sx={{ mt: 4 }}>
          {projects.map((task, index) => (
            <ListItem key={index} disablePadding sx={{ fontSize: "1.5rem" }}>
              <ListItemIcon onClick={() => handleProjectCompletion(index)}>
                <Checkbox
                  edge="start"
                  checked={projects.completed}
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
              <IconButton onClick={() => handleDeleteProject(index)}>
                <DeleteIcon sx={{ color: "#333" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>


        {/* <List sx={{ mt: 4 }}>
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
        </List> */}


        <TaskDetail
          isOpen={openDialog}
          dialogData={dialogData}
          handleClose={handleCloseDialog}
          handleTaskCompletion={handleTaskCompletion}
          handleUpdateTask = {handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
          setDialogData={setDialogData}
        />
      </Container>
    </Box>
  );
};

export default TodoList;
