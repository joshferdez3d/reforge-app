import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Check, ChevronRight, Flame, Target, TrendingDown, Dumbbell, Droplets, Moon, Sun, Heart, Calendar, ArrowRight, User, RotateCcw, Award, Zap, Coffee, Salad, X, Star, Clock, Activity, Footprints, Wind } from "lucide-react";

// ─── NISHANT'S PLAN ───────────────────────────────────────────────────────────
const PHASES_NISHANT = [
  {
    id: 1, name: "Build the Foundation", weeks: "1–4", subtitle: "Create the daily habit",
    weeklyPlan: [
      { day: "Monday", type: "walk", title: "Morning Walk", duration: "25 min", detail: "Easy pace, focus on breathing. No rush. Treadmill: 4.5–5 km/h, 1% incline." },
      { day: "Tuesday", type: "strength", title: "Bodyweight Basics", duration: "15 min", detail: "Wall pushups ×10, Chair squats ×10, Plank 20s — 3 rounds" },
      { day: "Wednesday", type: "walk", title: "Walk + Stretch", duration: "30 min", detail: "20 min walk (5 km/h, 1% incline), then stretch: Neck rolls 10 each way → Shoulder circles 10 forward/back → Standing quad stretch 30s each leg (hold wall for balance) → Standing hamstring stretch 30s each (foot on low step, lean forward) → Hip flexor stretch 30s each (big lunge, push hips forward) → Chest doorway stretch 30s → Seated spinal twist 30s each side." },
      { day: "Thursday", type: "rest", title: "Active Rest", duration: "15 min", detail: "Hip circles 10 each direction → Leg swings 10 each (forward/back, hold wall) → Cat-cow on all fours 10 reps → World's greatest stretch 5 each side (lunge, twist, reach up) → Shoulder rolls 10 each → Neck tilts 30s each side → Child's pose 60s. Repeat if it feels good." },
      { day: "Friday", type: "strength", title: "Bodyweight Basics", duration: "15 min", detail: "Wall pushups ×12, Chair squats ×12, Plank 25s — 3 rounds" },
      { day: "Saturday", type: "walk", title: "Long Walk", duration: "40 min", detail: "Explore a new route. Listen to a podcast. Enjoy it. Treadmill: 4.5–5 km/h, 2% incline." },
      { day: "Sunday", type: "rest", title: "Full Rest", duration: "—", detail: "Rest completely. If you feel like moving: neck rolls, shoulder shrugs, standing toe touch hold 30s, child's pose 60s. That's it — nothing more." },
    ],
    nutrition: ["Eat 3 meals a day — no snacking between", "Fill half your plate with vegetables", "Cut all sugary drinks — water, black coffee, tea only", "Drink 2.5L of water daily", "No food after 8pm"],
  },
  {
    id: 2, name: "Build Strength", weeks: "5–8", subtitle: "Add resistance, push further",
    weeklyPlan: [
      { day: "Monday", type: "walk", title: "Brisk Walk", duration: "35 min", detail: "Push the pace. Slightly breathless but can still talk. Treadmill: 5.5–6 km/h, 2% incline." },
      { day: "Tuesday", type: "strength", title: "Upper Body Circuit", duration: "25 min", detail: "Pushups ×12, Dips ×10, Pike pushups ×8, Plank 40s — 4 rounds" },
      { day: "Wednesday", type: "walk", title: "Walk + Mobility", duration: "35 min", detail: "25 min brisk walk (5.5 km/h, 2% incline), then mobility: 90/90 hip switches ×10 (sit on floor, rotate knees side to side) → Deep squat hold 30s (hold door frame) → Thoracic rotations ×10 each (on all fours, hand behind head, rotate open) → Pigeon stretch 45s each side → Lat stretch on door frame 30s each." },
      { day: "Thursday", type: "strength", title: "Lower Body Circuit", duration: "25 min", detail: "Squats ×15, Lunges ×10/side, Glute bridges ×15, Wall sit 30s — 4 rounds" },
      { day: "Friday", type: "walk", title: "Incline Walk", duration: "30 min", detail: "Find hills or stairs. Walk up at pace, easy pace down. Treadmill: 5 km/h, 6–8% incline." },
      { day: "Saturday", type: "strength", title: "Full Body", duration: "30 min", detail: "Pushups ×15, Squats ×15, Plank 45s, Lunges ×12/side, Burpees ×5 — 3 rounds" },
      { day: "Sunday", type: "rest", title: "Recovery", duration: "20 min", detail: "Hold each for 45–60s, breathe deep: Child's pose → Downward dog (pedal feet) → Low lunge hip flexor stretch each side → Pigeon pose each side → Seated forward fold → Supine spinal twist each side → Legs up the wall 2 min. Take it slow, don't force anything." },
    ],
    nutrition: ["Palm-sized protein at every meal (eggs, chicken, fish, paneer, dal)", "Fist-sized portion of carbs only (rice, roti, potato)", "Keep half plate vegetables", "Water up to 3L", "One treat meal per week — enjoy it guilt-free"],
  },
  {
    id: 3, name: "Level Up", weeks: "9–12", subtitle: "Increase intensity, build endurance",
    weeklyPlan: [
      { day: "Monday", type: "cardio", title: "Walk/Jog Intervals", duration: "30 min", detail: "Walk 2 min, jog 1 min. Repeat 10×. Cool down 5 min. Treadmill: walk 5.5 km/h, jog 7.5–8 km/h." },
      { day: "Tuesday", type: "strength", title: "Push Day", duration: "30 min", detail: "Pushups ×15, Diamond pushups ×8, Dips ×12, Pike pushups ×10, Plank 60s — 4 rounds" },
      { day: "Wednesday", type: "cardio", title: "Brisk Walk", duration: "40 min", detail: "Fast-paced walk. Arms swinging. Keep heart rate up. Treadmill: 6–6.5 km/h, 3% incline." },
      { day: "Thursday", type: "strength", title: "Pull + Legs", duration: "30 min", detail: "Squats ×20, Lunges ×12/side, Inverted rows ×10, Glute bridges ×20, Burpees ×8 — 4 rounds" },
      { day: "Friday", type: "cardio", title: "Walk/Jog Intervals", duration: "30 min", detail: "Walk 1 min, jog 2 min. Repeat 8×. Push yourself. Treadmill: walk 5.5 km/h, jog 8–8.5 km/h." },
      { day: "Saturday", type: "strength", title: "Full Body Challenge", duration: "35 min", detail: "100 squats, 50 pushups, 50 lunges, 3 min plank — break as needed" },
      { day: "Sunday", type: "rest", title: "Active Recovery", duration: "25 min", detail: "Option A — Stretch flow (hold 60s each): Child's pose → Cat-cow ×10 → Downward dog → Low lunge each side → Pigeon each side → Seated hamstring stretch → Supine twist each side → Legs up wall 3 min. Option B — 15 min easy walk + the hip flexor and hamstring stretches after. Pick whichever feels right." },
    ],
    nutrition: ["Meal prep Sundays — prepare lunches for the week", "Protein at every meal — aim for your palm × 1.5", "Cut refined carbs — switch to brown/whole grain", "Water 3L minimum", "No fried food during weekdays"],
  },
  {
    id: 4, name: "Transform", weeks: "13–20", subtitle: "Full training mode",
    weeklyPlan: [
      { day: "Monday", type: "cardio", title: "Running", duration: "30 min", detail: "Steady jog at conversational pace. Treadmill: 8–9 km/h, 1% incline." },
      { day: "Tuesday", type: "strength", title: "Upper Body", duration: "35 min", detail: "5 rounds: Pushups ×20, Dips ×15, Pike pushups ×12, Inverted rows ×12, Plank 90s" },
      { day: "Wednesday", type: "cardio", title: "HIIT", duration: "25 min", detail: "30s on/30s off: Burpees, Mountain climbers, Jump squats, High knees — 5 rounds" },
      { day: "Thursday", type: "strength", title: "Lower Body", duration: "35 min", detail: "5 rounds: Squats ×20, Lunges ×15/side, Single-leg bridges ×12, Jump squats ×10, Wall sit 60s" },
      { day: "Friday", type: "cardio", title: "Long Run", duration: "35 min", detail: "Easy pace. Focus on distance, not speed. Treadmill: 8.5–9.5 km/h, 1% incline." },
      { day: "Saturday", type: "strength", title: "Full Body Power", duration: "40 min", detail: "10 burpees + 20 squats + 15 pushups + 30s plank — AMRAP 30 min" },
      { day: "Sunday", type: "rest", title: "Recovery", duration: "20 min", detail: "You've earned this. Hold 60s each: Foam roll quads & hamstrings (or tennis ball under feet 60s each) → Deep squat hold → Pigeon pose each side → Seated forward fold → Supine spinal twist each side → Legs up the wall 3 min. Breathe. You're a different person than Week 1." },
    ],
    nutrition: ["Track portions consistently", "Protein-forward every meal", "Whole foods only — minimize processed food", "Hydration: 3L+ water", "Sleep 7-8 hours — non-negotiable for fat loss"],
  },
];

// ─── PARTNER'S PLAN (Steps-first, gentle strength sneaked in) ─────────────────
const PHASES_PARTNER = [
  {
    id: 1, name: "Just Move", weeks: "1–4", subtitle: "Build the walking habit, feel good",
    stepTarget: 5000,
    weeklyPlan: [
      { day: "Monday", type: "steps", title: "Morning Steps", duration: "20 min", detail: "A gentle walk to start the week. Put on music or a podcast. Aim for 4,000 steps.", stepGoal: 4000 },
      { day: "Tuesday", type: "steps", title: "Afternoon Walk", duration: "25 min", detail: "Walk at your own pace. A neighbourhood loop or a mall walk. 4,500 steps.", stepGoal: 4500 },
      { day: "Wednesday", type: "gentle", title: "5-Min Movement Snack", duration: "5 min", detail: "Just 5 minutes! Stand up: sit down to a chair and stand up ×10, hold wall for balance — calf raises ×10 each side. Done!" },
      { day: "Thursday", type: "steps", title: "Walk & Talk", duration: "25 min", detail: "Call someone and walk while you chat. 5,000 steps.", stepGoal: 5000 },
      { day: "Friday", type: "gentle", title: "5-Min Stretch", duration: "5 min", detail: "Neck rolls, shoulder circles, touch your toes (try!), hip circles, deep breathing. Gentle and easy." },
      { day: "Saturday", type: "steps", title: "Explore Walk", duration: "35 min", detail: "Go somewhere nice — park, market, waterfront. Walk for the joy of it. 6,000 steps.", stepGoal: 6000 },
      { day: "Sunday", type: "rest", title: "Full Rest", duration: "—", detail: "Completely off. A short evening stroll if you feel like it." },
    ],
    nutrition: ["Eat 3 proper meals a day — reduce snacking", "Add one serving of vegetables to every meal", "Replace sugary drinks with water, nimbu pani, or green tea", "Drink 2L of water daily", "Stop eating 2 hours before bed"],
  },
  {
    id: 2, name: "Getting Stronger", weeks: "5–8", subtitle: "More steps, mini strength sessions",
    stepTarget: 7000,
    weeklyPlan: [
      { day: "Monday", type: "steps", title: "Power Walk", duration: "30 min", detail: "Walk with purpose — arms swinging, good posture. 6,000 steps.", stepGoal: 6000 },
      { day: "Tuesday", type: "gentle", title: "10-Min Strength", duration: "10 min", detail: "3 rounds: 10 chair squats, 10 wall pushups, 10 glute bridges (lie down, push hips up). Rest 30s between. You can do this!" },
      { day: "Wednesday", type: "steps", title: "Hilly Walk", duration: "30 min", detail: "Find a route with gentle inclines. Walk up a bit faster, easy pace down. 6,500 steps.", stepGoal: 6500 },
      { day: "Thursday", type: "gentle", title: "Gentle Yoga", duration: "12 min", detail: "Follow a beginner yoga video on YouTube. Search 'gentle yoga for beginners 10 min'. Focus on how it feels, not perfection." },
      { day: "Friday", type: "steps", title: "Walk + Errands", duration: "35 min", detail: "Combine your walk with errands. Park further away. Take the stairs. 7,000 steps.", stepGoal: 7000 },
      { day: "Saturday", type: "gentle", title: "10-Min Strength", duration: "10 min", detail: "3 rounds: 12 squats (no chair!), 10 wall pushups, 12 glute bridges, 15s plank. You're building real strength." },
      { day: "Sunday", type: "rest", title: "Active Rest", duration: "15 min", detail: "Gentle stretching. A slow stroll. Whatever feels good." },
    ],
    nutrition: ["Palm-sized protein at every meal (eggs, paneer, chicken, dal, fish)", "Half your plate should be vegetables or salad", "Switch to brown rice, multigrain roti, or quinoa", "Water target: 2.5L", "One treat meal per week — no guilt, enjoy it"],
  },
  {
    id: 3, name: "Finding Your Power", weeks: "9–12", subtitle: "Real strength, faster pace",
    stepTarget: 8000,
    weeklyPlan: [
      { day: "Monday", type: "steps", title: "Brisk Walk", duration: "35 min", detail: "Walk at a pace where you're slightly out of breath but can still talk. 7,500 steps.", stepGoal: 7500 },
      { day: "Tuesday", type: "strength", title: "Upper Body", duration: "15 min", detail: "4 rounds: 10 pushups (knees ok!), 10 tricep dips off a chair, 8 shoulder taps in plank, 20s plank. Rest 45s between." },
      { day: "Wednesday", type: "steps", title: "Interval Walk", duration: "30 min", detail: "Walk normal 2 min, walk as fast as you can 1 min. Repeat 10×. Surprisingly effective! 7,000 steps.", stepGoal: 7000 },
      { day: "Thursday", type: "strength", title: "Lower Body", duration: "15 min", detail: "4 rounds: 15 squats, 10 reverse lunges each side, 15 glute bridges, 10 calf raises each. Rest 45s between." },
      { day: "Friday", type: "steps", title: "Long Walk", duration: "40 min", detail: "A proper long walk. Bring water. Enjoy the journey. 8,000 steps.", stepGoal: 8000 },
      { day: "Saturday", type: "strength", title: "Full Body", duration: "15 min", detail: "3 rounds: 12 squats, 10 pushups, 10 lunges each, 12 glute bridges, 30s plank. You're SO much stronger than week 1." },
      { day: "Sunday", type: "rest", title: "Yoga or Rest", duration: "15 min", detail: "Gentle yoga flow or complete rest. Listen to your body." },
    ],
    nutrition: ["Meal prep Sundays — prep 3 days of lunches", "Protein with every meal — slightly larger portions now", "Minimize packaged snacks — nuts, fruit, yogurt instead", "Water 2.5L+", "Added sugar only on treat day"],
  },
  {
    id: 4, name: "Unstoppable", weeks: "13–20", subtitle: "Confident, capable, strong",
    stepTarget: 10000,
    weeklyPlan: [
      { day: "Monday", type: "steps", title: "Power Walk or Light Jog", duration: "35 min", detail: "Try walk 3 min / jog 1 min intervals if ready. Otherwise fast power walk. 8,000 steps.", stepGoal: 8000 },
      { day: "Tuesday", type: "strength", title: "Upper Body", duration: "20 min", detail: "4 rounds: 12 pushups, 12 dips, 10 pike pushups, 10 shoulder taps, 30s plank. Rest 30s between." },
      { day: "Wednesday", type: "steps", title: "Incline Walk", duration: "35 min", detail: "Seek out hills or stairs. Walk up briskly, easy down. Great for toning. 8,500 steps.", stepGoal: 8500 },
      { day: "Thursday", type: "strength", title: "Lower Body", duration: "20 min", detail: "4 rounds: 20 squats, 12 lunges each, 15 single-leg bridges each, 15 sumo squats, 20 calf raises. Rest 30s." },
      { day: "Friday", type: "steps", title: "Exploration Walk", duration: "45 min", detail: "Your longest walk! New area, trail, long park loop. 10,000 steps — you can do this now!", stepGoal: 10000 },
      { day: "Saturday", type: "strength", title: "Full Body Power", duration: "20 min", detail: "5 rounds: 15 squats, 12 pushups, 10 lunges each, 15 bridges, 40s plank. You are STRONG." },
      { day: "Sunday", type: "rest", title: "Recovery", duration: "20 min", detail: "Yoga, stretching, or total rest. Celebrate how far you've come." },
    ],
    nutrition: ["Whole foods, proper portions, consistent timing", "Protein-forward at every meal", "Minimal processed food", "Water 3L", "Sleep 7-8 hours — crucial for recovery and hormones"],
  },
];

const CYCLE_PHASES = [
  { name: "Menstrual", days: "Day 1–5", color: "#e11d48", exercise: "Gentle movement only — slow walks, light stretching, or rest. Your body is working hard. Honour it. Skip strength if energy is low.", nutrition: "Iron-rich foods (spinach, lentils, dates, red meat). Warm, comforting meals. Stay extra hydrated. Dark chocolate is fine." },
  { name: "Follicular", days: "Day 6–13", color: "#8b5cf6", exercise: "Energy is building! Best time for strength sessions. Push a bit harder on walks. Your body responds really well to exercise right now.", nutrition: "Light, fresh foods. Salads, fermented foods, lean protein. Metabolism is efficient — eat clean and your body rewards you." },
  { name: "Ovulation", days: "Day 14–16", color: "#f59e0b", exercise: "Peak energy! Go for longest walks, push strength sessions. You'll surprise yourself with what you can do now.", nutrition: "Anti-inflammatory foods. Fiber-rich vegetables, lighter carbs, lots of water. You might feel less hungry — normal." },
  { name: "Luteal", days: "Day 17–28", color: "#14b8a6", exercise: "Early (17–21): Still good energy, keep routine. Late (22–28): Dial back. Gentle walks, yoga, stretching. Don't fight your body.", nutrition: "Complex carbs — sweet potato, oats, brown rice. Cravings are hormonal and normal. Magnesium foods (nuts, seeds, bananas) help. Avoid excess salt." },
];

// ─── FIZZY DRINK SYSTEM ───────────────────────────────────────────────────────
const FIZZY_ALLOWANCE = [3, 2, 1, 0]; // per phase
const FIZZY_DRINKS = [
  { id: "diet-coke", name: "Diet Coke", emoji: "🥤", color: "#dc2626" },
  { id: "redbull", name: "Red Bull", emoji: "⚡", color: "#1d4ed8" },
  { id: "paper-boat", name: "Paper Boat Peach", emoji: "🍑", color: "#f97316" },
];
const FIZZY_MSGS = [
  { max: 3, msg: "3 this week — pick your best moments to enjoy them!" },
  { max: 2, msg: "Down to 2 this week. Make them count! 🙌" },
  { max: 1, msg: "1 special treat this week. You've come so far! 🌟" },
  { max: 0, msg: "No fizzy this phase — you've officially kicked it! 👑" },
];
const FIZZY_EMPTY_MSGS = [
  "All used up this week! Try nimbu pani, sparkling water, or green tea 💚",
  "Budget spent! You made it through — fresh start next week 💪",
  "None left but you've got this. How about a masala chai instead? ☕",
];

const MILESTONES_NISHANT = [
  { kg: 97, label: "First 3kg Down!", emoji: "🔥" },
  { kg: 95, label: "5kg Gone!", emoji: "💪" },
  { kg: 90, label: "10kg Milestone!", emoji: "⭐" },
  { kg: 85, label: "Wedding Weight!", emoji: "🏆" },
  { kg: 80, label: "20kg Transformed!", emoji: "🚀" },
  { kg: 78, label: "Goal Reached!", emoji: "👑" },
];

// ─── CRAVINGS TOOLKIT ────────────────────────────────────────────────────────
const CRAVING_TRIGGERS = [
  {
    id: "post-meal",
    label: "Post-Meal Sweet",
    time: "After meals",
    emoji: "🍫",
    color: "#a78bfa",
    swaps: [
      ["Medjool date", "70%+ dark chocolate square", "Spoon of peanut butter", "Brush teeth after eating"],
      ["Medjool date", "Dark chocolate square", "Small fruit"],
      ["Small fruit", "Herbal tea", "Brush teeth right after"],
      ["Herbal tea", "Wait 10 min — it passes"],
    ],
    tip: "Meals with enough protein & fat reduce the spike/crash cycle. Cravings pass in ~10 min if you give them something small.",
  },
  {
    id: "afternoon",
    label: "4–5pm Snack Attack",
    time: "4–5pm",
    emoji: "⏰",
    color: "#f59e0b",
    swaps: [
      ["Roasted makhana", "Handful of almonds", "Fruit with peanut butter", "Greek yogurt"],
      ["Greek yogurt", "Protein shake", "Handful of nuts"],
      ["Handful of nuts", "Black coffee", "Small fruit"],
      ["Planned mini-meal", "Green tea"],
    ],
    tip: "Usually means lunch lacked protein. A planned 4pm snack is smart — stops you overeating at dinner. Pre-portion on Sunday.",
  },
  {
    id: "match-night",
    label: "Arsenal Night",
    time: "1:30am",
    emoji: "⚽",
    color: "#ef4444",
    swaps: [
      ["Air-fried chicken strips", "Roasted chana", "Nuts + cucumber chaat masala"],
      ["Chicken strips", "Cucumber chaat masala", "Roasted makhana"],
      ["Protein shake", "Small nut box", "Cucumber sticks"],
      ["Pre-made protein snack box", "Green tea"],
    ],
    tip: "Prep match snacks BEFORE dinner. The worst move is ordering food at 1am — that's where the real damage happens.",
  },
];

// ─── ARSENAL MATCH DATA (football-data.org free tier) ─────────────────────────
const ARSENAL_API_KEY = "f71377d63a934283a340d8ada7aed410";
const ARSENAL_TEAM_ID = 57;
const MATCH_CACHE_KEY = "rf2-arsenal-matches";
const MATCH_CACHE_MS = 12 * 60 * 60 * 1000; // refresh every 12h

const fetchArsenalMatches = async () => {
  try {
    const cached = localStorage.getItem(MATCH_CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < MATCH_CACHE_MS) return data;
    }
    const res = await fetch(
      `https://api.football-data.org/v4/teams/${ARSENAL_TEAM_ID}/matches?status=SCHEDULED&limit=10`,
      { headers: { "X-Auth-Token": ARSENAL_API_KEY } }
    );
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    const matches = (json.matches || []).map(m => ({
      utcDate: m.utcDate,
      home: m.homeTeam?.shortName || m.homeTeam?.name || "Home",
      away: m.awayTeam?.shortName || m.awayTeam?.name || "Away",
      competition: m.competition?.name || "",
      isHome: m.homeTeam?.id === ARSENAL_TEAM_ID,
    }));
    localStorage.setItem(MATCH_CACHE_KEY, JSON.stringify({ data: matches, ts: Date.now() }));
    return matches;
  } catch (e) {
    // Return stale cache if available, otherwise null
    try { const c = localStorage.getItem(MATCH_CACHE_KEY); if (c) return JSON.parse(c).data; } catch (_) {}
    return null;
  }
};

// Match within next 20h = show prep card (covers afternoon → 1:30am window)
const getNextMatchSoon = (matches) => {
  if (!matches) return null;
  const now = Date.now();
  const cutoff = now + 20 * 60 * 60 * 1000;
  for (const m of matches) {
    const t = new Date(m.utcDate).getTime();
    if (t >= now && t <= cutoff) return m;
  }
  return null;
};

// Next upcoming match regardless of when
const getUpcomingMatch = (matches) => {
  if (!matches) return null;
  const now = Date.now();
  for (const m of matches) {
    if (new Date(m.utcDate).getTime() >= now) return m;
  }
  return null;
};

// Format UTC date to IST time string (e.g. "Fri 1:30am")
const formatMatchTimeIST = (utcDate) => {
  const d = new Date(utcDate);
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", minute: "2-digit", hour12: true });
};

const QUOTES = [
  "The best time to start was yesterday. The second best time is now.",
  "You don't have to be extreme, just consistent.",
  "It's not about being the best. It's about being better than yesterday.",
  "Discipline is choosing between what you want now and what you want most.",
  "Small daily improvements lead to staggering long-term results.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "Fall in love with taking care of yourself.",
  "The only bad workout is the one that didn't happen.",
  "Don't count the days. Make the days count.",
  "Motivation gets you started. Habit keeps you going.",
  "The comeback is always stronger than the setback.",
  "Trust the process. Results will come.",
];

const QUOTES_PARTNER = [
  "Strong women lift each other up — start by lifting yourself.",
  "You don't need to be perfect. You just need to start.",
  "Every step counts. Literally.",
  "Your body is not a punishment. Movement is a celebration.",
  "Progress, not perfection.",
  "5 minutes of movement beats 0 minutes of planning.",
  "Strength isn't about how much you lift. It's about showing up.",
  "Take care of your body. It's the only place you have to live.",
  "She believed she could, so she did.",
  "Slow progress is still progress.",
  "Rest is not quitting. It's preparing to go again.",
  "You are doing this for future you. She'll thank you.",
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getToday = () => new Date().toISOString().split("T")[0];
const getDayName = () => ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][new Date().getDay()];
const formatDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const getWeekNumber = (s) => { if (!s) return 1; const diff = new Date() - new Date(s); if (diff < 0) return 0; return Math.max(1, Math.ceil(diff / (7 * 24 * 60 * 60 * 1000))); };
const getPhaseIdx = (s) => { const w = getWeekNumber(s); if (w <= 4) return 0; if (w <= 8) return 1; if (w <= 12) return 2; return 3; };
const getCycleDay = (lp) => { if (!lp) return null; return (Math.floor((new Date() - new Date(lp)) / (24 * 60 * 60 * 1000)) % 28) + 1; };
const getCyclePhaseIdx = (cd) => { if (!cd) return 0; if (cd <= 5) return 0; if (cd <= 13) return 1; if (cd <= 16) return 2; return 3; };

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function Reforge() {
  const [loaded, setLoaded] = useState(false);
  const [activeUser, setActiveUser] = useState("nishant");
  const [activeTab, setActiveTab] = useState("today");
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [weightInput, setWeightInput] = useState("");
  const [showCycleModal, setShowCycleModal] = useState(false);
  const [cycleDate, setCycleDate] = useState("");
  const [animIn, setAnimIn] = useState(true);
  const [celebration, setCelebration] = useState(null);
  const [phaseDetail, setPhaseDetail] = useState(null);
  const [partnerName, setPartnerName] = useState("Mrunali");
  const [setupName, setSetupName] = useState("");
  const [setupStartWeight, setSetupStartWeight] = useState("");
  const [setupTargetWeight, setSetupTargetWeight] = useState("");
  const [startDateInput, setStartDateInput] = useState("");

  const [nData, setNData] = useState({ startDate: null, startWeight: 103.2, targetWeight: 78, weightLog: [], checkins: {}, streak: 0, bestStreak: 0, cravingsHandled: {}, matchNightPrepped: {} });
  const [pData, setPData] = useState({ startDate: null, startWeight: null, targetWeight: null, weightLog: [], checkins: {}, streak: 0, bestStreak: 0, lastPeriod: null, fizzyLog: [] });

  const [showFizzyModal, setShowFizzyModal] = useState(false);
  const [arsenalMatches, setArsenalMatches] = useState(null);

  const isP = activeUser === "partner";
  const data = isP ? pData : nData;
  const setData = isP ? setPData : setNData;
  const phases = isP ? PHASES_PARTNER : PHASES_NISHANT;
  const quotes = isP ? QUOTES_PARTNER : QUOTES;

  // Persistence via localStorage
  useEffect(() => {
    try { const r = localStorage.getItem("rf2-n"); if (r) setNData(JSON.parse(r)); } catch (e) { }
    try { const r = localStorage.getItem("rf2-p"); if (r) setPData(JSON.parse(r)); } catch (e) { }
    try { const r = localStorage.getItem("rf2-pn"); if (r) setPartnerName(r); } catch (e) { }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) try { localStorage.setItem("rf2-n", JSON.stringify(nData)) } catch (e) { } }, [nData, loaded]);
  useEffect(() => { if (loaded) try { localStorage.setItem("rf2-p", JSON.stringify(pData)) } catch (e) { } }, [pData, loaded]);
  useEffect(() => { if (loaded) try { localStorage.setItem("rf2-pn", partnerName) } catch (e) { } }, [partnerName, loaded]);

  // Fetch Arsenal fixtures (Nishant only, on load)
  useEffect(() => {
    if (loaded) fetchArsenalMatches().then(m => { if (m) setArsenalMatches(m); });
  }, [loaded]);

  // Derived
  const today = getToday();
  const dayName = getDayName();
  const weekNum = getWeekNumber(data.startDate);
  const phIdx = getPhaseIdx(data.startDate);
  const phase = phases[phIdx];
  const todayPlan = phase?.weeklyPlan.find(d => d.day === dayName);
  const ci = data.checkins[today] || { exercise: false, nutrition: false, water: false, steps: false };
  const latestW = data.weightLog.length > 0 ? data.weightLog[data.weightLog.length - 1].weight : data.startWeight;
  const lost = data.startWeight ? Math.max(0, data.startWeight - (latestW || data.startWeight)).toFixed(1) : 0;
  const pct = data.startWeight && data.targetWeight ? Math.min(100, Math.max(0, ((data.startWeight - latestW) / (data.startWeight - data.targetWeight)) * 100)).toFixed(0) : 0;
  const quote = quotes[Math.floor((new Date().getDate() + new Date().getMonth()) % quotes.length)];
  const cDay = isP ? getCycleDay(pData.lastPeriod) : null;
  const cPhIdx = getCyclePhaseIdx(cDay);
  const cPh = CYCLE_PHASES[cPhIdx];
  const nextM = !isP ? MILESTONES_NISHANT.find(m => latestW > m.kg) : null;
  const toM = nextM ? (latestW - nextM.kg).toFixed(1) : 0;
  const hasSteps = isP && todayPlan?.type === "steps";
  const ckKeys = hasSteps ? ["exercise", "steps", "nutrition", "water"] : ["exercise", "nutrition", "water"];

  // Cravings derived
  const todayCravingsHandled = (!isP && nData.cravingsHandled) ? (nData.cravingsHandled[today] || []) : [];
  const totalCravingsHandled = (!isP && nData.cravingsHandled) ? Object.values(nData.cravingsHandled).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0) : 0;
  const matchNightPreppedToday = !isP && nData.matchNightPrepped ? !!nData.matchNightPrepped[today] : false;
  const arsenalSoon = !isP ? getNextMatchSoon(arsenalMatches) : null;
  const arsenalNext = !isP ? getUpcomingMatch(arsenalMatches) : null;
  const showMatchNightCard = !isP && (arsenalSoon !== null || matchNightPreppedToday);

  // Fizzy drink tracking
  const fizzyMax = isP ? FIZZY_ALLOWANCE[phIdx] || 1 : 0;
  const getWeekStart = () => { const d = new Date(); d.setDate(d.getDate() - d.getDay()); d.setHours(0, 0, 0, 0); return d; };
  const weekStart = getWeekStart();
  const fizzyThisWeek = (pData.fizzyLog || []).filter(e => new Date(e.date) >= weekStart);
  const fizzyRemaining = Math.max(0, fizzyMax - fizzyThisWeek.length);
  const fizzyMsg = fizzyRemaining > 0 ? (FIZZY_MSGS.find(m => m.max === fizzyMax)?.msg || FIZZY_MSGS[0].msg) : FIZZY_EMPTY_MSGS[Math.floor(Math.random() * FIZZY_EMPTY_MSGS.length)];

  // Actions
  const toggleCi = (key) => {
    const nc = { ...ci, [key]: !ci[key] };
    const ncs = { ...data.checkins, [today]: nc };
    const allOk = (c) => c && c.exercise && c.nutrition && c.water;
    let s = 0;
    if (allOk(nc)) { s = 1; let d = new Date(); d.setDate(d.getDate() - 1); while (allOk(ncs[d.toISOString().split("T")[0]])) { s++; d.setDate(d.getDate() - 1); } }
    else { let d = new Date(); d.setDate(d.getDate() - 1); while (allOk(ncs[d.toISOString().split("T")[0]])) { s++; d.setDate(d.getDate() - 1); } }
    setData(p => ({ ...p, checkins: ncs, streak: s, bestStreak: Math.max(p.bestStreak, s) }));
    if (allOk(nc) && (hasSteps ? nc.steps : true)) { setCelebration("All done! 🔥"); setTimeout(() => setCelebration(null), 2500); }
  };

  const logW = () => {
    const w = parseFloat(weightInput);
    if (isNaN(w) || w < 30 || w > 250) return;
    const ex = data.weightLog.findIndex(e => e.date === today);
    let nl; if (ex >= 0) { nl = [...data.weightLog]; nl[ex] = { date: today, weight: w }; } else nl = [...data.weightLog, { date: today, weight: w }];
    if (!isP) { const ms = MILESTONES_NISHANT.find(m => latestW > m.kg && w <= m.kg); if (ms) { setCelebration(`${ms.emoji} ${ms.label}`); setTimeout(() => setCelebration(null), 3500); } }
    setData(p => ({ ...p, weightLog: nl })); setWeightInput(""); setShowWeightModal(false);
  };

  const logPeriod = (d) => { setPData(p => ({ ...p, lastPeriod: d || today })); setShowCycleModal(false); setCycleDate(""); };

  const logFizzy = (drinkId) => {
    if (fizzyRemaining <= 0) return;
    const drink = FIZZY_DRINKS.find(d => d.id === drinkId);
    setPData(p => ({ ...p, fizzyLog: [...(p.fizzyLog || []), { date: today, drink: drinkId, name: drink?.name }] }));
    setShowFizzyModal(false);
    if (fizzyRemaining === 1) {
      setCelebration("Last one this week! You're doing great 💪");
      setTimeout(() => setCelebration(null), 2500);
    }
  };

  // Cravings actions
  const toggleCraving = (triggerId) => {
    if (isP) return;
    const handled = nData.cravingsHandled || {};
    const todayHandled = handled[today] || [];
    const alreadyHandled = todayHandled.includes(triggerId);
    const updated = alreadyHandled ? todayHandled.filter(id => id !== triggerId) : [...todayHandled, triggerId];
    setNData(p => ({ ...p, cravingsHandled: { ...(p.cravingsHandled || {}), [today]: updated } }));
    if (!alreadyHandled) { setCelebration("Craving handled! 💪"); setTimeout(() => setCelebration(null), 2000); }
  };

  const toggleMatchPrep = () => {
    if (isP) return;
    const isPrepped = (nData.matchNightPrepped || {})[today];
    setNData(p => ({ ...p, matchNightPrepped: { ...(p.matchNightPrepped || {}), [today]: !isPrepped } }));
    if (!isPrepped) { setCelebration("Match snacks prepped! ⚽"); setTimeout(() => setCelebration(null), 2000); }
  };

  const switchU = (u) => { setAnimIn(false); setTimeout(() => { setActiveUser(u); setActiveTab("today"); setAnimIn(true); }, 200); };
  const resetD = () => { if (confirm("Reset all data? Cannot be undone.")) { if (!isP) setNData({ startDate: null, startWeight: 103.2, targetWeight: 78, weightLog: [], checkins: {}, streak: 0, bestStreak: 0, cravingsHandled: {}, matchNightPrepped: {} }); else setPData({ startDate: null, startWeight: null, targetWeight: null, weightLog: [], checkins: {}, streak: 0, bestStreak: 0, lastPeriod: null, fizzyLog: [] }); } };

  // Theme
  const A = isP ? { p: "#e879a8", s: "#c084fc", g: "rgba(232,121,168,0.1)", gr: "linear-gradient(135deg,#e879a8,#c084fc)" } : { p: "#f59e0b", s: "#f97316", g: "rgba(245,158,11,0.1)", gr: "linear-gradient(135deg,#f59e0b,#f97316)" };
  const TC = { walk: "#3b82f6", steps: "#6366f1", strength: "#f59e0b", cardio: "#ef4444", rest: "#10b981", gentle: "#a78bfa" };

  const TIcon = ({ type, sz = 18 }) => {
    const c = TC[type] || "#666";
    if (type === "steps") return <Footprints size={sz} color={c} />;
    if (type === "gentle") return <Wind size={sz} color={c} />;
    if (type === "walk" || type === "cardio") return <Activity size={sz} color={c} />;
    if (type === "strength") return <Dumbbell size={sz} color={c} />;
    return <Coffee size={sz} color={c} />;
  };

  // Shared styles
  const card = { background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", borderRadius: 16, padding: 20, marginTop: 16, border: "1px solid rgba(255,255,255,0.05)" };
  const cardG = { ...card, background: `linear-gradient(135deg,rgba(255,255,255,0.03),${A.g})`, border: `1px solid ${A.p}20` };
  const lbl = { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.2px", color: "#555", marginBottom: 8 };
  const tag = (c) => ({ display: "inline-block", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: `${c}18`, color: c, letterSpacing: "0.3px" });
  const inp = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 16px", fontSize: 16, color: "#fff", width: "100%", fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
  const btn = { background: A.gr, color: "#0a0c13", border: "none", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit" };
  const btnO = { background: "transparent", color: A.p, border: `1.5px solid ${A.p}33`, borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" };

  // ─── ONBOARDING ───────────────────────────────────────────────────────────
  if (!data.startDate) return (
    <div style={{ minHeight: "100vh", background: "#0a0c13", color: "#e2e4ea", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle,${A.g} 0%,transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "3px", color: A.p, marginBottom: 20 }}>REFORGE</div>
        <h1 style={{ fontSize: 34, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", marginBottom: 12, lineHeight: 1.2, letterSpacing: "-1px" }}>
          {isP ? `${partnerName === "Mrunali" ? "Mrunali's" : `${partnerName}'s`} journey starts here.` : "Time to rebuild."}
        </h1>
        <p style={{ fontSize: 15, color: "#777", lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>
          {isP ? "No intense workouts. No overwhelm. Steps you already love, with gentle strength woven in. Your cycle guiding the way." : "No noise. No overwhelm. Just a clear plan, one day at a time."}
        </p>
        {isP && (
          <div style={{ width: "100%", maxWidth: 320, marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ ...lbl, textAlign: "left" }}>Name</div>
              <input style={inp} type="text" value={setupName || (partnerName === "Mrunali" ? "Mrunali" : partnerName)} onChange={e => setSetupName(e.target.value)} placeholder="Enter name" />
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ ...lbl, textAlign: "left" }}>Current kg</div>
                <input style={inp} type="number" step="0.1" placeholder="e.g. 70" value={setupStartWeight} onChange={e => setSetupStartWeight(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ ...lbl, textAlign: "left" }}>Target kg</div>
                <input style={inp} type="number" step="0.1" placeholder="e.g. 58" value={setupTargetWeight} onChange={e => setSetupTargetWeight(e.target.value)} />
              </div>
            </div>
          </div>
        )}
        <div style={{ width: "100%", maxWidth: 320, marginBottom: 20 }}>
          <div style={{ ...lbl, textAlign: "left" }}>Start Date</div>
          <input style={{ ...inp, colorScheme: "dark" }} type="date" value={startDateInput || today} onChange={e => setStartDateInput(e.target.value)} />
          <p style={{ fontSize: 11, color: "#555", marginTop: 6, textAlign: "left" }}>Set to tomorrow if you want to start fresh</p>
        </div>
        <button style={{ ...btn, maxWidth: 320 }} onClick={() => {
          if (isP && setupName.trim()) setPartnerName(setupName.trim());
          if (isP) {
            const sw = parseFloat(setupStartWeight) || null;
            const tw = parseFloat(setupTargetWeight) || null;
            setPData(p => ({ ...p, startWeight: sw || p.startWeight, targetWeight: tw || p.targetWeight, startDate: startDateInput || today }));
            setSetupStartWeight(""); setSetupTargetWeight("");
          } else {
            setData(p => ({ ...p, startDate: startDateInput || today }));
          }
          setStartDateInput("");
        }}>
          Begin the Journey <ArrowRight size={16} style={{ marginLeft: 6, verticalAlign: "middle" }} />
        </button>
        <div style={{ marginTop: 40, display: "flex", gap: 3, background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: 3 }}>
          <button style={{ padding: "6px 14px", borderRadius: 17, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: !isP ? A.p : "transparent", color: !isP ? "#0a0c13" : "#777", fontFamily: "inherit" }} onClick={() => switchU("nishant")}>Nishant</button>
          <button style={{ padding: "6px 14px", borderRadius: 17, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: isP ? A.p : "transparent", color: isP ? "#0a0c13" : "#777", fontFamily: "inherit" }} onClick={() => switchU("partner")}>{partnerName}</button>
        </div>
      </div>
      <style>{`body{margin:0;background:#0a0c13}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}@keyframes cp{0%{transform:translate(-50%,-50%) scale(.7);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}`}</style>
    </div>
  );

  // ─── TODAY ────────────────────────────────────────────────────────────────
  const startDateObj = data.startDate ? new Date(data.startDate) : null;
  const todayObj = new Date(today);
  const notStartedYet = startDateObj && todayObj < startDateObj;
  const daysUntilStart = notStartedYet ? Math.ceil((startDateObj - todayObj) / (24 * 60 * 60 * 1000)) : 0;

  const Today = () => (
    <>
      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 14, color: "#555", margin: 0 }}>{notStartedYet ? `Starts ${daysUntilStart === 1 ? "tomorrow" : `in ${daysUntilStart} days`}` : `Week ${weekNum} · ${dayName}`}</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: "4px 0 0", letterSpacing: "-0.5px" }}>{isP ? `Hey ${partnerName}` : "Hey Nishant"} {isP ? "✨" : "👊"}</h1>
      </div>

      {notStartedYet ? (
        <>
          <div style={{ ...cardG, textAlign: "center", padding: 30 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔥</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px", fontFamily: "'Outfit',sans-serif" }}>Ready to go!</h2>
            <p style={{ fontSize: 14, color: "#999", margin: 0, lineHeight: 1.7 }}>
              Your journey begins on <strong style={{ color: A.p }}>{new Date(data.startDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</strong>.
              Get a good sleep tonight. Lay out your workout clothes. You've got this.
            </p>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={lbl}>YOUR FIRST WEEK PREVIEW</div>
            {phase.weeklyPlan.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: `${TC[d.type] || "#666"}08`, borderRadius: 14, border: `1px solid ${TC[d.type] || "#666"}12`, marginTop: 8 }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${TC[d.type]}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><TIcon type={d.type} sz={16} /></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{d.day}</span><span style={{ fontSize: 12, color: "#555" }}>{d.duration}</span></div>
                  <div style={{ fontSize: 12, color: "#777", marginTop: 2 }}>{d.title}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div style={{ marginTop: 16, padding: "16px 18px", background: `${A.p}08`, borderRadius: 14, borderLeft: `3px solid ${A.p}33` }}>
            <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>"{quote}"</p>
          </div>

          {/* Stats */}
          <div style={{ ...card, display: "flex", gap: 8, padding: "18px 12px" }}>
            {[{ v: latestW || "—", l: "Current kg" }, { v: lost > 0 ? `-${lost}` : "0", l: "kg lost", c: lost > 0 ? "#10b981" : "#fff" }, { v: data.streak, l: "day streak", c: A.p }].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div style={{ width: 1, background: "rgba(255,255,255,0.05)" }} />}
                <div style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: s.c || "#fff", letterSpacing: "-1px" }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{s.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>

          {/* Cycle Phase */}
          {isP && pData.lastPeriod && (
            <div style={{ ...cardG, borderColor: `${cPh.color}30`, background: `${cPh.color}08` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={tag(cPh.color)}>{cPh.name} Phase</span>
                  <p style={{ fontSize: 13, color: "#777", marginTop: 8, marginBottom: 0 }}>Cycle Day {cDay} · {cPh.days}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: `${cPh.color}12`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cPhIdx === 0 ? <Droplets size={20} color={cPh.color} /> : cPhIdx === 1 ? <Zap size={20} color={cPh.color} /> : cPhIdx === 2 ? <Sun size={20} color={cPh.color} /> : <Moon size={20} color={cPh.color} />}
                </div>
              </div>
              <div style={{ marginTop: 14, padding: "12px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 10 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: cPh.color, margin: "0 0 4px" }}>Today's guidance</p>
                <p style={{ fontSize: 13, color: "#aaa", margin: 0, lineHeight: 1.6 }}>{cPh.exercise}</p>
              </div>
            </div>
          )}

          {isP && !pData.lastPeriod && (
            <div style={card}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#ddd", margin: "0 0 8px" }}>Track your cycle</p>
              <p style={{ fontSize: 13, color: "#777", marginBottom: 16, lineHeight: 1.6 }}>Log your last period start for phase-aware exercise and nutrition guidance.</p>
              <button style={{ ...btnO, color: "#e879a8", borderColor: "#e879a833" }} onClick={() => setShowCycleModal(true)}>
                <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} /> Log Period Start
              </button>
            </div>
          )}

          {/* Today's Plan */}
          <div style={{ marginTop: 20 }}>
            <div style={lbl}>TODAY'S PLAN</div>
            {todayPlan ? (
              <div style={cardG}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${TC[todayPlan.type]}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><TIcon type={todayPlan.type} sz={20} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{todayPlan.title}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={tag(TC[todayPlan.type])}>{todayPlan.type}</span>
                      <span style={{ fontSize: 12, color: "#666" }}><Clock size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />{todayPlan.duration}</span>
                      {todayPlan.stepGoal && <span style={{ fontSize: 12, color: "#6366f1" }}><Footprints size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />{todayPlan.stepGoal.toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#bbb", margin: 0, lineHeight: 1.7, padding: "12px 14px", background: "rgba(0,0,0,0.15)", borderRadius: 10 }}>{todayPlan.detail}</p>
                {isP && pData.lastPeriod && cPhIdx === 0 && todayPlan.type === "strength" && (
                  <div style={{ marginTop: 10, padding: "10px 14px", background: `${cPh.color}0c`, borderRadius: 10, border: `1px solid ${cPh.color}20` }}>
                    <p style={{ fontSize: 12, color: cPh.color, margin: 0 }}>💡 You're on your period — it's ok to skip this and do a gentle walk instead.</p>
                  </div>
                )}
                {isP && pData.lastPeriod && (cPhIdx === 1 || cPhIdx === 2) && todayPlan.type !== "rest" && (
                  <div style={{ marginTop: 10, padding: "10px 14px", background: `${cPh.color}0c`, borderRadius: 10, border: `1px solid ${cPh.color}20` }}>
                    <p style={{ fontSize: 12, color: cPh.color, margin: 0 }}>⚡ {cPh.name} phase — energy is high! Push a bit harder today.</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={card}><p style={{ fontSize: 15, fontWeight: 600, color: "#10b981", margin: 0 }}>Rest Day 🧘</p><p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>Recovery is progress. Stretch, hydrate, rest.</p></div>
            )}
          </div>

          {/* Checklist */}
          <div style={{ marginTop: 20 }}>
            <div style={lbl}>DAILY CHECKLIST · {ckKeys.filter(k => ci[k]).length}/{ckKeys.length}</div>
            {[
              { k: "exercise", t: isP ? "Movement Done" : "Exercise Done", d: isP ? "Completed today's activity" : "Completed today's workout" },
              ...(hasSteps ? [{ k: "steps", t: "Step Goal Hit", d: `Reached ${todayPlan?.stepGoal?.toLocaleString()} steps` }] : []),
              { k: "nutrition", t: "Nutrition on Track", d: "Followed today's guidelines" },
              { k: "water", t: "Water Goal", d: `${isP ? "2L+" : "2.5L+"} of water today` },
            ].map(({ k, t, d }) => (
              <div key={k} onClick={() => toggleCi(k)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: ci[k] ? `${A.p}0d` : "rgba(255,255,255,0.015)", borderRadius: 12, cursor: "pointer", border: `1px solid ${ci[k] ? A.p + "30" : "rgba(255,255,255,0.04)"}`, marginTop: 8, transition: "all 0.2s" }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, border: `2px solid ${ci[k] ? A.p : "#3a3a3a"}`, background: ci[k] ? A.p : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {ci[k] && <Check size={14} color="#0a0c13" strokeWidth={3} />}
                </div>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{t}</div><div style={{ fontSize: 12, color: "#666" }}>{d}</div></div>
              </div>
            ))}
          </div>

          {/* Cravings Toolkit (Nishant only) */}
          {!isP && data.startDate && !notStartedYet && (
            <div style={{ marginTop: 20 }}>
              <div style={lbl}>CRAVINGS TOOLKIT · {totalCravingsHandled} handled</div>

              {/* Match Night Prep Card */}
              {showMatchNightCard && !matchNightPreppedToday && (
                <div style={{ ...card, marginTop: 0, borderColor: "#ef444425", background: "linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.02))" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>⚽</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>Match Night Prep</div>
                      {arsenalSoon ? (
                        <div style={{ fontSize: 12, color: "#ef4444", marginTop: 2 }}>
                          {arsenalSoon.isHome ? `Arsenal vs ${arsenalSoon.away}` : `${arsenalSoon.home} vs Arsenal`} — {formatMatchTimeIST(arsenalSoon.utcDate)}
                          {arsenalSoon.competition ? <span style={{ color: "#888" }}> · {arsenalSoon.competition}</span> : null}
                        </div>
                      ) : (
                        <div style={{ fontSize: 12, color: "#888" }}>Prep your match snacks before dinner!</div>
                      )}
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px", background: "rgba(0,0,0,0.2)", borderRadius: 10, marginBottom: 12 }}>
                    <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.7 }}>
                      Before dinner, get these ready: {(CRAVING_TRIGGERS[2].swaps[phIdx] || CRAVING_TRIGGERS[2].swaps[3]).join(", ")}
                    </p>
                  </div>
                  <button onClick={toggleMatchPrep} style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                    I've prepped my match snacks
                  </button>
                </div>
              )}
              {showMatchNightCard && matchNightPreppedToday && (
                <div style={{ ...card, marginTop: 0, borderColor: "#10b98125", background: "rgba(16,185,129,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>⚽</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#10b981" }}>Match snacks prepped!</div>
                      <div style={{ fontSize: 12, color: "#666" }}>{arsenalSoon ? `${arsenalSoon.isHome ? `Arsenal vs ${arsenalSoon.away}` : `${arsenalSoon.home} vs Arsenal`} — enjoy the game!` : "No 1am Zomato tonight. You've got this."}</div>
                    </div>
                    <Check size={18} color="#10b981" />
                  </div>
                </div>
              )}

              {/* Craving Trigger Cards */}
              {CRAVING_TRIGGERS.map(trigger => {
                const handled = todayCravingsHandled.includes(trigger.id);
                const swaps = trigger.swaps[phIdx] || trigger.swaps[3];
                return (
                  <div key={trigger.id} style={{ ...card, borderColor: handled ? `${trigger.color}25` : "rgba(255,255,255,0.05)", background: handled ? `${trigger.color}06` : "rgba(255,255,255,0.03)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{trigger.emoji}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{trigger.label}</div>
                          <div style={{ fontSize: 11, color: "#666" }}>
                            {trigger.id === "match-night" && arsenalNext
                              ? `Next: ${arsenalNext.isHome ? `vs ${arsenalNext.away}` : `at ${arsenalNext.home}`} · ${formatMatchTimeIST(arsenalNext.utcDate)}`
                              : trigger.time}
                          </div>
                        </div>
                      </div>
                      {handled && <span style={tag("#10b981")}>handled</span>}
                    </div>
                    <div style={{ padding: "10px 14px", background: "rgba(0,0,0,0.15)", borderRadius: 10, marginBottom: 10 }}>
                      <p style={{ fontSize: 12, color: "#777", margin: "0 0 6px", fontWeight: 600 }}>Smart swaps (Phase {phIdx + 1})</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {swaps.map((swap, i) => (
                          <span key={i} style={{ fontSize: 12, color: "#bbb", padding: "4px 10px", background: `${trigger.color}10`, borderRadius: 8, border: `1px solid ${trigger.color}15` }}>{swap}</span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
                      <Star size={12} color={trigger.color} style={{ marginTop: 2, flexShrink: 0 }} />
                      <p style={{ fontSize: 12, color: "#777", margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>{trigger.tip}</p>
                    </div>
                    <button
                      onClick={() => toggleCraving(trigger.id)}
                      style={{
                        background: handled ? `${trigger.color}10` : "rgba(255,255,255,0.05)",
                        color: handled ? trigger.color : "#ddd",
                        border: `1px solid ${handled ? `${trigger.color}30` : "rgba(255,255,255,0.08)"}`,
                        borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600,
                        cursor: "pointer", width: "100%", fontFamily: "inherit", transition: "all 0.2s",
                      }}
                    >
                      {handled ? "Handled — nice work!" : "Mark as handled"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Fizzy Drink Budget (Mrunali only) */}
          {isP && data.startDate && (
            <div style={{ marginTop: 20 }}>
              <div style={lbl}>FIZZY DRINK BUDGET · {fizzyRemaining}/{fizzyMax} left</div>
              <div style={{ ...card, border: `1px solid ${fizzyRemaining > 0 ? "rgba(255,255,255,0.05)" : "#ef444422"}` }}>
                {/* Bubble indicators */}
                <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                  {Array.from({ length: fizzyMax }).map((_, i) => {
                    const used = i < fizzyThisWeek.length;
                    const drink = used ? FIZZY_DRINKS.find(d => d.id === fizzyThisWeek[i]?.drink) : null;
                    return (
                      <div key={i} style={{ width: 38, height: 38, borderRadius: 12, background: used ? `${drink?.color || "#666"}20` : "rgba(255,255,255,0.04)", border: `1.5px solid ${used ? `${drink?.color || "#666"}40` : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, opacity: used ? 0.6 : 1, transition: "all 0.2s" }}>
                        {used ? drink?.emoji || "🥤" : <span style={{ fontSize: 18, opacity: 0.3 }}>🫧</span>}
                      </div>
                    );
                  })}
                </div>
                {/* This week's log */}
                {fizzyThisWeek.length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    {fizzyThisWeek.map((e, i) => {
                      const drink = FIZZY_DRINKS.find(d => d.id === e.drink);
                      return (
                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginTop: i > 0 ? 6 : 0 }}>
                          <span style={{ fontSize: 13 }}>{drink?.emoji}</span>
                          <span style={{ fontSize: 12, color: "#888" }}>{drink?.name}</span>
                          <span style={{ fontSize: 11, color: "#555", marginLeft: "auto" }}>{formatDate(e.date)}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
                {/* Message */}
                <p style={{ fontSize: 12, color: fizzyRemaining > 0 ? "#888" : "#ef4444", margin: "0 0 14px", lineHeight: 1.5, fontStyle: "italic" }}>{fizzyMsg}</p>
                {/* Log button */}
                <button
                  style={{ background: fizzyRemaining > 0 ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)", color: fizzyRemaining > 0 ? "#ddd" : "#444", border: `1px solid ${fizzyRemaining > 0 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: fizzyRemaining > 0 ? "pointer" : "default", width: "100%", fontFamily: "inherit", transition: "all 0.2s" }}
                  onClick={() => fizzyRemaining > 0 && setShowFizzyModal(true)}
                >
                  {fizzyRemaining > 0 ? `🫧 Log a Fizzy Drink (${fizzyRemaining} left)` : "✅ Budget used — great discipline!"}
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button style={{ ...btnO, flex: 1 }} onClick={() => { setShowWeightModal(true); setWeightInput(String(latestW || "")); }}><TrendingDown size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Log Weight</button>
            {isP && <button style={{ ...btnO, flex: 1, color: "#e879a8", borderColor: "#e879a833" }} onClick={() => setShowCycleModal(true)}><Droplets size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Log Period</button>}
          </div>

          {/* Milestone (Nishant) */}
          {!isP && nextM && (
            <div style={{ ...card, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><p style={{ fontSize: 12, color: "#666", margin: 0 }}>Next milestone</p><p style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "4px 0 0" }}>{nextM.emoji} {nextM.label}</p></div>
                <div style={{ fontSize: 22, fontWeight: 700, color: A.p }}>{toM} kg</div>
              </div>
              <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", marginTop: 8 }}>
                <div style={{ width: `${Math.max(5, 100 - (toM / (data.startWeight - nextM.kg)) * 100)}%`, height: "100%", background: A.gr, borderRadius: 4, transition: "width 0.6s ease" }} />
              </div>
            </div>
          )}

          {/* Nutrition */}
          <div style={{ marginTop: 20 }}>
            <div style={lbl}>{isP && pData.lastPeriod ? `${cPh.name} PHASE NUTRITION` : `PHASE ${phase.id} NUTRITION`}</div>
            <div style={card}>
              {isP && pData.lastPeriod ? (
                <p style={{ fontSize: 14, color: "#bbb", margin: 0, lineHeight: 1.8 }}>{cPh.nutrition}</p>
              ) : phase.nutrition.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 10 : 0 }}>
                  <Salad size={14} color={A.p} style={{ marginTop: 3, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{r}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );

  // ─── PLAN ─────────────────────────────────────────────────────────────────
  const Plan = () => (
    <>
      <div style={{ marginTop: 20 }}>
        <div style={lbl}>CURRENT PHASE</div>
        <div style={cardG}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: 0 }}>Phase {phase.id}: {phase.name}</h2>
              <p style={{ fontSize: 13, color: "#777", marginTop: 4, marginBottom: 0 }}>Weeks {phase.weeks} · {phase.subtitle}</p>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: `${A.p}18`, fontFamily: "'Outfit',sans-serif" }}>{phase.id}/4</div>
          </div>
          {isP && phase.stepTarget && (
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(0,0,0,0.15)", borderRadius: 10, display: "flex", gap: 8, alignItems: "center" }}>
              <Footprints size={15} color="#6366f1" /><span style={{ fontSize: 13, color: "#aaa" }}>Daily step target: <strong style={{ color: "#6366f1" }}>{phase.stepTarget.toLocaleString()}</strong></span>
            </div>
          )}
          <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", marginTop: 14 }}>
            <div style={{ width: `${Math.min(100, ((weekNum - (phase.id === 1 ? 0 : phase.id === 2 ? 4 : phase.id === 3 ? 8 : 12)) / (phase.id === 4 ? 8 : 4)) * 100)}%`, height: "100%", background: A.gr, borderRadius: 4, transition: "width 0.6s" }} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={lbl}>WEEKLY SCHEDULE</div>
        {phase.weeklyPlan.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: `${TC[d.type] || "#666"}08`, borderRadius: 14, border: `1px solid ${TC[d.type] || "#666"}12`, marginTop: 10 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: `${TC[d.type]}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><TIcon type={d.type} /></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: d.day === dayName ? A.p : "#ddd" }}>{d.day}{d.day === dayName ? " ←" : ""}</span>
                <span style={{ fontSize: 12, color: "#555" }}>{d.duration}</span>
              </div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{d.title}{d.stepGoal ? ` · ${d.stepGoal.toLocaleString()} steps` : ""}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={lbl}>20-WEEK ROADMAP</div>
        {phases.map((p, i) => (
          <div key={i} style={{ ...card, marginTop: i === 0 ? 0 : 10, opacity: i < phIdx ? 0.5 : 1, cursor: "pointer", border: i === phIdx ? `1px solid ${A.p}28` : "1px solid rgba(255,255,255,0.05)" }} onClick={() => setPhaseDetail(i)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {i < phIdx && <Check size={14} color="#10b981" />}{i === phIdx && <Flame size={14} color={A.p} />}
                  <span style={{ fontSize: 14, fontWeight: 700, color: i === phIdx ? "#fff" : "#999" }}>Phase {p.id}: {p.name}</span>
                </div>
                <p style={{ fontSize: 12, color: "#555", margin: "4px 0 0 22px" }}>Weeks {p.weeks} · {p.subtitle}</p>
              </div>
              <ChevronRight size={16} color="#333" />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24 }}>
        <div style={lbl}>PHASE {phase.id} NUTRITION</div>
        <div style={card}>
          {phase.nutrition.map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 12 : 0 }}>
              <div style={{ width: 22, height: 22, borderRadius: 6, background: `${A.p}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: A.p }}>{i + 1}</span>
              </div>
              <p style={{ fontSize: 14, color: "#ccc", margin: 0, lineHeight: 1.6 }}>{r}</p>
            </div>
          ))}
        </div>
      </div>

      {isP && (
        <div style={{ marginTop: 24 }}>
          <div style={lbl}>CYCLE PHASE GUIDE</div>
          {CYCLE_PHASES.map((cp, i) => (
            <div key={i} style={{ ...card, marginTop: i === 0 ? 0 : 10, borderColor: i === cPhIdx && pData.lastPeriod ? `${cp.color}30` : "rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={tag(cp.color)}>{cp.name}</span><span style={{ fontSize: 12, color: "#555" }}>{cp.days}</span>
                {i === cPhIdx && pData.lastPeriod && <span style={{ fontSize: 11, color: cp.color, fontWeight: 600 }}>← Now</span>}
              </div>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 6px", lineHeight: 1.6 }}><strong style={{ color: "#aaa" }}>Exercise:</strong> {cp.exercise}</p>
              <p style={{ fontSize: 12, color: "#888", margin: 0, lineHeight: 1.6 }}><strong style={{ color: "#aaa" }}>Nutrition:</strong> {cp.nutrition}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );

  // ─── PROGRESS ─────────────────────────────────────────────────────────────
  const Progress = () => {
    const cd = data.weightLog.map(e => ({ date: formatDate(e.date), weight: e.weight, target: data.targetWeight }));
    const perfDays = Object.values(data.checkins).filter(c => c.exercise && c.nutrition && c.water).length;
    return (
      <>
        <div style={{ marginTop: 20 }}>
          <div style={lbl}>OVERALL PROGRESS</div>
          <div style={cardG}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
              <div><p style={{ fontSize: 12, color: "#777", margin: 0 }}>Progress to goal</p><p style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: "4px 0 0" }}>{pct}%</p></div>
              <div style={{ textAlign: "right" }}><p style={{ fontSize: 12, color: "#777", margin: 0 }}>{data.startWeight || "?"} → {data.targetWeight || "?"} kg</p><p style={{ fontSize: 14, fontWeight: 600, color: "#10b981", margin: "4px 0 0" }}>{lost > 0 ? `${lost} kg lost` : "Starting..."}</p></div>
            </div>
            <div style={{ width: "100%", height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}><div style={{ width: `${pct}%`, height: "100%", background: A.gr, borderRadius: 6, transition: "width 0.6s" }} /></div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={lbl}>WEIGHT TREND</div>
          <div style={{ ...card, padding: cd.length > 1 ? "20px 10px 10px 0" : 20 }}>
            {cd.length > 1 ? (
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={cd}>
                  <defs><linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={A.p} stopOpacity={0.3} /><stop offset="95%" stopColor={A.p} stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#444" }} axisLine={false} tickLine={false} />
                  <YAxis domain={["dataMin-2", "dataMax+2"]} tick={{ fontSize: 11, fill: "#444" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13 }} />
                  <Area type="monotone" dataKey="weight" stroke={A.p} strokeWidth={2.5} fill="url(#wg)" dot={{ fill: A.p, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  {data.targetWeight && <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />}
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: "center", padding: "30px 0" }}><TrendingDown size={32} color="#2a2a2a" /><p style={{ fontSize: 13, color: "#777", marginTop: 12 }}>{cd.length === 1 ? "Log a few more to see the trend" : "Start logging weight"}</p></div>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
          {[{ i: <Flame size={18} color={A.p} />, v: data.streak, l: "Current Streak" }, { i: <Award size={18} color="#f59e0b" />, v: data.bestStreak, l: "Best Streak" }, { i: <Target size={18} color="#10b981" />, v: perfDays, l: "Perfect Days" }, { i: <Calendar size={18} color="#8b5cf6" />, v: weekNum, l: "Weeks In" }].map((s, i) => (
            <div key={i} style={card}>{s.i}<p style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 8, letterSpacing: "-1px" }}>{s.v}</p><p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{s.l}</p></div>
          ))}
        </div>

        {data.weightLog.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <div style={lbl}>WEIGHT LOG</div>
            <div style={card}>
              {[...data.weightLog].reverse().slice(0, 10).map((e, i, a) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < a.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none" }}>
                  <span style={{ fontSize: 13, color: "#777" }}>{formatDate(e.date)}</span><span style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{e.weight} kg</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 30, textAlign: "center" }}>
          <button style={{ background: "rgba(255,255,255,0.04)", color: "#444", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }} onClick={resetD}>
            <RotateCcw size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />Reset Progress
          </button>
        </div>
      </>
    );
  };

  // ─── MAIN RENDER ──────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0a0c13", color: "#e2e4ea", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle,${A.g} 0%,transparent 70%)`, pointerEvents: "none", transition: "all 1s", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-15%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1, paddingBottom: 100, opacity: animIn ? 1 : 0, transform: animIn ? "translateY(0)" : "translateY(10px)", transition: "all 0.3s" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", background: A.gr, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>REFORGE</div>
          <div style={{ display: "flex", gap: 3, background: "rgba(255,255,255,0.04)", borderRadius: 20, padding: 3 }}>
            <button style={{ padding: "6px 14px", borderRadius: 17, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: !isP ? A.p : "transparent", color: !isP ? "#0a0c13" : "#777", fontFamily: "inherit", transition: "all 0.2s" }} onClick={() => switchU("nishant")}><User size={11} style={{ marginRight: 3, verticalAlign: "middle" }} />Nishant</button>
            <button style={{ padding: "6px 14px", borderRadius: 17, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", background: isP ? A.p : "transparent", color: isP ? "#0a0c13" : "#777", fontFamily: "inherit", transition: "all 0.2s" }} onClick={() => switchU("partner")}><Heart size={11} style={{ marginRight: 3, verticalAlign: "middle" }} />{partnerName}</button>
          </div>
        </div>

        {activeTab === "today" && <Today />}
        {activeTab === "plan" && <Plan />}
        {activeTab === "progress" && <Progress />}
      </div>

      {/* Nav */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,12,19,0.94)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", gap: 8, padding: "10px 20px", paddingBottom: "max(10px,env(safe-area-inset-bottom))", zIndex: 100 }}>
        {[{ t: "today", i: <Flame size={20} />, l: "TODAY" }, { t: "plan", i: <Calendar size={20} />, l: "PLAN" }, { t: "progress", i: <TrendingDown size={20} />, l: "PROGRESS" }].map(n => (
          <button key={n.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 18px", borderRadius: 12, border: "none", background: activeTab === n.t ? `${A.p}15` : "transparent", color: activeTab === n.t ? A.p : "#444", cursor: "pointer", fontSize: 10, fontWeight: 600, fontFamily: "inherit", letterSpacing: "0.3px" }} onClick={() => setActiveTab(n.t)}>{n.i}{n.l}</button>
        ))}
      </div>

      {/* Weight Modal */}
      {showWeightModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowWeightModal(false)}>
          <div style={{ background: "#141620", borderRadius: 20, padding: 28, width: "90%", maxWidth: 400, border: "1px solid rgba(255,255,255,0.07)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Log Weight</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 4 }} onClick={() => setShowWeightModal(false)}><X size={20} /></button>
            </div>
            <input style={inp} type="number" step="0.1" placeholder="Weight in kg" value={weightInput} onChange={e => setWeightInput(e.target.value)} autoFocus onKeyDown={e => e.key === "Enter" && logW()} />
            <button style={{ ...btn, marginTop: 16 }} onClick={logW}>Save</button>
          </div>
        </div>
      )}

      {/* Cycle Modal */}
      {showCycleModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowCycleModal(false)}>
          <div style={{ background: "#141620", borderRadius: 20, padding: 28, width: "90%", maxWidth: 400, border: "1px solid rgba(255,255,255,0.07)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Log Period Start</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 4 }} onClick={() => setShowCycleModal(false)}><X size={20} /></button>
            </div>
            <p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>When did your last period start?</p>
            <input style={{ ...inp, marginTop: 12, colorScheme: "dark" }} type="date" value={cycleDate || today} onChange={e => setCycleDate(e.target.value)} />
            <button style={{ ...btn, marginTop: 16 }} onClick={() => logPeriod(cycleDate || today)}>Save</button>
          </div>
        </div>
      )}

      {/* Fizzy Drink Modal */}
      {showFizzyModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowFizzyModal(false)}>
          <div style={{ background: "#141620", borderRadius: 20, padding: 28, width: "90%", maxWidth: 400, border: "1px solid rgba(255,255,255,0.07)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>🫧 Log a Fizzy</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 4 }} onClick={() => setShowFizzyModal(false)}><X size={20} /></button>
            </div>
            <p style={{ fontSize: 13, color: "#777", margin: "0 0 20px" }}>{fizzyRemaining} of {fizzyMax} remaining this week</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FIZZY_DRINKS.map(drink => (
                <button key={drink.id} onClick={() => logFizzy(drink.id)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", background: `${drink.color}0a`, border: `1.5px solid ${drink.color}25`, borderRadius: 14, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", width: "100%", textAlign: "left" }}>
                  <span style={{ fontSize: 28 }}>{drink.emoji}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#ddd" }}>{drink.name}</div>
                    <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>Tap to log</div>
                  </div>
                </button>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "#555", marginTop: 16, textAlign: "center", lineHeight: 1.5 }}>
              Phase {phIdx + 1} allowance: {fizzyMax}/week → {phIdx < 3 ? `Phase ${phIdx + 2}: ${FIZZY_ALLOWANCE[phIdx + 1]}/week` : "you made it!"}
            </p>
          </div>
        </div>
      )}

      {/* Phase Detail */}
      {phaseDetail !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setPhaseDetail(null)}>
          <div style={{ background: "#141620", borderRadius: 20, padding: 28, width: "90%", maxWidth: 400, maxHeight: "75vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.07)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Phase {phases[phaseDetail].id}: {phases[phaseDetail].name}</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 4 }} onClick={() => setPhaseDetail(null)}><X size={20} /></button>
            </div>
            <p style={{ fontSize: 13, color: "#777", marginBottom: 16 }}>Weeks {phases[phaseDetail].weeks} · {phases[phaseDetail].subtitle}</p>
            {isP && phases[phaseDetail].stepTarget && (
              <div style={{ padding: "10px 14px", background: "rgba(99,102,241,0.08)", borderRadius: 10, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}>
                <Footprints size={15} color="#6366f1" /><span style={{ fontSize: 13, color: "#6366f1" }}>Daily target: {phases[phaseDetail].stepTarget.toLocaleString()} steps</span>
              </div>
            )}
            <div style={lbl}>SCHEDULE</div>
            {phases[phaseDetail].weeklyPlan.map((d, i) => (
              <div key={i} style={{ padding: "10px 14px", background: `${TC[d.type] || "#666"}08`, borderRadius: 12, border: `1px solid ${TC[d.type] || "#666"}12`, marginTop: i === 0 ? 0 : 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{d.day}</span><span style={tag(TC[d.type])}>{d.type}</span></div>
                <p style={{ fontSize: 12, color: "#777", margin: "4px 0 0" }}>{d.title} · {d.duration}{d.stepGoal ? ` · ${d.stepGoal.toLocaleString()} steps` : ""}</p>
                <p style={{ fontSize: 12, color: "#555", margin: "4px 0 0", lineHeight: 1.5 }}>{d.detail}</p>
              </div>
            ))}
            <div style={{ ...lbl, marginTop: 20 }}>NUTRITION</div>
            {phases[phaseDetail].nutrition.map((r, i) => <p key={i} style={{ fontSize: 13, color: "#999", margin: "8px 0 0", lineHeight: 1.6 }}>• {r}</p>)}
          </div>
        </div>
      )}

      {celebration && <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(10,12,19,0.96)", border: `2px solid ${A.p}`, borderRadius: 20, padding: "30px 50px", zIndex: 200, textAlign: "center", animation: "cp 0.4s ease", fontSize: 20, fontWeight: 700, color: "#fff", backdropFilter: "blur(20px)" }}>{celebration}</div>}

      <style>{`
        @keyframes cp{0%{transform:translate(-50%,-50%) scale(.7);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        body{margin:0;background:#0a0c13}
        input:focus{border-color:${A.p}55 !important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px}
      `}</style>
    </div>
  );
}