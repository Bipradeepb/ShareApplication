import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const UploadShares = () => {
  const [form, setForm] = useState({
    symbol: "",
    companyName: "",
    quantity: "",
    purchasePrice: "",
    currentPrice: ""
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      quantity: parseInt(form.quantity),
      purchasePrice: parseFloat(form.purchasePrice),
      currentPrice: parseFloat(form.currentPrice)
    };

    try {
      const res = await fetch("/api/v1/portfolio", { //mock api---> will be integrated with actual api
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to upload share");

      setStatus({ success: true, message: "Share uploaded successfully!" });
      setForm({
        symbol: "",
        companyName: "",
        quantity: "",
        purchasePrice: "",
        currentPrice: ""
      });
    } catch (err) {
      setStatus({ success: false, message: err.message });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, p:2}}>
      <Typography variant="h4" gutterBottom>
        Upload New Share
      </Typography>

      {status.message && (
        <Alert severity={status.success ? "success" : "error"} sx={{ mb: 2 }}>
          {status.message}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        <TextField
          fullWidth
          margin="normal"
          name="symbol"
          label="Stock Symbol"
          value={form.symbol}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="companyName"
          label="Company Name"
          value={form.companyName}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="quantity"
          label="Quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="purchasePrice"
          label="Purchase Price (₹)"
          type="number"
          value={form.purchasePrice}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="currentPrice"
          label="Current Price (₹)"
          type="number"
          value={form.currentPrice}
          onChange={handleChange}
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 3 }}
          fullWidth
        >
          Upload Share
        </Button>
      </Box>
    </Container>
  );
};

export default UploadShares;
