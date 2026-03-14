import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useAppSettings, useT } from "../i18n/i18n";

export default function LanguageToggle() {
  const { language, setLanguage } = useAppSettings();
  const t = useT();

  return (
    <ToggleButtonGroup
      size="small"
      value={language}
      exclusive
      onChange={(_, v) => v && setLanguage(v)}
    >
      <ToggleButton value="en">{t("english")}</ToggleButton>
      <ToggleButton value="fa">{t("persian")}</ToggleButton>
    </ToggleButtonGroup>
  );
}
