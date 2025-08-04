import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box 
      sx={{ 
        py: 3,
        px: 2,
        backgroundColor: "#f5f5f5", 
        textAlign: "center",
        mt: "auto"
      }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} ShareApp | Made by Bipradeep Bera
      </Typography>
    </Box>
  );
};

export default Footer;
