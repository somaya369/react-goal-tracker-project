import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import LanguageToggle from "./LanguageToggle";
import ThemeToggle from "./ThemeToggle";
import { useT } from "../i18n/i18n";

export default function TopBar() {
  const t = useT();
  return (
    <AppBar position="sticky" elevation={0} color="default">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          {t("appName")}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <LanguageToggle />
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
