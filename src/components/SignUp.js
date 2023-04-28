import React, { useState } from "react";
import {
  Box,
  Container,
  Dialog,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SignUp = ({ isOpen, handleClose }) => {
  const [userName, setUserName] = useState("");
  const [pass, setPassword] = useState("");
  const [name, setName] = useState("");

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const createAccount = async () => {
    console.log("Name: " + name);
    console.log("Username: " + userName);
    console.log("Password: " + pass);
    routeChange("/main");
  };

  return (
    <Dialog open={isOpen} fullWidth={true} maxWidth={"sm"}>
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
        <Container sx={{ py: 8 }}>
          <DialogTitle variant="h4" sx={{ textAlign: "center" }}>
            Sign Up
          </DialogTitle>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              label="Name"
              value={name}
              onChange={handleNameChange}
              sx={{ mt: 3 }}
            />
            <TextField
              label="Username"
              onChange={handleUserNameChange}
              value={userName}
              sx={{ mt: 3 }}
            />
            <TextField
              label="Password"
              value={pass}
              onChange={handlePasswordChange}
              sx={{ mt: 3 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={createAccount}
              sx={{ mt: 3, width: 200, height: 40 }}
            >
              Create Account
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              sx={{ mt: 3, width: 175, height: 35 }}
            >
              Cancel
            </Button>
          </Box>
        </Container>
      </Box>
    </Dialog>
  );
};

export default SignUp;
