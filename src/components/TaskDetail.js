import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const TaskDetail = ({ name, handleClose, isOpen }) => {
  return (
    <Dialog open={isOpen} fullScreen={true}>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
        <Container sx={{ py: 8 }}>
          <DialogTitle>
              {name}
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
        </Container>
      </Box>
    </Dialog>
  );
};

export default TaskDetail;
