// ─── UTILITY FUNCTIONS ─────────────────────────────────────────────────────

export const getToday = () => new Date().toISOString().split("T")[0];

export const getDayName = () =>
  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];

export const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const getWeekNumber = (s) => {
  if (!s) return 1;
  const diff = new Date() - new Date(s);
  if (diff < 0) return 0;
  return Math.max(1, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000)));
};

export const getPhaseIdx = (s) => {
  const w = getWeekNumber(s);
  if (w <= 4) return 0;
  if (w <= 8) return 1;
  if (w <= 12) return 2;
  return 3;
};

export const getCycleDay = (lp) => {
  if (!lp) return null;
  return (Math.floor((new Date() - new Date(lp)) / (24 * 60 * 60 * 1000)) % 28) + 1;
};

export const getCyclePhaseIdx = (cd) => {
  if (!cd) return 0;
  if (cd <= 5) return 0;
  if (cd <= 13) return 1;
  if (cd <= 16) return 2;
  return 3;
};

// Get ISO week ID for weekly tracking (e.g. "2026-W10")
export const getWeekId = (date) => {
  const d = date ? new Date(date) : new Date();
  const jan1 = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - jan1) / (24 * 60 * 60 * 1000));
  const weekNum = Math.ceil((days + jan1.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
};

// Get start of current week (Sunday)
export const getWeekStart = () => {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
};

// ─── DYNAMIC MILESTONES ───────────────────────────────────────────────────

export const generateMilestones = (startW, targetW) => {
  if (!startW || !targetW || startW <= targetW) return [];
  const total = startW - targetW;
  const milestones = [];
  const step = total > 20 ? 5 : total > 10 ? 3 : 2;
  const labels = [
    "First Drop!", "Gaining Momentum!", "On Fire!",
    "Halfway There!", "Almost There!", "Goal Reached!",
  ];
  const emojis = ["🔥", "💪", "⭐", "🏆", "🚀", "👑"];

  let current = startW - step;
  let i = 0;
  while (current > targetW && i < 5) {
    milestones.push({
      kg: Math.round(current * 10) / 10,
      label: labels[i] || `${Math.round(startW - current)}kg Down!`,
      emoji: emojis[i] || "🎯",
    });
    current -= step;
    i++;
  }
  // Always include the goal
  milestones.push({
    kg: Math.round(targetW * 10) / 10,
    label: "Goal Reached!",
    emoji: "👑",
  });
  return milestones;
};
