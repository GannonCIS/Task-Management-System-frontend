import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import React from "react";

const TaskDialog = ({
  projects,
  handleAddTask,
  taskInput,
  setTaskInput,
  taskDescriptionInput,
  setTaskDescriptionInput,
  project,
  setProject,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleProjectSelectionChange = (e) => {
    setProject(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleTaskInputChange = (e) => {
    setTaskInput(e.target.value);
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
        <DialogTitle>Create a New Task</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddTask();
              handleClose();
            }}
          >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskDialog;
