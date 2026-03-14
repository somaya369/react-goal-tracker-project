import React from "react";
import { Card, CardContent, CardActions, Typography, Box, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import { useNavigate } from "react-router-dom";

import ProgressBar from "./ProgressBar";
import CategoryBadge from "./CategoryBadge";
import { calcProgressPercent, goalTargetLabel } from "../features/goals/goalUtils";
import { STATUS } from "../features/goals/goalTypes";
import { useT } from "../i18n/i18n";

export default function GoalCard({ goal, onMarkProgress, onTogglePause, onDelete }) {
  const t = useT();
  const nav = useNavigate();
  const pct = calcProgressPercent(goal);

  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "grid", gap: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1.2 }}>
              {goal.title}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5, flexWrap: "wrap" }}>
              <CategoryBadge label={goal.category} />
              <Typography variant="caption">
                {goal.status === STATUS.ACTIVE ? t("active") : goal.status === STATUS.PAUSED ? t("paused") : t("completed")}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ minWidth: 120, textAlign: "end" }}>
            <Typography variant="body2" sx={{ fontWeight: 800 }}>
              {goalTargetLabel(goal, t)}
            </Typography>
          </Box>
        </Box>

        <ProgressBar value={pct} />
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button
          size="small"
          startIcon={<DoneIcon />}
          variant="contained"
          onClick={() => onMarkProgress(goal.id)}
          disabled={goal.status !== STATUS.ACTIVE}
        >
          {t("markProgress")}
        </Button>

        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Tooltip title={t("details")}>
            <IconButton onClick={() => nav(`/goals/${goal.id}`)}>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={goal.status === STATUS.PAUSED ? t("resume") : t("pause")}>
            <IconButton onClick={() => onTogglePause(goal.id)} disabled={goal.status === STATUS.COMPLETED}>
              {goal.status === STATUS.PAUSED ? <PlayArrowIcon /> : <PauseIcon />}
            </IconButton>
          </Tooltip>

          <Tooltip title={t("delete")}>
            <IconButton onClick={() => onDelete(goal.id)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}
