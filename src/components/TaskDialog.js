
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import React, { useState } from "react";




const TaskDialog = ({
    projects,
    handleAddTask,
    handleAddTaskToProject,
    taskInput,
    setTaskInput,
    taskDescriptionInput,
    setTaskDescriptionInput,
    projectID, 
    setProjectID
    }) => { 
  
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setProjectID(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = () => {
    if(projectID === ""){
        handleAddTask();
    } else {
        handleAddTaskToProject();
    }
  };

  const handleDescriptionInputChange = (e) => {
    setTaskDescriptionInput(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a New Task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle><h3><center>Create a New Task</center></h3></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in new task name and give a description on it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Task name"
            type="Text"
            fullWidth
            variant="standard"
            onChange={handleTaskInputChange}
            value={taskInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Task Description"
            type="Text"
            fullWidth
            variant="standard"
            value={taskDescriptionInput}
            onChange={handleDescriptionInputChange}
          />
           <FormControl fullWidth>
          <InputLabel sx={{mt: 1}}id="project-select-label">Choose to assign to Project or None to not</InputLabel>
              <Select
                labelId="project-select-label"
                id="project-select"
                value={projectID}  //is actually the name of the project
                label={projects.name}
                onChange={handleChange}
                sx={{ marginTop: 2, marginBottom: 1 }}
              >

                <MenuItem value={null}>None</MenuItem>

                {projects.map((project) => (
                  <MenuItem key={project.name} value={project.name}>
                    {project.name}</MenuItem>
                ))}
              </Select>
              </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            addTask();
            handleClose();
            }}>Add Task
            </Button>
        
        </DialogActions>
      </Dialog>
    </div>
    

  );
};

export default TaskDialog;

