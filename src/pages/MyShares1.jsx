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
} from "@mui/material";

const MyShares = () => {
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/mockShares.json") // Will replace later
      .then((res) => res.json())
      .then((data) => {
        setShares(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching shares:", err);
        setLoading(false);
      });
  }, []);

  const calculateGainLoss = (share) => {
    const diff = (share.currentPrice - share.purchasePrice) * share.quantity;
    return {
      value: diff.toFixed(2),
      positive: diff >= 0,
    };
  };

  if (loading) {
    return (
      <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 8, p:2 }}>
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
                <Card sx={{ minHeight: 220 }}>
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
                    <Box sx={{ mt: 2 }}>
                      <Chip
                        label={
                          positive
                            ? `+₹${value} (Profit)`
                            : `₹${value} (Loss)`
                        }
                        color={positive ? "success" : "error"}
                        variant="outlined"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default MyShares;
