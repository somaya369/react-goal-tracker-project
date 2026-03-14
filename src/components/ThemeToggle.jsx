import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppSettings, useT } from "../i18n/i18n";

export default function ThemeToggle() {
  const { mode, setMode } = useAppSettings();
  const t = useT();

  return (
    <ToggleButtonGroup
      size="small"
      value={mode}
      exclusive
      onChange={(_, v) => v && setMode(v)}
    >
      <ToggleButton value="light">{t("light")}</ToggleButton>
      <ToggleButton value="dark">{t("dark")}</ToggleButton>
    </ToggleButtonGroup>
  );
}
