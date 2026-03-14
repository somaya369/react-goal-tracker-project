const GOALS_KEY = "gt_goals_v1";
const STATS_KEY = "gt_stats_v1";

export function ensureStorageReady() {
  if (!localStorage.getItem(GOALS_KEY)) localStorage.setItem(GOALS_KEY, "[]");
  if (!localStorage.getItem(STATS_KEY)) {
    localStorage.setItem(
      STATS_KEY,
      JSON.stringify({ xpTotal: 0, streak: 0, completedCount: 0, lastLogDate: null })
    );
  }
}

export function readGoals() {
  return JSON.parse(localStorage.getItem(GOALS_KEY) || "[]");
}
export function writeGoals(goals) {
  localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
}

export function readStats() {
  return JSON.parse(localStorage.getItem(STATS_KEY) || "{}");
}
export function writeStats(stats) {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}
