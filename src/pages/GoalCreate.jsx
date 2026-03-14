import React from "react";
import { Box, Typography, TextField, MenuItem, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGoalsStore } from "../features/goals/goalsHooks";
import { useT } from "../i18n/i18n";
import { CATEGORIES } from "../features/goals/goalTypes";

export default function GoalCreate() {
  const t = useT();
  const nav = useNavigate();
  const store = useGoalsStore();

  const [form, setForm] = React.useState({
    title: "",
    category: CATEGORIES[0],
    type: "daily",
    target: 30,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    notes: "",
  });

  const [errors, setErrors] = React.useState({});

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = "Required";
    if (!form.category) e.category = "Required";
    const target = Number(form.target);
    if (!Number.isFinite(target) || target <= 0) e.target = "Must be > 0";
    if (!form.startDate) e.startDate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("newGoal")}</Typography>

      <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 2, maxWidth: 720 }}>
        <TextField label={t("title")} value={form.title} onChange={(e) => set("title", e.target.value)} error={Boolean(errors.title)} helperText={errors.title || " "} />

        <TextField label={t("category")} value={form.category} onChange={(e) => set("category", e.target.value)} select>
          {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>

        <TextField label={t("goalType")} value={form.type} onChange={(e) => set("type", e.target.value)} select>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="count">Count</MenuItem>
          <MenuItem value="time">Time</MenuItem>
        </TextField>

        <TextField label={t("target")} type="number" value={form.target} onChange={(e) => set("target", e.target.value)} error={Boolean(errors.target)} helperText={errors.target || " "} />

        <TextField label={t("startDate")} type="date" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} InputLabelProps={{ shrink: true }} error={Boolean(errors.startDate)} helperText={errors.startDate || " "} />

        <TextField label={t("endDate")} type="date" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} InputLabelProps={{ shrink: true }} />

        <TextField label={t("notes")} value={form.notes} onChange={(e) => set("notes", e.target.value)} multiline minRows={3} />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={() => {
            if (!validate()) return;
            const id = store.createGoal(form);
            nav(`/goals/${id}`);
          }}>
            {t("save")}
          </Button>
          <Button onClick={() => nav(-1)}>{t("cancel")}</Button>
        </Box>
      </Paper>
    </Box>
  );
}
