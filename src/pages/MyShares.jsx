import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const MyShares = () => {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingShare, setEditingShare] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    quantity: "",
    purchasePrice: "",
    currentPrice: ""
  });

  const fetchShares = () => {
    setLoading(true);
    fetch("/mockShares.json")
      .then((res) => res.json())
      .then((data) => {
        setShares(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shares:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShares();
  }, []);

  const calculateGainLoss = (share) => {
    const diff = (share.currentPrice - share.purchasePrice) * share.quantity;
    return {
      value: diff.toFixed(2),
      positive: diff >= 0,
    };
  };

  const handleDelete = async (symbol) => {
    const res = await fetch(`/api/v1/portfolio/${symbol}`, {
      method: "DELETE"
    });

    if (res.ok) {
      fetchShares();
    } else {
      alert("Failed to delete share.");
    }
  };

  const openEditDialog = (share) => {
    setEditingShare(share);
    setUpdatedData({
      quantity: share.quantity,
      purchasePrice: share.purchasePrice,
      currentPrice: share.currentPrice
    });
  };

  const handleUpdate = async () => {
    const res = await fetch(`/api/v1/portfolio/${editingShare.symbol}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...editingShare,
        quantity: parseInt(updatedData.quantity),
        purchasePrice: parseFloat(updatedData.purchasePrice),
        currentPrice: parseFloat(updatedData.currentPrice)
      })
    });

    if (res.ok) {
      setEditingShare(null);
      fetchShares();
    } else {
      alert("Failed to update share.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        My Stock Portfolio
      </Typography>

      {shares.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          You don't have any shares yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {shares.map((share) => {
            const { value, positive } = calculateGainLoss(share);
            return (
              <Grid item xs={12} sm={6} md={4} key={share.symbol}>
                <Card sx={{ minHeight: 250 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {share.companyName} ({share.symbol})
                    </Typography>
                    <Typography variant="body2">
                      Quantity: <strong>{share.quantity}</strong>
                    </Typography>
                    <Typography variant="body2">
                      Buy Price: ₹{share.purchasePrice.toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                      Current Price: ₹{share.currentPrice.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      <Chip
                        label={
                          positive
                            ? `+₹${value} (Profit)`
                            : `₹${value} (Loss)`
                        }
                        color={positive ? "success" : "error"}
                      />
                    </Box>

                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => openEditDialog(share)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(share.symbol)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingShare} onClose={() => setEditingShare(null)}>
        <DialogTitle>Edit Share</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Quantity"
            fullWidth
            type="number"
            value={updatedData.quantity}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, quantity: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Purchase Price"
            fullWidth
            type="number"
            value={updatedData.purchasePrice}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, purchasePrice: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Current Price"
            fullWidth
            type="number"
            value={updatedData.currentPrice}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, currentPrice: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingShare(null)}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyShares;
