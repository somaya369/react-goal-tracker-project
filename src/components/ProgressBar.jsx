import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

export default function ProgressBar({ value }) {
  return (
    <Box sx={{ display: "grid", gap: 0.5 }}>
      <LinearProgress variant="determinate" value={value} sx={{ height: 10, borderRadius: 999 }} />
      <Typography variant="caption">{value}%</Typography>
    </Box>
  );
}
