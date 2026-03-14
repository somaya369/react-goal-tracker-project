import React from "react";
import { strings } from "./strings";

const KEY = "gt_settings_v1";

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { language: "en", mode: "light" };
    const s = JSON.parse(raw);
    return {
      language: s.language === "fa" ? "fa" : "en",
      mode: s.mode === "dark" ? "dark" : "light",
    };
  } catch {
    return { language: "en", mode: "light" };
  }
}

function save(settings) {
  localStorage.setItem(KEY, JSON.stringify(settings));
}

const Ctx = React.createContext(null);

export function AppSettingsProvider({ children }) {
  const [state, setState] = React.useState(load);

  const setLanguage = (language) =>
    setState((prev) => {
      const next = { ...prev, language };
      save(next);
      return next;
    });

  const setMode = (mode) =>
    setState((prev) => {
      const next = { ...prev, mode };
      save(next);
      return next;
    });

  const value = React.useMemo(
    () => ({ ...state, setLanguage, setMode }),
    [state]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppSettings() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useAppSettings must be used inside AppSettingsProvider");
  return ctx;
}

export function useT() {
  const { language } = useAppSettings();
  return (key) => strings[language]?.[key] ?? key;
}
