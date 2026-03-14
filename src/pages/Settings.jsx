import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { useT } from "../i18n/i18n";
import LanguageToggle from "../components/LanguageToggle";
import ThemeToggle from "../components/ThemeToggle";

export default function Settings() {
  const t = useT();
  return (
    <Box sx={{ display: "grid", gap: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{t("settings")}</Typography>

      <Paper variant="outlined" sx={{ p: 2, display: "grid", gap: 2, maxWidth: 720 }}>
        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>{t("language")}</Typography>
          <LanguageToggle />
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>{t("theme")}</Typography>
          <ThemeToggle />
        </Box>
      </Paper>
    </Box>
  );
}
