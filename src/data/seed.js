import { readGoals, writeGoals, readStats, writeStats } from "../features/goals/goalsStorage";

export function seedIfEmpty() {
  const goals = readGoals();
  if (goals.length > 0) return;

  const now = new Date().toISOString();
  writeGoals([
    {
      id: "g1",
      title: "Study React 30 days",
      category: "Study",
      type: "daily",
      target: 30,
      progress: 5,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: null,
      notes: "",
      logs: [],
      createdAt: now,
      updatedAt: now,
    },
    {
      id: "g2",
      title: "Workout 12 sessions",
      category: "Health",
      type: "count",
      target: 12,
      progress: 3,
      status: "active",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: null,
      notes: "",
      logs: [],
      createdAt: now,
      updatedAt: now,
    },
  ]);

  const stats = readStats();
  writeStats({
    xpTotal: stats.xpTotal || 0,
    streak: stats.streak || 0,
    completedCount: 0,
    lastLogDate: stats.lastLogDate || null,
  });
}
