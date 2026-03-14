import React from "react";
import { Box, Typography, Grid, Paper, LinearProgress } from "@mui/material";

import { useGoalsStore } from "../features/goals/goalsHooks";
import { useT } from "../i18n/i18n";
import CategoryChart from "../components/CategoryChart";

export default function Categories() {
  const t = useT();
  const { goals } = useGoalsStore();

  const data = React.useMemo(() => {
    const map = new Map();
    for (const g of goals) {
      const cur = map.get(g.category) || { category: g.category, active: 0, completed: 0, progressSum: 0, count: 0 };
      if (g.status === "completed") cur.completed += 1;
      else if (g.status === "active") cur.active += 1;

      cur.progressSum += g.target > 0 ? Math.min(1, g.progress / g.target) : 0;
      cur.count += 1;
      map.set(g.category, cur);
    }
    return Array.from(map.values()).map((x) => ({
      ...x,
      avgProgress: x.count ? Math.round((x.progressSum / x.count) * 100) : 0,
    }));
  }, [goals]);

  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("categories")}</Typography>

      {data.length > 0 && <CategoryChart data={data} />}

      {data.length === 0 ? (
        <Typography sx={{ opacity: 0.7 }}>—</Typography>
      ) : (
        <Grid container spacing={2}>
          {data.map((c) => (
            <Grid item xs={12} md={6} lg={4} key={c.category}>
              <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>{c.category}</Typography>
                <Typography variant="body2">
                  {t("active")}: {c.active} • {t("completed")}: {c.completed}
                </Typography>
                <LinearProgress variant="determinate" value={c.avgProgress} sx={{ height: 10, borderRadius: 999 }} />
                <Typography variant="caption">{c.avgProgress}%</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
