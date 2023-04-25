
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from "react";




const FormDialog = ({
    tasks,
    setTasks,
    }) => { 
  
  const [open, setOpen] = React.useState(false);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { name: taskInput, description: descriptionInput, completed: false }]);
      setTaskInput("");
      setDescriptionInput("");
    }
  };

  const handleDescriptionInputChange = (e) => {
    setDescriptionInput(e.target.value);
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
            id="descri[tion"
            label="Task Description"
            type="Text"
            fullWidth
            variant="standard"
            value={descriptionInput}
            onChange={handleDescriptionInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {
            handleAddTask();
            handleClose();
            }}>Add Task
            </Button>
        </DialogActions>
      </Dialog>
    </div>
    

  );
};

export default FormDialog;

