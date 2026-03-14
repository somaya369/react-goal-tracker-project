import React from "react";
import { Box, Typography, Paper, Button, TextField, Divider, Chip } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

import { useGoalsStore } from "../features/goals/goalsHooks";
import { useT } from "../i18n/i18n";
import ConfirmDialog from "../components/ConfirmDialog";
import ProgressBar from "../components/ProgressBar";
import { calcProgressPercent } from "../features/goals/goalUtils";

export default function GoalDetails() {
  const t = useT();
  const { id } = useParams();
  const nav = useNavigate();
  const store = useGoalsStore();

  const goal = store.goals.find((g) => g.id === id);

  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [amount, setAmount] = React.useState(1);
  const [edit, setEdit] = React.useState(null);

  React.useEffect(() => {
    if (goal) {
      setEdit({
        title: goal.title,
        category: goal.category,
        target: goal.target,
        notes: goal.notes || "",
      });
    }
  }, [goal]);

  if (!goal) {
    return (
      <Box sx={{ display: "grid", gap: 2 }}>
        <Typography variant="h6">Goal not found</Typography>
        <Button variant="contained" onClick={() => nav("/goals")}>{t("goals")}</Button>
      </Box>
    );
  }

  const pct = calcProgressPercent(goal);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, flexWrap: "wrap" }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("details")}</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" onClick={() => store.togglePause(goal.id)}>
            {goal.status === "paused" ? t("resume") : t("pause")}
          </Button>
          <Button variant="outlined" color="error" onClick={() => setDeleteOpen(true)}>
            {t("delete")}
          </Button>
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>{goal.title}</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label={goal.category} variant="outlined" />
          <Chip label={goal.status} variant="outlined" />
          <Chip label={`${pct}%`} />
        </Box>

        <ProgressBar value={pct} />

        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          {t("createdAt")}: {new Date(goal.createdAt).toLocaleString()}
        </Typography>

        <Divider sx={{ my: 1 }} />

        {edit && (
          <Box sx={{ display: "grid", gap: 1, maxWidth: 720 }}>
            <TextField label={t("title")} value={edit.title} onChange={(e) => setEdit((s) => ({ ...s, title: e.target.value }))} />
            <TextField label={t("category")} value={edit.category} onChange={(e) => setEdit((s) => ({ ...s, category: e.target.value }))} />
            <TextField label={t("target")} type="number" value={edit.target} onChange={(e) => setEdit((s) => ({ ...s, target: Number(e.target.value) }))} />
            <TextField label={t("notes")} value={edit.notes} onChange={(e) => setEdit((s) => ({ ...s, notes: e.target.value }))} multiline minRows={3} />

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Button variant="contained" onClick={() => store.updateGoal(goal.id, edit)}>{t("save")}</Button>
              <Button onClick={() => store.markComplete(goal.id)}>{t("markComplete")}</Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>{t("addEntry")}</Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}>
          <TextField label={t("amount")} type="number" size="small" value={amount} onChange={(e) => setAmount(e.target.value)} sx={{ width: 160 }} />
          <Button variant="contained" onClick={() => store.addProgress(goal.id, Number(amount))} disabled={goal.status !== "active"}>
            {t("markProgress")}
          </Button>
        </Box>
      </Paper>

      <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>{t("history")}</Typography>
        {goal.logs.length === 0 ? (
          <Typography sx={{ opacity: 0.7 }}>—</Typography>
        ) : (
          <Box sx={{ display: "grid", gap: 0.5 }}>
            {goal.logs.slice(0, 20).map((l, idx) => (
              <Box key={idx} sx={{ display: "flex", justifyContent: "space-between", p: 1, border: 1, borderColor: "divider", borderRadius: 2 }}>
                <Typography>{l.date}</Typography>
                <Typography sx={{ fontWeight: 900 }}>+{l.amount}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      <ConfirmDialog
        open={deleteOpen}
        title={t("delete")}
        description={t("confirmDelete")}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => {
          store.deleteGoal(goal.id);
          setDeleteOpen(false);
          nav("/goals");
        }}
      />
    </Box>
  );
}
