import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function StatCard({ label, value, sub }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>{label}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 900, mt: 0.5 }}>{value}</Typography>
        {sub && <Typography variant="caption" sx={{ opacity: 0.7 }}>{sub}</Typography>}
      </CardContent>
    </Card>
  );
}
