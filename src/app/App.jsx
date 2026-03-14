import React from "react";
import { Outlet } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import { ensureStorageReady } from "../features/goals/goalsStorage";
import { seedIfEmpty } from "../data/seed";

export default function App() {
  React.useEffect(() => {
    ensureStorageReady();
    seedIfEmpty();
  }, []);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
