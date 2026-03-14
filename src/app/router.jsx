import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import Dashboard from "../pages/Dashboard";
import GoalsList from "../pages/GoalsList";
import GoalCreate from "../pages/GoalCreate";
import GoalDetails from "../pages/GoalDetails";
import Categories from "../pages/Categories";
import Settings from "../pages/Settings";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "goals", element: <GoalsList /> },
      { path: "goals/new", element: <GoalCreate /> },
      { path: "goals/:id", element: <GoalDetails /> },
      { path: "categories", element: <Categories /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
