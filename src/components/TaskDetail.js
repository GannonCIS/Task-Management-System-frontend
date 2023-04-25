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

const TaskDetail = ({
  isOpen,
  dialogData,
  handleClose,
  handleTaskCompletion,
  handleDeleteTask,
  handleUpdateTask,
  setDialogData,
}) => {
  const handleTitleInputChange = (e) => {
    setDialogData({
      ...dialogData,
      task: {
        ...dialogData.task,
        name: e.target.value,
      },
    });
  };

  const handleDescriptionInputChange = (e) => {
    setDialogData({
      ...dialogData,
      task: {
        ...dialogData.task,
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
              value={dialogData.task.name}
              variant="standard"
              size="normal"
              onChange={handleTitleInputChange}
              InputProps={{
                style: { fontSize: 40 },
              }}
            />
            <span>
              <IconButton
                onClick={() => {
                  handleTaskCompletion(dialogData.index);
                  handleClose();
                }}
              >
                <Checkbox checked={dialogData.task.completed} disableRipple />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleDeleteTask(dialogData.index);
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
              value={dialogData.task.description}
              fullWidth
              onChange={handleDescriptionInputChange}
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
                console.log(dialogData.task)
                handleUpdateTask(dialogData.index, {
                  name: dialogData.task.name,
                  description: dialogData.task.description,
                  completed: dialogData.task.completed,
                  id: dialogData.task.id,
                  projectId: dialogData.task.projectId
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

export default TaskDetail;
