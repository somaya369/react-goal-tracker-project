import React from "react";
import { Box, Typography, Grid, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useGoalsStore } from "../features/goals/goalsHooks";
import { useT } from "../i18n/i18n";
import GoalCard from "../components/GoalCard";
import EmptyState from "../components/EmptyState";
import StatCard from "../components/StatCard";
import ConfirmDialog from "../components/ConfirmDialog";

export default function Dashboard() {
  const t = useT();
  const nav = useNavigate();
  const store = useGoalsStore();
  const { derived, stats } = store;

  const [deleteId, setDeleteId] = React.useState(null);

  const active = derived.activeGoals;
  const recentlyCompleted = derived.completedGoals.slice(0, 3);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("dashboard")}</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <StatCard label={t("summary")} value={`${derived.overallPercent}% ${t("complete")}`} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label={t("completedGoals")} value={derived.completedCount} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label={t("streak")} value={`${stats.streak || 0} ${t("days")}`} />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard label={t("xp")} value={stats.xpTotal || 0} sub={`${t("level")}: ${derived.level}`} />
        </Grid>
      </Grid>

      <Paper variant="outlined" sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 1, alignItems: "center" }}>
        <Typography sx={{ fontWeight: 900, mr: 1 }}>{t("quickActions")}:</Typography>
        <Button variant="contained" onClick={() => nav("/goals/new")}>+ {t("newGoal")}</Button>
        <Button onClick={() => nav("/goals")}>{t("viewAllGoals")}</Button>
      </Paper>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>{t("activeGoals")}</Typography>

        {active.length === 0 ? (
          <EmptyState />
        ) : (
          <Grid container spacing={2}>
            {active.map((g) => (
              <Grid item xs={12} md={6} lg={4} key={g.id}>
                <GoalCard
                  goal={g}
                  onMarkProgress={(id) => store.addProgress(id, 1)}
                  onTogglePause={(id) => store.togglePause(id)}
                  onDelete={(id) => setDeleteId(id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>{t("completedPreview")}</Typography>

        {recentlyCompleted.length === 0 ? (
          <Typography sx={{ opacity: 0.7 }}>—</Typography>
        ) : (
          <Grid container spacing={2}>
            {recentlyCompleted.map((g) => (
              <Grid item xs={12} md={6} lg={4} key={g.id}>
                <GoalCard
                  goal={g}
                  onMarkProgress={() => {}}
                  onTogglePause={() => {}}
                  onDelete={(id) => setDeleteId(id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      <ConfirmDialog
        open={Boolean(deleteId)}
        title={t("delete")}
        description={t("confirmDelete")}
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          store.deleteGoal(deleteId);
          setDeleteId(null);
        }}
      />
    </Box>
  );
}
