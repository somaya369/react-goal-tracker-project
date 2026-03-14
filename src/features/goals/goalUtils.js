import { differenceInCalendarDays, parseISO } from "date-fns";
import { STATUS } from "./goalTypes";

export function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function todayISO() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function calcProgressPercent(goal) {
  if (!goal.target || goal.target <= 0) return 0;
  return clamp(Math.round((goal.progress / goal.target) * 100), 0, 100);
}

export function isCompleted(goal) {
  return goal.target > 0 && goal.progress >= goal.target;
}

export function autoStatus(goal) {
  if (goal.status === STATUS.COMPLETED) return goal;
  if (isCompleted(goal)) return { ...goal, status: STATUS.COMPLETED };
  return goal;
}

export function goalTargetLabel(goal, t) {
  if (goal.type === "daily") return `${goal.progress}/${goal.target} ${t ? t("days") : "days"}`;
  if (goal.type === "time") return `${goal.progress}/${goal.target} min`;
  return `${goal.progress}/${goal.target}`;
}

// Streak rule:
// today log + lastLogDate yesterday => streak +1
// today log + lastLogDate today => same
// gap >1 => streak = 1
export function nextStreak({ lastLogDate, today, currentStreak }) {
  if (!lastLogDate) return { streak: 1, lastLogDate: today };

  const diff = differenceInCalendarDays(parseISO(today), parseISO(lastLogDate));
  if (diff === 0) return { streak: currentStreak, lastLogDate };
  if (diff === 1) return { streak: currentStreak + 1, lastLogDate: today };
  return { streak: 1, lastLogDate: today };
}
