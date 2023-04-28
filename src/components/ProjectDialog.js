import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import React from "react";

const ProjectDialog = ({
  projects,
  setProjects,
  handleAddProject,
  projectInput,
  setProjectInput,
  projectDescriptionInput,
  setProjectDescriptionInput,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleProjectInputChange = (e) => {
    setProjectInput(e.target.value);
  };

  const handleProjectDescriptionInputChange = (e) => {
    setProjectDescriptionInput(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a New Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <h3>
            <center>Create a New Project</center>
          </h3>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in new Project name and give a description on it.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Project name"
            type="Text"
            fullWidth
            variant="standard"
            onChange={handleProjectInputChange}
            value={projectInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Project Description"
            type="Text"
            fullWidth
            variant="standard"
            value={projectDescriptionInput}
            onChange={handleProjectDescriptionInputChange}
          />
          <FormControl fullWidth></FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleAddProject();
              handleClose();
            }}
          >
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectDialog;
