import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useT } from "../i18n/i18n";

export default function EmptyState() {
  const t = useT();
  const nav = useNavigate();
  return (
    <Paper variant="outlined" sx={{ p: 3, textAlign: "center" }}>
      <Typography variant="h6" sx={{ fontWeight: 900 }}>{t("emptyGoalsTitle")}</Typography>
      <Typography sx={{ mt: 1, mb: 2 }}>{t("emptyGoalsDesc")}</Typography>
      <Button variant="contained" onClick={() => nav("/goals/new")}>
        + {t("newGoal")}
      </Button>
    </Paper>
  );
}
