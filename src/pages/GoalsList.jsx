import React from "react";
import { Box, Typography, Grid, TextField, MenuItem, Tabs, Tab } from "@mui/material";

import { useGoalsStore } from "../features/goals/goalsHooks";
import { useT } from "../i18n/i18n";
import GoalCard from "../components/GoalCard";
import ConfirmDialog from "../components/ConfirmDialog";
import EmptyState from "../components/EmptyState";

export default function GoalsList() {
  const t = useT();
  const store = useGoalsStore();
  const { goals } = store;

  const [tab, setTab] = React.useState("all");
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState("newest");
  const [deleteId, setDeleteId] = React.useState(null);

  const filtered = React.useMemo(() => {
    let arr = [...goals];

    if (tab !== "all") arr = arr.filter((g) => g.status === tab);
    if (q.trim()) arr = arr.filter((g) => g.title.toLowerCase().includes(q.toLowerCase()));

    if (sort === "newest") {
      arr.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    } else if (sort === "progress") {
      arr.sort((a, b) => (b.target ? b.progress / b.target : 0) - (a.target ? a.progress / a.target : 0));
    } else if (sort === "category") {
      arr.sort((a, b) => (a.category || "").localeCompare(b.category || ""));
    }

    return arr;
  }, [goals, tab, q, sort]);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("goals")}</Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable">
        <Tab value="all" label={t("all")} />
        <Tab value="active" label={t("active")} />
        <Tab value="paused" label={t("paused")} />
        <Tab value="completed" label={t("completed")} />
      </Tabs>

      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
        <TextField label={t("search")} value={q} onChange={(e) => setQ(e.target.value)} size="small" sx={{ minWidth: 240 }} />
        <TextField label={t("sortBy")} value={sort} onChange={(e) => setSort(e.target.value)} size="small" select sx={{ minWidth: 200 }}>
          <MenuItem value="newest">{t("newest")}</MenuItem>
          <MenuItem value="progress">{t("progress")}</MenuItem>
          <MenuItem value="category">{t("category")}</MenuItem>
        </TextField>
      </Box>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <Grid container spacing={2}>
          {filtered.map((g) => (
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
