import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Checkbox,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const ProjectDetails = ({
  isOpen,
  dialogProjectData,
  handleClose,
  handleProjectCompletion,
  handleDeleteProject,
  handleUpdateProjects,
  setProjectDialogData,
}) => {
  const handleProjectTitleInputChange = (e) => {
    setProjectDialogData({
      ...dialogProjectData,
      project: {
        ...dialogProjectData.project,
        name: e.target.value,
      },
    });
  };



  const handleProjectDescriptionInputChange = (e) => {
    setProjectDialogData({
      ...dialogProjectData,
      project: {
        ...dialogProjectData.project,
        description: e.target.value,
      },
    });
  };

  return (
    <Dialog open={isOpen} fullScreen={true}>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
        <Container sx={{ py: 8 }}>
          <DialogTitle
            variant="h4"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <TextField
              value={dialogProjectData.project.name}
              variant="standard"
              size="normal"
              onChange={handleProjectTitleInputChange}
              InputProps={{
                style: { fontSize: 40 },
              }}
            />
            <span>
              <IconButton
                onClick={() => {
                  handleProjectCompletion(dialogProjectData.index);
                  handleClose();
                }}
              >
                <Checkbox checked={dialogProjectData.project.completed} disableRipple />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDeleteProject(dialogProjectData.index);
                  handleClose();
                }}
              >
                <DeleteIcon sx={{ color: "#333" }} />
              </IconButton>
              <IconButton onClick={handleClose}>
                <CloseIcon sx={{ color: "#333" }} />
              </IconButton>
            </span>
          </DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <TextField
              value={dialogProjectData.project.description}
              fullWidth
              onChange={handleProjectDescriptionInputChange}
              multiline
              rows={20}
              size="small"
              sx={{ pb: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ ml: 2 }}
              onClick={() => {
                console.log(dialogProjectData)
                handleUpdateProjects(dialogProjectData.index, {
                  name: dialogProjectData.project.name,
                  description: dialogProjectData.project.description,
                  completed: dialogProjectData.project.completed,
                });
                handleClose();
              }}
            >
              Update
            </Button>
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
};

export default ProjectDetails;
