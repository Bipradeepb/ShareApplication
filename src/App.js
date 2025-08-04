import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import MyShares from "./pages/MyShares";
import UploadShares from "./pages/UploadShares";
import { Box } from "@mui/material";
// import Upload, MyShares, Profile components similarly

const App = () => {
  return (
    <Router>
      <Box 
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      >
        
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myshares" element={<MyShares />} />
          <Route path="/upload" element={<UploadShares />} />
        </Routes>
        <Footer />
        
      </Box>
      
    </Router>
  );
};

export default App;
