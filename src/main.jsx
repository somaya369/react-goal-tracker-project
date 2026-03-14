import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";

import { router } from "./app/router";
import { createAppTheme } from "./app/theme";
import { AppSettingsProvider, useAppSettings } from "./i18n/i18n";
import { getDirection } from "./styles/direction";

function ThemedApp() {
  const { language, mode } = useAppSettings();
  const dir = getDirection(language);

  const theme = React.useMemo(() => createAppTheme({ mode, dir }), [mode, dir]);

  const cache = React.useMemo(() => {
    if (dir === "rtl") {
      return createCache({ key: "mui-rtl", stylisPlugins: [rtlPlugin] });
    }
    return createCache({ key: "mui-ltr" });
  }, [dir]);

  React.useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </CacheProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppSettingsProvider>
      <ThemedApp />
    </AppSettingsProvider>
  </React.StrictMode>
);
