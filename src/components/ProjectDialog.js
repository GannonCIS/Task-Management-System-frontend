import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState } from "react";

const ProjectDialogbutton = ({
    projects,
    setProjects,
    }) => { 
        const [open, setOpen] = React.useState(false);
        const [projectInput, setProjectInput] = useState("");
        const [descriptionInput, setDescriptionInput] = useState("");
        const [openDialog, setOpenDialog] = useState(false);

        const handleClickOpen = () => {
            setOpen(true);
        };
        

        const handleProjectInputChange = (e) => {
            setProjectInput(e.target.value);
        };

        const handleAddProject = () => {
            if (projectInput.trim() !== "") {
              setProjects([...projects, { name: projectInput, description: descriptionInput, completed: false }]);
              setProjectInput("");
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
                Add a New Project
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle><h3><center>Create a New Project</center></h3></DialogTitle>
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
                    id="descri[tion"
                    label="Project Description"
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
                    handleAddProject();
                    handleClose();
                    }}>Add Project
                    </Button>
                </DialogActions>
              </Dialog>
            </div>
    );
};
        
export default ProjectDialogbutton;
        
        

        
    
    
    
 
