import React from "react";
import { readGoals, writeGoals, readStats, writeStats } from "./goalsStorage";
import { autoStatus, todayISO, uid, nextStreak } from "./goalUtils";
import { STATUS } from "./goalTypes";

const XP_PER_LOG = 20;

function computeCompletedCount(goals) {
  return goals.filter((g) => g.status === STATUS.COMPLETED).length;
}

function computeOverallCompletion(goals) {
  if (goals.length === 0) return 0;
  const targets = goals.reduce((s, g) => s + (g.target > 0 ? g.target : 0), 0);
  if (targets === 0) return 0;
  const progress = goals.reduce((s, g) => s + (g.progress > 0 ? g.progress : 0), 0);
  return Math.max(0, Math.min(100, Math.round((progress / targets) * 100)));
}

function computeDerived(goals, stats) {
  const completedCount = computeCompletedCount(goals);
  const overallPercent = computeOverallCompletion(goals);
  const level = Math.floor((stats.xpTotal || 0) / 200) + 1;

  return {
    completedCount,
    overallPercent,
    level,
    activeGoals: goals.filter((g) => g.status === STATUS.ACTIVE),
    pausedGoals: goals.filter((g) => g.status === STATUS.PAUSED),
    completedGoals: goals.filter((g) => g.status === STATUS.COMPLETED),
  };
}

export function useGoalsStore() {
  const [goals, setGoals] = React.useState(() => readGoals());
  const [stats, setStats] = React.useState(() => readStats());

  const persistGoals = (next) => {
    writeGoals(next);
    setGoals(next);
  };

  const persistStats = (next) => {
    writeStats(next);
    setStats(next);
  };

  const createGoal = (payload) => {
    const now = new Date().toISOString();
    const goal = {
      id: uid(),
      title: payload.title.trim(),
      category: payload.category,
      type: payload.type,
      target: Number(payload.target),
      progress: 0,
      status: STATUS.ACTIVE,
      startDate: payload.startDate,
      endDate: payload.endDate || null,
      notes: payload.notes || "",
      logs: [],
      createdAt: now,
      updatedAt: now,
    };
    persistGoals([goal, ...goals]);
    return goal.id;
  };

  const updateGoal = (id, patch) => {
    const now = new Date().toISOString();
    const next = goals.map((g) =>
      g.id === id ? autoStatus({ ...g, ...patch, updatedAt: now }) : g
    );
    persistGoals(next);

    const nextStats = { ...stats, completedCount: computeCompletedCount(next) };
    persistStats(nextStats);
  };

  const deleteGoal = (id) => {
    const next = goals.filter((g) => g.id !== id);
    persistGoals(next);
    persistStats({ ...stats, completedCount: computeCompletedCount(next) });
  };

  const togglePause = (id) => {
    const next = goals.map((g) => {
      if (g.id !== id) return g;
      if (g.status === STATUS.COMPLETED) return g;
      return { ...g, status: g.status === STATUS.PAUSED ? STATUS.ACTIVE : STATUS.PAUSED };
    });
    persistGoals(next);
  };

  const markComplete = (id) => {
    const next = goals.map((g) =>
      g.id === id ? { ...g, status: STATUS.COMPLETED, progress: g.target } : g
    );
    persistGoals(next);
    persistStats({ ...stats, completedCount: computeCompletedCount(next) });
  };

  const addProgress = (id, amount = 1) => {
    const today = todayISO();
    const nowIso = new Date().toISOString();

    const nextGoals = goals.map((g) => {
      if (g.id !== id) return g;
      if (g.status !== STATUS.ACTIVE) return g;

      const nextProgress = g.progress + Number(amount);
      const nextLogs = [{ date: today, amount: Number(amount) }, ...g.logs];

      return autoStatus({
        ...g,
        progress: nextProgress,
        logs: nextLogs,
        updatedAt: nowIso,
      });
    });

    persistGoals(nextGoals);

    const streakNext = nextStreak({
      lastLogDate: stats.lastLogDate,
      today,
      currentStreak: stats.streak || 0,
    });

    const nextStats = {
      ...stats,
      xpTotal: (stats.xpTotal || 0) + XP_PER_LOG,
      streak: streakNext.streak,
      lastLogDate: streakNext.lastLogDate,
      completedCount: computeCompletedCount(nextGoals),
    };

    persistStats(nextStats);
  };

  const derived = React.useMemo(() => computeDerived(goals, stats), [goals, stats]);

  return {
    goals,
    stats,
    derived,
    createGoal,
    updateGoal,
    deleteGoal,
    togglePause,
    addProgress,
    markComplete,
  };
}
