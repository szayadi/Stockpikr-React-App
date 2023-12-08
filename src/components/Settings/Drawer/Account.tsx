import React from 'react';
import { Box, Typography, Avatar } from "@mui/material";
import "./Drawer.css";

export const Account: React.FC = () => {
  return (
  <div>
    <h1>Account</h1>
      <Box mb="25px">
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Avatar sx={{ bgcolor: "f4f", width: 100, height: 100 }}>JD</Avatar>
      </Box>

      <Box textAlign="center">
        <Typography
          variant="h2"
          fontWeight="bold"
          color={"#000"}
          sx={{ m: "10px 0 0 0" }}
        >
          John Doe
        </Typography>
      </Box>
    </Box>
    
  </div>
)};
