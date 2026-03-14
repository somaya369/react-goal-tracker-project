import React from "react";
import { NavLink } from "react-router-dom";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import { useT } from "../i18n/i18n";

const navItemSx = {
  "&.active": { bgcolor: "action.selected" },
  borderRadius: 2,
  mx: 1,
};

export default function SideNav() {
  const t = useT();
  return (
    <Paper
      elevation={0}
      sx={{
        width: { xs: 0, md: 260 },
        display: { xs: "none", md: "block" },
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 2 }}>
        <List sx={{ display: "grid", gap: 1 }}>
          <ListItemButton component={NavLink} to="/dashboard" sx={navItemSx}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary={t("dashboard")} />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/goals" sx={navItemSx}>
            <ListItemIcon><ChecklistIcon /></ListItemIcon>
            <ListItemText primary={t("goals")} />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/goals/new" sx={navItemSx}>
            <ListItemIcon><AddCircleIcon /></ListItemIcon>
            <ListItemText primary={t("newGoal")} />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/categories" sx={navItemSx}>
            <ListItemIcon><CategoryIcon /></ListItemIcon>
            <ListItemText primary={t("categories")} />
          </ListItemButton>

          <ListItemButton component={NavLink} to="/settings" sx={navItemSx}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary={t("settings")} />
          </ListItemButton>
        </List>
      </Box>
    </Paper>
  );
}
