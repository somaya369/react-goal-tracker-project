import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useT } from "../i18n/i18n";

export default function NotFound() {
  const t = useT();
  const nav = useNavigate();
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("notFound")}</Typography>
      <Button variant="contained" onClick={() => nav("/dashboard")}>{t("goHome")}</Button>
    </Box>
  );
}
