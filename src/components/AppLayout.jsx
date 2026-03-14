import React from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import SideNav from "./SideNav";

export default function AppLayout({ children }) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <SideNav />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <TopBar />
        <Box component="main" sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
