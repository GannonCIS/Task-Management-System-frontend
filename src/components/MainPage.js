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
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { Fullscreen } from "@mui/icons-material";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// ------------------- Selection with correct ID - PART -----------------
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    task: {
      _id: -1,
      name: "",
      description: "",
      completed: false,
      __v: 0,
      projectId: ""
    },
    index: -1,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const getResponse = await api.get("/api/tasks");
      setTasks(getResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  const handleProjectInputChange = (e) => {
    setProjectInput(e.target.value);
  };

  const handleProjectCompletion = (index) => {
    const updatedProjects = [...projects];
    updatedProjects[index].completed = !updatedProjects[index].completed;
    setTasks(updatedProjects);
  };
  
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskInput.trim() !== "") {
      try {
        const taskPost = {
          name: taskInput,
          description: descriptionInput,
          completed: false,
          projectId: "None",
        };
        await api.post("/api/tasks", taskPost);
        fetchTasks();
        setTaskInput("");
        setDescriptionInput("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    await api.put(`/api/tasks/${updatedTask._id}`, updatedTask);
    fetchTasks();
  };

  

   const handleDeleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  }

  const handleAddProject = () => {
    if (projectInput.trim() !== "") {
      const newProject = {
        id: projects.length + 1,
        name: projectInput,
      };
      setProjects([...projects, newProject]);
      setProjectInput("");
      setDescriptionInput("");
    }
  };


  const [alignment, setAlignment] = useState("tasks"); // add alignment state

  // ------------------- Selection with correct ID - PART -----------------

  const [ID, setID] = React.useState('');

  const handleChange = (event) => {
    setID(event.target.value);
  };


  const handleAddTaskToProject = () => {
    if (taskInput.trim() && ID !== "") {
      const newTask = {
        id: tasks.length + 1,
        name: taskInput,
        description: descriptionInput,
        completed: false,
        projectId: ID // assign the selected project id to the new task
      };
      setTasks((prevTasks) => [...prevTasks, newTask]); // use functional update for tasks state
      setTaskInput("");
      setDescriptionInput("");
      setTasksByProjects((prevTasksByProjects) =>
        prevTasksByProjects.map(project => {
          if (project[0] === ID) {
            return [...project, newTask.id]
          }
          return project;
        })
      ); // use functional update for tasksByProjects state
    }

  };
  

  const [tasksByProjects, setTasksByProjects] = React.useState(
    projects.map(project => [project.id])
  );




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
            label="New Project Name"
            onChange={handleProjectInputChange}
            fullWidth
            value={projectInput}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2, marginTop: 1, marginBottom: 1 }}
            onClick={handleAddProject}
          >
            Add Project
          </Button>

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
            sx={{ ml: 2, marginTop: 1, marginBottom: 1 }}
            onClick={handleAddTask}
          >
            Add
          </Button>


          <FormControl fullWidth>
            <InputLabel id="project-select-label">Choose to assign to Project</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={ID}  //is actually the name of the project
              label={projects.name}
              onChange={handleChange}
              sx={{ marginTop: 1, marginBottom: 1 }}
            >

              <MenuItem value={null}>None</MenuItem>

              {projects.map((project) => (
                <MenuItem key={project.name} value={project.name}>
                  {project.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            sx={{ ml: 2, marginTop: 1, marginBottom: 4 }}
            onClick={handleAddTaskToProject}
          >
            Add Task to Project
          </Button>


          <ToggleButtonGroup
            value={alignment}
            exclusive
            aria-label="Menu"
            style={{ margin: '0 auto' }}
            onChange={(event, newAlignment) => {
              setAlignment(newAlignment);
            }}
          >
            <ToggleButton value="tasks">Tasks</ToggleButton>
            <ToggleButton value="projects">Projects</ToggleButton>
          </ToggleButtonGroup>

        </Box>

        <List sx={{ mt: 4 }}>
          {alignment === "tasks" && tasks.map((task, index) => (
            <ListItem key={index} disablePadding sx={{ fontSize: "1.5rem" }}>
              <ListItemIcon
                onClick={() =>
                  handleUpdateTask({
                    ...task,
                    completed: !task.completed,
                  })
                }
              >
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
                    _id: task._id,
                    name: task.name,
                    description: task.description,
                    completed: task.completed,
                      
                      projectId: task.projectId,
                    __v: task.__v,
                  });
                  handleOpenDialog();
                }}
              >
                <ListItemText primary={task.name} sx={{ color: "#333" }} />
                <ListItemText primary={`TaskID: ${task.id}`} />
                <ListItemText primary={`Project: ${task.projectId}`} />
              </ListItemButton>
              <IconButton onClick={() => handleDeleteTask(task._id)}>
                <DeleteIcon sx={{ color: "#333" }} />
              </IconButton>

            </ListItem>
          ))}
        </List>

        <List sx={{ mt: 4 }}>
          {alignment === "projects" && projects.map((project, index) => (
            <ListItem key={index} disablePadding sx={{ fontSize: "1.5rem" }}>
              <ListItemIcon onClick={() => handleProjectCompletion(index)}>
                <Checkbox
                  edge="start"
                  checked={project.completed}
                  tabIndex={-1}
                  disableRipple
                />
              </ListItemIcon>

              <ListItemButton>

                <TreeView
                  aria-label="project-navigator"
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  sx={{ overflowX: "hidden" }}
                >

                  
                  <TreeItem nodeId={project.name} label={`${project.name} - ProjectID:${project.id}`}>

                    {tasks.map((task, index) => {
                        if (task.projectId === project.name) {
                          return (
                            <TreeItem
                              nodeId={task.id.toString()}
                              label={task.name}
                              sx={{ fontSize: "1.5rem" }}
                              key={index} // Add a unique key prop for each rendered item
                            />
                          );
                        }
                        return null; // or any other fallback value, depending on your use case
                      })}
                  </TreeItem>

                </TreeView>

              </ListItemButton>


              <IconButton onClick={() => handleDeleteProject(index)}>
                <DeleteIcon sx={{ color: "#333" }} />
              </IconButton>

            </ListItem>
          ))}
        </List>




        <TaskDetail
          isOpen={openDialog}
          dialogData={dialogData}
          handleClose={handleCloseDialog}
          handleUpdateTask={handleUpdateTask}
          handleDeleteTask={handleDeleteTask}
          setDialogData={setDialogData}
        />


      </Container>
    </Box >
  );
};

export default TodoList;
