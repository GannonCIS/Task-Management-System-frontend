import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";

import { Box, Container, Typography, TextField, Button } from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [pass, setPassword] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async () => {
    //backend to be implemented
    console.log("Username: " + userName);
    console.log("Password: " + pass);
    routeChange("/main");
  };

  return (
    <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", color: "#333" }}>
      <Container sx={{ py: 8 }}>
        <Typography variant="h2" sx={{ mb: 4, textAlign: "center" }}>
          Login
        </Typography>
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
            onClick={login}
            sx={{ mt: 3, width: 200, height: 40 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenDialog}
            sx={{ mt: 3, width: 175, height: 35 }}
          >
            Create Account
          </Button>
        </Box>
        <SignUp isOpen={openDialog} handleClose={handleCloseDialog} />
      </Container>
    </Box>
  );
};

export default Login;
