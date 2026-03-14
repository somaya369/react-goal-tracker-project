import React from "react";
import { Chip } from "@mui/material";
export default function CategoryBadge({ label }) {
  return <Chip size="small" label={label} variant="outlined" />;
}
