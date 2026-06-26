// ─── Coach Amit Kumar × Nishant Fernandez ───────────────────────────────────
// Foundation Phase Workout Plan
// All video links open YouTube search for exercise form tutorials

const v = (q) => `https://www.youtube.com/results?search_query=${q}`;

// ─── DAILY 10-MIN BULLETPROOF JOINT ROUTINE ─────────────────────────────────
// Perform every day, including rest days
export const DAILY_JOINT_ROUTINE = [
  { name: "Neck Rotations", reps: "10 each side", video: v("neck+rotations+exercise+form") },
  { name: "Chin Tucks", reps: "15 reps", video: v("chin+tucks+posture+exercise") },
  { name: "Wall Slides", reps: "15 reps", video: v("wall+slides+shoulder+mobility+exercise") },
  { name: "Shoulder Dislocates", reps: "15 reps", note: "Band or PVC pipe", video: v("shoulder+dislocates+band+exercise+form") },
  { name: "Cat-Camel", reps: "10 reps", video: v("cat+camel+spine+mobility+exercise") },
  { name: "90/90 Hip Switches", reps: "10 reps", video: v("90+90+hip+switches+mobility+drill") },
  { name: "Tibialis Raises", reps: "20 reps", video: v("tibialis+raise+exercise+form") },
  { name: "Single-Leg Balance", reps: "30s each leg", video: v("single+leg+balance+hold+exercise") },
];

// ─── COACH GUIDELINES ────────────────────────────────────────────────────────
export const COACH_GUIDELINES = [
  "Don't train on empty stomach",
  "If dizzy → STOP immediately",
  "Keep sessions 20–40 min",
  "Post-meal walking (10 min if possible)",
  "If extreme fatigue or nausea, rest",
];

// ─── SUPPLEMENTS ─────────────────────────────────────────────────────────────
export const COACH_SUPPLEMENTS = [
  { name: "UC-II Collagen", dose: "40mg daily", when: "Before bed or with dinner", benefit: "Cartilage health, knee mobility" },
  { name: "Curcumin + BioPerine", dose: "500–1000mg + 5–10mg", when: "After breakfast", benefit: "Joint stiffness, recovery" },
];

// ─── WEEKLY WORKOUT PLAN ─────────────────────────────────────────────────────
export const COACH_WORKOUT = {
  Monday: {
    title: "Lower Body Strength + Joint Prep",
    type: "strength",
    duration: "~45 min",
    sections: [
      {
        title: "Joint Mobility Warm-Up",
        icon: "🔥",
        duration: "10 min",
        exercises: [
          { name: "Neck Rotations", reps: "10 each dir", video: v("neck+rotations+warm+up+exercise") },
          { name: "Shoulder Circles", reps: "15 each dir", video: v("shoulder+circles+warm+up+exercise") },
          { name: "Cat-Camel", reps: "10 reps", video: v("cat+camel+spine+mobility") },
          { name: "Hip Circles", reps: "10 each dir", video: v("hip+circles+warm+up+exercise") },
          { name: "Ankle Circles", reps: "15 each side", video: v("ankle+circles+mobility+warm+up") },
          { name: "Deep Squat Hold", reps: "60 sec", video: v("deep+squat+hold+mobility+beginner") },
        ]
      },
      {
        title: "Strength Training",
        icon: "💪",
        exercises: [
          { name: "Goblet Squat", sets: 4, reps: "8-10", video: v("goblet+squat+form+tutorial+beginner") },
          { name: "Romanian Deadlift", sets: 4, reps: "8-10", video: v("romanian+deadlift+dumbbell+form+tutorial") },
          { name: "Reverse Lunges", sets: 3, reps: "10 each leg", video: v("reverse+lunge+proper+form+tutorial") },
          { name: "Step-Ups", sets: 3, reps: "12 each leg", video: v("step+ups+exercise+proper+form") },
          { name: "Standing Calf Raise", sets: 3, reps: "15", video: v("standing+calf+raise+proper+form") },
        ]
      },
      {
        title: "Lower Back Conditioning",
        icon: "🦴",
        exercises: [
          { name: "Bird Dog", sets: 3, reps: "10 each side", video: v("bird+dog+exercise+proper+form") },
          { name: "Back Extension", sets: 3, reps: "12", video: v("back+extension+exercise+form+tutorial") },
          { name: "McGill Curl-Up", sets: 3, reps: "10", video: v("mcgill+curl+up+exercise+form") },
        ]
      },
      {
        title: "Mobility Finish",
        icon: "🧘",
        note: "Hold each for 45 seconds",
        exercises: [
          { name: "Hip Flexor Stretch", reps: "45s each side", video: v("hip+flexor+stretch+proper+form") },
          { name: "Hamstring Stretch", reps: "45s each side", video: v("standing+hamstring+stretch+form") },
          { name: "Calf Stretch", reps: "45s each side", video: v("calf+stretch+wall+form") },
        ]
      },
    ]
  },

  Tuesday: {
    title: "Upper Body + Shoulder Health",
    type: "strength",
    duration: "~45 min",
    sections: [
      {
        title: "Shoulder Mobility Circuit",
        icon: "🔥",
        note: "Perform 2 Rounds",
        exercises: [
          { name: "Arm Circles", reps: "×20", video: v("arm+circles+warm+up+exercise") },
          { name: "Wall Slides", reps: "×15", video: v("wall+slides+shoulder+exercise+form") },
          { name: "Band Pull Aparts", reps: "×20", video: v("band+pull+aparts+form+tutorial") },
          { name: "Scapular Push-Ups", reps: "×15", video: v("scapular+push+ups+form+tutorial") },
        ]
      },
      {
        title: "Strength Training",
        icon: "💪",
        exercises: [
          { name: "Incline DB Press", sets: 4, reps: "8-10", video: v("incline+dumbbell+press+form+tutorial") },
          { name: "Chest Supported Row", sets: 4, reps: "10", video: v("chest+supported+row+dumbbell+form") },
          { name: "Seated DB Press", sets: 3, reps: "10", video: v("seated+dumbbell+shoulder+press+form") },
          { name: "Lat Pulldown", sets: 3, reps: "12", video: v("lat+pulldown+proper+form+tutorial") },
          { name: "Face Pull", sets: 3, reps: "15", video: v("face+pull+cable+form+tutorial") },
        ]
      },
      {
        title: "Rotator Cuff Strength",
        icon: "🦴",
        exercises: [
          { name: "External Rotation", sets: 3, reps: "15", video: v("shoulder+external+rotation+exercise+form") },
          { name: "Internal Rotation", sets: 3, reps: "15", video: v("shoulder+internal+rotation+exercise+form") },
        ]
      },
      {
        title: "Core Conditioning",
        icon: "🎯",
        exercises: [
          { name: "Farmer Carry", sets: 4, reps: "30 meters", video: v("farmer+carry+exercise+form+tutorial") },
          { name: "Plank", sets: 3, reps: "45 sec", video: v("plank+exercise+proper+form+tutorial") },
        ]
      },
      {
        title: "Mobility Finish",
        icon: "🧘",
        exercises: [
          { name: "Doorway Chest Stretch", reps: "45s hold", video: v("doorway+chest+stretch+pec+form") },
          { name: "Lat Stretch", reps: "45s each side", video: v("lat+stretch+exercise+form") },
          { name: "Child's Pose", reps: "60s hold", video: v("childs+pose+yoga+stretch") },
        ]
      },
    ]
  },

  Wednesday: {
    title: "Recovery Mobility Session",
    type: "mobility",
    duration: "~40 min",
    sections: [
      {
        title: "Full Body Mobility Flow",
        icon: "🌊",
        exercises: [
          { name: "Thoracic Rotation", reps: "10 each side", video: v("thoracic+rotation+mobility+exercise") },
          { name: "90/90 Hip Mobility", reps: "10 each side", video: v("90+90+hip+mobility+exercise+form") },
          { name: "World's Greatest Stretch", reps: "8 each side", video: v("worlds+greatest+stretch+tutorial") },
          { name: "Cossack Squat", reps: "8 each side", video: v("cossack+squat+mobility+form+tutorial") },
          { name: "Ankle Mobility Drill", reps: "15 each side", video: v("ankle+mobility+drill+exercise") },
          { name: "Deep Squat Hold", reps: "2 min", video: v("deep+squat+hold+mobility+beginner") },
        ]
      },
      {
        title: "Core Stability",
        icon: "🎯",
        exercises: [
          { name: "Dead Bug", sets: 3, reps: "12", video: v("dead+bug+exercise+proper+form") },
          { name: "Side Plank", sets: 3, reps: "30 sec", video: v("side+plank+exercise+proper+form") },
          { name: "Bird Dog", sets: 3, reps: "10", video: v("bird+dog+exercise+proper+form") },
        ]
      },
      {
        title: "Walking",
        icon: "🚶",
        exercises: [
          { name: "Easy Pace Walk", reps: "20-30 min", note: "Relaxed, enjoy it" },
        ]
      },
    ]
  },

  Thursday: {
    title: "Bulletproof Body Strength",
    type: "strength",
    duration: "~50 min",
    sections: [
      {
        title: "Joint Preparation",
        icon: "🔥",
        duration: "5-10 min",
        exercises: [
          { name: "Neck Mobility", reps: "2 min", video: v("neck+mobility+warm+up+routine") },
          { name: "Shoulder Mobility", reps: "2 min", video: v("shoulder+mobility+warm+up+routine") },
          { name: "Hip Mobility", reps: "2 min", video: v("hip+mobility+warm+up+routine") },
          { name: "Ankle Mobility", reps: "2 min", video: v("ankle+mobility+warm+up+routine") },
        ]
      },
      {
        title: "Strength Training",
        icon: "💪",
        exercises: [
          { name: "Dumbbell Deadlift", sets: 4, reps: "6-8", note: "Or Trap Bar", video: v("dumbbell+deadlift+form+tutorial+beginner") },
          { name: "Bulgarian Split Squat", sets: 3, reps: "10 each leg", video: v("bulgarian+split+squat+form+tutorial") },
          { name: "Single-Leg RDL", sets: 3, reps: "10 each leg", video: v("single+leg+romanian+deadlift+form") },
          { name: "Chest Supported Row", sets: 3, reps: "12", video: v("chest+supported+row+dumbbell+form") },
          { name: "Push-Up", sets: 3, reps: "12", video: v("push+up+proper+form+tutorial+beginner") },
        ]
      },
      {
        title: "Joint Strength Circuit",
        icon: "⚡",
        note: "Perform 3 Rounds",
        exercises: [
          { name: "Tibialis Raises", reps: "20 reps", video: v("tibialis+raise+exercise+form") },
          { name: "Single-Leg Calf Raise", reps: "15 reps", video: v("single+leg+calf+raise+form") },
          { name: "Face Pull", reps: "15 reps", video: v("face+pull+cable+form+tutorial") },
          { name: "Farmer Carry", reps: "30 meters", video: v("farmer+carry+exercise+form+tutorial") },
        ]
      },
      {
        title: "Lower Back Resilience",
        icon: "🦴",
        exercises: [
          { name: "Back Extension", sets: 3, reps: "15", video: v("back+extension+exercise+form+tutorial") },
          { name: "McGill Curl-Up", sets: 3, reps: "10", video: v("mcgill+curl+up+exercise+form") },
          { name: "Side Plank", sets: 3, reps: "30 sec", video: v("side+plank+exercise+proper+form") },
        ]
      },
      {
        title: "Mobility Finish",
        icon: "🧘",
        exercises: [
          { name: "Pigeon Stretch", reps: "45s each side", video: v("pigeon+stretch+hip+form") },
          { name: "Hip Flexor Stretch", reps: "45s each side", video: v("hip+flexor+stretch+proper+form") },
          { name: "Pec Stretch", reps: "45s hold", video: v("pec+stretch+doorway+form") },
          { name: "Thoracic Rotation", reps: "45s each side", video: v("thoracic+rotation+stretch+form") },
        ]
      },
    ]
  },

  Friday: {
    title: "Active Recovery",
    type: "rest",
    duration: "~25 min",
    sections: [
      {
        title: "Post-Meal Walking",
        icon: "🚶",
        exercises: [
          { name: "Easy Walk", reps: "20-30 min", note: "After lunch or dinner" },
        ]
      }
    ]
  },

  Saturday: {
    title: "Walking + Light Movement",
    type: "walk",
    duration: "~30 min",
    sections: [
      {
        title: "Walking",
        icon: "🚶",
        exercises: [
          { name: "Brisk Walk", reps: "25-30 min", note: "Explore a new route" },
        ]
      }
    ]
  },

  Sunday: {
    title: "Full Rest Day",
    type: "rest",
    duration: "—",
    sections: []
  }
};
