import React, { useState, useEffect } from "react";
import TaskDetail from "./TaskDetail";
import {
  Box,
  Container,
  Typography,
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import ProjectDetail from "./ProjectDetail";
import ProjectDialog from "./ProjectDialog";
import TaskDialog from "./TaskDialog";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectInput, setProjectInput] = useState("");
  const [taskDescriptionInput, setTaskDescriptionInput] = useState("");
  const [projectDescriptionInput, setProjectDescriptionInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    task: {
      _id: -1,
      name: "",
      description: "",
      completed: false,
      __v: 0,
      projectId: "",
    },
    index: -1,
  });

  const [dialogProjectData, setProjectDialogData] = useState({
    project: {
      name: "",
      description: "",
      completed: false,
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

  const handleOpenProjectDialog = () => {
    setOpenProjectDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseProjectDialog = () => {
    setOpenProjectDialog(false);
  };

  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleDescriptionInputChange = (e) => {
    setTaskDescriptionInput(e.target.value);
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
    if (taskInput.trim() !== "") {
      try {
        const taskPost = {
          name: taskInput,
          description: taskDescriptionInput,
          completed: false,
          project: "None",
        };
        await api.post("/api/tasks", taskPost);
        fetchTasks();
        setTaskInput("");
        setTaskDescriptionInput("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    await api.put(`/api/tasks/${updatedTask._id}`, updatedTask);
    fetchTasks();
  };

  const handleUpdateProjects = (index, updatedProjects) => {
    updatedProjects = [...projects];
    updatedProjects[index] = updatedProjects;
    setProjects(updatedProjects);
  };

  const handleDeleteTask = async (id) => {
    await api.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const handleDeleteProject = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleAddProject = () => {
    if (projectInput.trim() !== "") {
      const newProject = {
        id: projects.length + 1,
        name: projectInput,
        description: projectDescriptionInput,
      };
      setProjects([...projects, newProject]);
      setProjectInput("");
      setProjectDescriptionInput("");
    }
  };

  const [alignment, setAlignment] = useState("tasks"); // add alignment state

  const [projectID, setProjectID] = React.useState("");

  const handleAddTaskToProject = async () => {
    if (taskInput.trim() && projectID !== "") {
      const newTask = {
        name: taskInput,
        description: taskDescriptionInput,
        completed: false,
        project: projectID, // assign the selected project id to the new task
      };
      await api.post("/api/tasks", newTask);
      fetchTasks();
      setTaskInput("");
      setTaskDescriptionInput("");
    }
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
            alignItems: "center",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <TaskDialog
            tasks={tasks}
            projectID={projectID}
            setProjectID={setProjectID}
            projects={projects}
            setTasks={setTasks}
            taskInput={taskInput}
            taskDescriptionInput={taskDescriptionInput}
            setTaskInput={setTaskInput}
            setTaskDescriptionInput={setTaskDescriptionInput}
            handleAddTask={handleAddTask}
            handleAddTaskToProject={handleAddTaskToProject}
          />

          <ProjectDialog
            projects={projects}
            projectInput={projectInput}
            projectDescriptionInput={projectDescriptionInput}
            setProjectInput={setProjectInput}
            setProjectDescriptionInput={setProjectDescriptionInput}
            handleAddProject={handleAddProject}
            setProjects={setProjects}
          />

          <ToggleButtonGroup
            value={alignment}
            exclusive
            aria-label="Menu"
            style={{ margin: "0 auto" }}
            onChange={(event, newAlignment) => {
              setAlignment(newAlignment);
            }}
          >
            <ToggleButton value="tasks">Tasks</ToggleButton>
            <ToggleButton value="projects">Projects</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <List sx={{ mt: 4 }}>
          {alignment === "tasks" &&
            tasks.map((task, index) => (
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
                      project: task.project,
                      __v: task.__v,
                    });
                    handleOpenDialog();
                  }}
                >
                  <ListItemText primary={task.name} sx={{ color: "#333" }} />
                  <ListItemText
                    primary={`Project: ${task.project}`}
                    sx={{ textAlign: "right" }}
                  />
                </ListItemButton>
                <IconButton onClick={() => handleDeleteTask(task._id)}>
                  <DeleteIcon sx={{ color: "#333" }} />
                </IconButton>
              </ListItem>
            ))}
        </List>

        <List sx={{ mt: 4 }}>
          {alignment === "projects" &&
            projects.map((project, index) => (
              <ListItem key={index} disablePadding sx={{ fontSize: "1.5rem" }}>
                <ListItemIcon onClick={() => handleProjectCompletion(index)}>
                  <Checkbox
                    edge="start"
                    checked={project.completed}
                    tabIndex={-1}
                    disableRipple
                  />
                </ListItemIcon>

                <ListItemButton
                  onClick={() => {
                    setProjectDialogData({
                      project: {
                        name: project.name,
                        description: project.description,
                        completed: project.completed,
                      },
                      index: index,
                    });
                    handleOpenProjectDialog();
                  }}
                >
                  <TreeView
                    aria-label="project-navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{ overflowX: "hidden" }}
                  >
                    <TreeItem nodeId={project.name} label={`${project.name}`}>
                      {tasks.map((task, index) => {
                        if (task.project === project.name) {
                          return (
                            <TreeItem
                              nodeId={task._id.toString()}
                              label={task.name}
                              sx={{ fontSize: "1.5rem" }}
                              key={index} // Add a unique key prop for each rendered item
                            />
                          );
                        }
                        return null;
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

        <ProjectDetail
          isOpen={openProjectDialog}
          dialogProjectData={dialogProjectData}
          handleClose={handleCloseProjectDialog}
          handleProjectCompletion={handleProjectCompletion}
          handleUpdateProjects={handleUpdateProjects}
          handleDeleteProject={handleDeleteProject}
          setProjectDialogData={setProjectDialogData}
        />
      </Container>
    </Box>
  );
};

export default TodoList;
