import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
  Checkbox,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

const TaskDetail = ({
  isOpen,
  dialogData,
  handleClose,
  handleTaskCompletion,
  handleDeleteTask,
}) => {
  return (
    <Dialog open={isOpen} fullScreen={true}>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
        <Container sx={{ py: 8 }}>
          <DialogTitle
            variant="h4"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {dialogData.task.name}
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
          <Typography variant="body1">
            {dialogData.task.description}
          </Typography>
        </Container>
      </Box>
    </Dialog>
  );
};

export default TaskDetail;
