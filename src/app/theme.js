import { createTheme } from "@mui/material/styles";

export function createAppTheme({ mode, dir }) {
  return createTheme({
    direction: dir,
    palette: { mode },
    shape: { borderRadius: 14 },
    typography: {
      fontFamily:
        dir === "rtl"
          ? "Tahoma, Arial, sans-serif"
          : "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    components: {
      MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
      MuiButton: { styleOverrides: { root: { borderRadius: 14 } } },
    },
  });
}
