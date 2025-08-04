import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container sx={{ mt: 10, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>Welcome to ShareApp</Typography>
      <Typography variant="h6" color="textSecondary" >
        Effortlessly upload, manage, and see trending share prices.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/upload"
          sx={{ mx: 1 }}
        >
          List Shares
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          component={Link}
          to="/myshares"
          sx={{ mx: 1 }}
        >
          View My Shares
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
