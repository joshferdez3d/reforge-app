// ─── AGGRESSIVE PLAN (Nishant's original plan) ────────────────────────────────
export const PHASES_AGGRESSIVE = [
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

// ─── GENTLE PLAN (Partner's original plan) ─────────────────────────────────
export const PHASES_GENTLE = [
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

// ─── MODERATE PLAN (NEW) ───────────────────────────────────────────────────────
export const PHASES_MODERATE = [
  {
    id: 1, name: "Build the Habit", weeks: "1–4", subtitle: "Easy starts, daily rhythm",
    weeklyPlan: [
      { day: "Monday", type: "walk", title: "Morning Walk", duration: "20 min", detail: "Gentle pace, breathing focus. Treadmill: 4–4.5 km/h, 0% incline." },
      { day: "Tuesday", type: "strength", title: "Light Bodyweight", duration: "15 min", detail: "Wall pushups ×8, Chair squats ×10, Glute bridges ×10 — 3 rounds" },
      { day: "Wednesday", type: "walk", title: "Walk + Stretch", duration: "25 min", detail: "15 min walk (4 km/h, 0% incline), then stretch: Neck rolls, shoulder circles, quad stretch 20s each, hamstring stretch 20s each, hip flexor stretch 20s each, child's pose 30s." },
      { day: "Thursday", type: "rest", title: "Active Rest", duration: "10 min", detail: "Gentle mobility: Hip circles 10 each way → Leg swings 10 each → Cat-cow 8 reps → Child's pose 45s." },
      { day: "Friday", type: "strength", title: "Light Bodyweight", duration: "15 min", detail: "Wall pushups ×10, Chair squats ×12, Glute bridges ×12 — 3 rounds" },
      { day: "Saturday", type: "walk", title: "Exploration Walk", duration: "30 min", detail: "Enjoy a new route at easy pace. Treadmill: 4–4.5 km/h, 1% incline." },
      { day: "Sunday", type: "rest", title: "Full Rest", duration: "—", detail: "Rest completely. Gentle stretching if desired — child's pose, shoulder shrugs." },
    ],
    nutrition: ["Eat 3 meals daily without snacking between", "Add vegetables to 2 meals minimum", "Replace sugary drinks with water, tea, black coffee", "Drink 2L water daily", "No eating after 8pm"],
  },
  {
    id: 2, name: "Build Consistency", weeks: "5–8", subtitle: "Steady progress, adding challenge",
    weeklyPlan: [
      { day: "Monday", type: "walk", title: "Brisk Walk", duration: "25 min", detail: "Moderate pace, breathing elevated but comfortable. Treadmill: 4.5–5 km/h, 1% incline." },
      { day: "Tuesday", type: "strength", title: "Circuit", duration: "20 min", detail: "Pushups ×10, Chair squats ×12, Dips ×8, Glute bridges ×15 — 3 rounds" },
      { day: "Wednesday", type: "walk", title: "Walk + Mobility", duration: "25 min", detail: "20 min walk (4.5 km/h, 1% incline), then: Deep squat hold 20s, 90/90 hip switches ×8, pigeon stretch 30s each side." },
      { day: "Thursday", type: "rest", title: "Yoga or Rest", duration: "12 min", detail: "Beginner yoga flow or stretching routine." },
      { day: "Friday", type: "strength", title: "Circuit", duration: "20 min", detail: "Pushups ×12, Chair squats ×15, Dips ×10, Glute bridges ×15 — 3 rounds" },
      { day: "Saturday", type: "walk", title: "Longer Walk", duration: "35 min", detail: "Steady pace walk. Treadmill: 4.5–5 km/h, 2% incline." },
      { day: "Sunday", type: "rest", title: "Recovery", duration: "15 min", detail: "Stretching: Child's pose 45s → Downward dog 30s → Low lunge each side 30s → Pigeon pose 30s each → Seated forward fold 45s." },
    ],
    nutrition: ["Palm-sized protein at 2 meals minimum", "Half plate vegetables at lunch and dinner", "Choose brown rice or whole wheat roti", "Water 2.5L daily", "One treat meal per week"],
  },
  {
    id: 3, name: "Push Forward", weeks: "9–12", subtitle: "Building real strength",
    weeklyPlan: [
      { day: "Monday", type: "cardio", title: "Walk/Jog Mix", duration: "25 min", detail: "Walk 3 min, jog 1 min. Repeat 6×. Treadmill: walk 5 km/h, jog 7–7.5 km/h." },
      { day: "Tuesday", type: "strength", title: "Upper Body", duration: "20 min", detail: "Pushups ×12, Pike pushups ×8, Dips ×10, Plank 30s — 4 rounds" },
      { day: "Wednesday", type: "walk", title: "Brisk Pace", duration: "30 min", detail: "Good pace walk. Arms swinging. Treadmill: 5.5 km/h, 2% incline." },
      { day: "Thursday", type: "strength", title: "Lower Body", duration: "20 min", detail: "Squats ×15, Lunges ×10/side, Glute bridges ×15, Wall sit 25s — 4 rounds" },
      { day: "Friday", type: "cardio", title: "Walk/Jog Mix", duration: "25 min", detail: "Walk 2 min, jog 2 min. Repeat 6×. Treadmill: walk 5 km/h, jog 7.5–8 km/h." },
      { day: "Saturday", type: "strength", title: "Full Body", duration: "25 min", detail: "Pushups ×12, Squats ×15, Lunges ×10/side, Glute bridges ×15, Plank 35s — 3 rounds" },
      { day: "Sunday", type: "rest", title: "Active Recovery", duration: "20 min", detail: "Stretch flow: Child's pose → Downward dog 30s → Low lunge each side 30s → Pigeon each side 30s → Seated forward fold 45s → Legs up wall 2 min." },
    ],
    nutrition: ["Palm-sized protein at every meal", "Carbs at 2 meals only (fist-sized)", "Half plate vegetables at every meal", "Water 3L daily", "No fried food on weekdays"],
  },
  {
    id: 4, name: "Level Up", weeks: "13–20", subtitle: "Full body transformation",
    weeklyPlan: [
      { day: "Monday", type: "cardio", title: "Steady Jog", duration: "30 min", detail: "Conversational pace jog. Treadmill: 7.5–8 km/h, 1% incline." },
      { day: "Tuesday", type: "strength", title: "Upper Body", duration: "25 min", detail: "4 rounds: Pushups ×15, Dips ×12, Pike pushups ×10, Plank 45s" },
      { day: "Wednesday", type: "cardio", title: "Walk/Jog Intervals", duration: "30 min", detail: "Walk 1 min, jog 3 min. Repeat 6×. Treadmill: walk 5 km/h, jog 8–8.5 km/h." },
      { day: "Thursday", type: "strength", title: "Lower Body", duration: "25 min", detail: "4 rounds: Squats ×18, Lunges ×12/side, Glute bridges ×18, Wall sit 35s" },
      { day: "Friday", type: "cardio", title: "Long Jog", duration: "35 min", detail: "Easy pace, focus on duration. Treadmill: 7.5–8.5 km/h, 1% incline." },
      { day: "Saturday", type: "strength", title: "Full Body Power", duration: "30 min", detail: "Pushups ×15, Squats ×20, Lunges ×12/side, Burpees ×5, Plank 50s — 3 rounds" },
      { day: "Sunday", type: "rest", title: "Recovery", duration: "20 min", detail: "Deep recovery: Foam roll (or massage) legs 1 min each → Deep squat hold 30s → Pigeon pose each side 45s → Seated forward fold 60s → Supine twist each side 30s → Legs up wall 3 min." },
    ],
    nutrition: ["Meal prep 3 lunches on Sunday", "Protein at every meal (palm-sized)", "Whole grains preferred", "Vegetables at every meal", "Sleep 7+ hours for recovery"],
  },
];

// ─── EXERCISE TEMPLATES MAPPING ────────────────────────────────────────────────
export const EXERCISE_TEMPLATES = {
  aggressive: PHASES_AGGRESSIVE,
  moderate: PHASES_MODERATE,
  gentle: PHASES_GENTLE,
};

// ─── CYCLE PHASES ─────────────────────────────────────────────────────────────
export const CYCLE_PHASES = [
  { name: "Menstrual", days: "Day 1–5", color: "#e11d48", exercise: "Gentle movement only — slow walks, light stretching, or rest. Your body is working hard. Honour it. Skip strength if energy is low.", nutrition: "Iron-rich foods (spinach, lentils, dates, red meat). Warm, comforting meals. Stay extra hydrated. Dark chocolate is fine." },
  { name: "Follicular", days: "Day 6–13", color: "#8b5cf6", exercise: "Energy is building! Best time for strength sessions. Push a bit harder on walks. Your body responds really well to exercise right now.", nutrition: "Light, fresh foods. Salads, fermented foods, lean protein. Metabolism is efficient — eat clean and your body rewards you." },
  { name: "Ovulation", days: "Day 14–16", color: "#f59e0b", exercise: "Peak energy! Go for longest walks, push strength sessions. You'll surprise yourself with what you can do now.", nutrition: "Anti-inflammatory foods. Fiber-rich vegetables, lighter carbs, lots of water. You might feel less hungry — normal." },
  { name: "Luteal", days: "Day 17–28", color: "#14b8a6", exercise: "Early (17–21): Still good energy, keep routine. Late (22–28): Dial back. Gentle walks, yoga, stretching. Don't fight your body.", nutrition: "Complex carbs — sweet potato, oats, brown rice. Cravings are hormonal and normal. Magnesium foods (nuts, seeds, bananas) help. Avoid excess salt." },
];

// ─── THEME COLORS ─────────────────────────────────────────────────────────────
export const THEME_COLORS = {
  orange: { p: "#f59e0b", s: "#f97316", g: "rgba(245,158,11,0.1)", gr: "linear-gradient(135deg,#f59e0b,#f97316)" },
  pink: { p: "#e879a8", s: "#c084fc", g: "rgba(232,121,168,0.1)", gr: "linear-gradient(135deg,#e879a8,#c084fc)" },
  blue: { p: "#3b82f6", s: "#6366f1", g: "rgba(59,130,246,0.1)", gr: "linear-gradient(135deg,#3b82f6,#6366f1)" },
  green: { p: "#10b981", s: "#059669", g: "rgba(16,185,129,0.1)", gr: "linear-gradient(135deg,#10b981,#059669)" },
  purple: { p: "#8b5cf6", s: "#a78bfa", g: "rgba(139,92,246,0.1)", gr: "linear-gradient(135deg,#8b5cf6,#a78bfa)" },
};

// ─── TYPE COLORS ──────────────────────────────────────────────────────────────
export const TYPE_COLORS = {
  walk: "#3b82f6",
  steps: "#6366f1",
  strength: "#f59e0b",
  cardio: "#ef4444",
  rest: "#10b981",
  gentle: "#a78bfa",
};

// ─── QUOTES ───────────────────────────────────────────────────────────────────
export const QUOTES = [
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

// ─── FIZZY DRINK SYSTEM ───────────────────────────────────────────────────────
export const FIZZY_DRINKS = [
  { id: "diet-coke", name: "Diet Coke", emoji: "🥤", color: "#dc2626" },
  { id: "redbull", name: "Red Bull", emoji: "⚡", color: "#1d4ed8" },
  { id: "paper-boat", name: "Paper Boat Peach", emoji: "🍑", color: "#f97316" },
];

export const FIZZY_ALLOWANCE = [3, 2, 1, 0]; // per phase

export const FIZZY_MSGS = [
  { max: 3, msg: "3 this week — pick your best moments to enjoy them!" },
  { max: 2, msg: "Down to 2 this week. Make them count! 🙌" },
  { max: 1, msg: "1 special treat this week. You've come so far! 🌟" },
  { max: 0, msg: "No fizzy this phase — you've officially kicked it! 👑" },
];

export const FIZZY_EMPTY_MSGS = [
  "All used up this week! Try nimbu pani, sparkling water, or green tea 💚",
  "Budget spent! You made it through — fresh start next week 💪",
  "None left but you've got this. How about a masala chai instead? ☕",
];

// ─── NISHANT CRAVING TRIGGERS (for migration) ──────────────────────────────────
export const NISHANT_CRAVING_TRIGGERS = [
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

// ─── ARSENAL MATCH DATA ───────────────────────────────────────────────────────
export const MATCH_CACHE_KEY = "rf2-arsenal-matches";
export const MATCH_CACHE_MS = 12 * 60 * 60 * 1000; // refresh every 12h

export const fetchArsenalMatches = async () => {
  try {
    const cached = localStorage.getItem(MATCH_CACHE_KEY);
    if (cached) {
      const { data, ts } = JSON.parse(cached);
      if (Date.now() - ts < MATCH_CACHE_MS) return data;
    }
    const res = await fetch("/api/arsenal-matches");
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    const matches = (json.matches || []).map(m => ({
      utcDate: m.utcDate,
      home: m.homeTeam?.shortName || m.homeTeam?.name || "Home",
      away: m.awayTeam?.shortName || m.awayTeam?.name || "Away",
      competition: m.competition?.name || "",
      isHome: m.homeTeam?.id === 57,
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
export const getNextMatchSoon = (matches) => {
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
export const getUpcomingMatch = (matches) => {
  if (!matches) return null;
  const now = Date.now();
  for (const m of matches) {
    if (new Date(m.utcDate).getTime() >= now) return m;
  }
  return null;
};

// Format UTC date to IST time string (e.g. "Fri 1:30am")
export const formatMatchTimeIST = (utcDate) => {
  const d = new Date(utcDate);
  return d.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", weekday: "short", hour: "numeric", minute: "2-digit", hour12: true });
};

// ─── VISIBILITY LADDER ─────────────────────────────────────────────────────────
export const VISIBILITY_LADDER = [
  { level: 0, label: "Write it down", desc: "Write a thought or idea just for yourself", emoji: "📝" },
  { level: 1, label: "Share with one", desc: "Send something to 1 trusted person via DM", emoji: "💬" },
  { level: 2, label: "Disappearing story", desc: "Post a story that vanishes in 24h", emoji: "⏳" },
  { level: 3, label: "Close friends only", desc: "Post to your close friends list", emoji: "👥" },
  { level: 4, label: "Post publicly", desc: "Share a clip or thought without overthinking", emoji: "🌍" },
  { level: 5, label: "Show yourself", desc: "Post with your voice or face", emoji: "🎤" },
  { level: 6, label: "Promote it", desc: "Ask for feedback or actively share your work", emoji: "📢" },
];

// ─── GROWTH DAY PLAN ───────────────────────────────────────────────────────────
export const GROWTH_DAY_PLAN = {
  Monday: { focus: "Create", emoji: "🎵", desc: "Creative session (30-60 min)" },
  Tuesday: { focus: "Rest or free create", emoji: "🌿", desc: "No pressure" },
  Wednesday: { focus: "Finish something", emoji: "✅", desc: "Complete one small thing" },
  Thursday: { focus: "Create", emoji: "🎵", desc: "Creative session (30-60 min)" },
  Friday: { focus: "Rest or free create", emoji: "🌿", desc: "No pressure" },
  Saturday: { focus: "Share something", emoji: "📤", desc: "Any size, any audience" },
  Sunday: { focus: "Reflect", emoji: "🧘", desc: "Review your week" },
};
