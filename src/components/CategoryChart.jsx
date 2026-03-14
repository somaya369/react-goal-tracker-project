import React from "react";
import { Paper, Typography } from "@mui/material";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useT } from "../i18n/i18n";

export default function CategoryChart({ data }) {
  const t = useT();

  return (
    <Paper variant="outlined" sx={{ p: 2, height: 320 }}>
      <Typography sx={{ fontWeight: 900, mb: 1 }}>
        {t("categoryChartTitle")}
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="category" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="avgProgress" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
}
