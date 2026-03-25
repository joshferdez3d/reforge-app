const API_KEY = "AIzaSyDJzG9Icr1zLH0pZTirkzpS-VzSTb7o0zk";

const colorPalette = [
  "#a78bfa",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#10b981",
  "#e879a8",
  "#6366f1",
];

const indianSwaps = {
  phase1: ["makhana", "roasted chana", "paneer", "dal", "dates"],
  phase2: ["makhana", "dark chocolate", "peanut butter", "Greek yogurt"],
  phase3: ["roasted chana", "paneer", "nimbu pani", "green tea"],
  phase4: ["green tea", "dates", "dark chocolate", "nimbu pani"],
};

function generateExerciseTemplate(activityLevel, exerciseTime) {
  const timeInMinutes = parseInt(exerciseTime) || 0;
  if (
    activityLevel === "Barely active" ||
    activityLevel === "Lightly active"
  ) {
    if (timeInMinutes < 30) return "gentle";
  }
  if (activityLevel === "Moderately active" || timeInMinutes < 60) {
    return "moderate";
  }
  if (activityLevel === "Very active" && timeInMinutes >= 30) {
    return "aggressive";
  }
  return "moderate";
}

function generateCravingTriggers(
  struggleTimes,
  foodWeaknesses,
  dietPref,
  name
) {
  const triggerMap = {
    "Morning (9-11am)": {
      label: "Morning Hunger",
      emoji: "🌅",
      color: colorPalette[1],
    },
    "Afternoon (2-4pm)": {
      label: "Afternoon Slump",
      emoji: "☀️",
      color: colorPalette[3],
    },
    "Evening (6-8pm)": {
      label: "Evening Cravings",
      emoji: "🌆",
      color: colorPalette[0],
    },
    "Late night (after 10pm)": {
      label: "Late Night Munchies",
      emoji: "🌙",
      color: colorPalette[4],
    },
  };

  const triggers = [];
  for (const time of struggleTimes.slice(0, 3)) {
    if (triggerMap[time]) {
      const trigger = {
        id: `trigger_${triggers.length + 1}`,
        label: triggerMap[time].label,
        time,
        emoji: triggerMap[time].emoji,
        color: triggerMap[time].color,
        swaps: [
          indianSwaps.phase1.slice(0, 4),
          indianSwaps.phase2.slice(0, 4),
          indianSwaps.phase3.slice(0, 4),
          indianSwaps.phase4.slice(0, 4),
        ],
        tip: `Stay hydrated and keep a healthy snack ready during ${time}`,
      };
      triggers.push(trigger);
    }
  }

  // Ensure exactly 3 triggers
  while (triggers.length < 3) {
    const defaultTimes = [
      "Morning (9-11am)",
      "Afternoon (2-4pm)",
      "Evening (6-8pm)",
      "Late night (after 10pm)",
    ];
    for (const time of defaultTimes) {
      if (
        !triggers.find((t) => t.time === time) &&
        triggers.length < 3 &&
        triggerMap[time]
      ) {
        const trigger = {
          id: `trigger_${triggers.length + 1}`,
          label: triggerMap[time].label,
          time,
          emoji: triggerMap[time].emoji,
          color: triggerMap[time].color,
          swaps: [
            indianSwaps.phase1.slice(0, 4),
            indianSwaps.phase2.slice(0, 4),
            indianSwaps.phase3.slice(0, 4),
            indianSwaps.phase4.slice(0, 4),
          ],
          tip: `Stay hydrated and keep a healthy snack ready during ${time}`,
        };
        triggers.push(trigger);
      }
    }
  }

  return triggers.slice(0, 3);
}

function generateNutritionByPhase() {
  const phases = [
    [
      "Drink 8 glasses of water daily",
      "Include one serving of vegetables in each meal",
      "Choose whole grains over white rice/bread",
      "Add protein to every meal (dal, paneer, eggs)",
      "Have fruits as your main snack",
    ],
    [
      "Limit salt intake to 2 teaspoons per day",
      "Replace sugary drinks with nimbu pani or green tea",
      "Cook with minimal oil, max 2 tbsp per meal",
      "Choose lean proteins and avoid fried foods",
      "Track your portions using your palm as a guide",
    ],
    [
      "Eliminate processed snacks completely",
      "Practice intermittent eating windows (avoid grazing)",
      "Include fiber-rich foods: dal, vegetables, whole grains",
      "Reduce spice and salt further, use herbs for flavor",
      "Plan meals 1 day in advance",
    ],
    [
      "Maintain strict meal timing: breakfast, lunch, dinner only",
      "No snacking between meals; drink water if hungry",
      "Minimize oil to 1 tbsp per day",
      "Choose boiled or grilled preparation methods exclusively",
      "Track every meal and log it daily",
    ],
  ];

  return phases;
}

function shouldIncludeGuiltyPleasure(foodWeaknesses) {
  const weaknessLower = foodWeaknesses.map((w) => w.toLowerCase());
  return weaknessLower.some(
    (w) =>
      w.includes("fizzy") ||
      w.includes("soda") ||
      w.includes("cola") ||
      w.includes("alcohol")
  );
}

function shouldIncludeLateNightEvent(struggleTimes) {
  return struggleTimes.includes("Late night (after 10pm)");
}

function parseGeminiResponse(text) {
  try {
    // Try direct JSON parsing
    return JSON.parse(text);
  } catch (e) {
    // Try extracting JSON from markdown code blocks
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[1]);
      } catch (innerError) {
        console.error("Failed to parse JSON from markdown:", innerError);
        throw new Error("Invalid JSON in response");
      }
    }
    throw new Error("Could not parse response as JSON");
  }
}

function buildPrompt(questionnaire) {
  const {
    name,
    gender,
    activityLevel,
    exerciseTime,
    struggleTimes,
    specificHabit,
    foodWeaknesses,
    dietPref,
  } = questionnaire;

  const exerciseTemplate = generateExerciseTemplate(activityLevel, exerciseTime);
  const cravingTriggers = generateCravingTriggers(
    struggleTimes,
    foodWeaknesses,
    dietPref,
    name
  );
  const nutritionByPhase = generateNutritionByPhase();
  const includeGuiltyPleasure = shouldIncludeGuiltyPleasure(foodWeaknesses);
  const includeLateNightEvent = shouldIncludeLateNightEvent(struggleTimes);

  const prompt = `You are a personalized fitness and nutrition coach. Generate a detailed fitness plan in JSON format based on this profile:

Name: ${name}
Gender: ${gender}
Activity Level: ${activityLevel}
Exercise Time per week: ${exerciseTime} minutes
Struggle Times: ${struggleTimes.join(", ")}
Specific Habit to Build: ${specificHabit}
Food Weaknesses: ${foodWeaknesses.join(", ")}
Diet Preference: ${dietPref}

IMPORTANT: Generate ONLY valid JSON output (no markdown, no code blocks, pure JSON).

Return this exact JSON structure:
{
  "exerciseTemplate": "${exerciseTemplate}",
  "cravingTriggers": ${JSON.stringify(cravingTriggers)},
  "nutritionByPhase": ${JSON.stringify(nutritionByPhase)},
  "guiltyPleasure": ${
    includeGuiltyPleasure
      ? `{
    "name": "Occasional Treats",
    "items": [
      {"id": "treat_1", "name": "Dark Chocolate", "emoji": "🍫", "color": "#f59e0b"},
      {"id": "treat_2", "name": "Fizzy Drink", "emoji": "🥤", "color": "#3b82f6"},
      {"id": "treat_3", "name": "Fried Snack", "emoji": "🍟", "color": "#ef4444"}
    ],
    "weeklyAllowance": [3, 2, 1, 0]
  }`
      : "null"
  },
  "lateNightEvent": ${
    includeLateNightEvent
      ? `{
    "name": "Late Night Protocol",
    "prepReminder": "Set a phone reminder at 9:30 PM to prepare for bed and avoid eating after 10 PM"
  }`
      : "null"
  }
}

Customize the plan based on ${name}'s specific needs and food preferences. Ensure all recommendations respect the "${dietPref}" diet preference.`;

  return prompt;
}

export default async function handler(req, res) {
  // Set cache control
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { questionnaire } = req.body;

    if (!questionnaire) {
      return res.status(400).json({ error: "Missing questionnaire data" });
    }

    // Validate required fields
    const requiredFields = [
      "name",
      "gender",
      "activityLevel",
      "exerciseTime",
      "struggleTimes",
      "foodWeaknesses",
      "dietPref",
    ];
    for (const field of requiredFields) {
      if (!questionnaire[field]) {
        return res
          .status(400)
          .json({ error: `Missing required field: ${field}` });
      }
    }
    // Provide default for optional fields
    if (!questionnaire.specificHabit) {
      questionnaire.specificHabit = "Build consistent healthy habits";
    }

    const prompt = buildPrompt(questionnaire);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 2000,
            temperature: 0.3,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      return res
        .status(response.status)
        .json({
          error: "Failed to generate plan",
          details: errorData.error?.message,
        });
    }

    const data = await response.json();

    if (
      !data.candidates ||
      !data.candidates[0] ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts
    ) {
      console.error("Unexpected Gemini response format:", data);
      return res.status(500).json({ error: "Invalid response from AI service" });
    }

    const responseText = data.candidates[0].content.parts[0].text;
    let plan;

    try {
      plan = parseGeminiResponse(responseText);
    } catch (parseError) {
      console.error("Error parsing plan:", parseError, "Response:", responseText);
      return res.status(500).json({
        error: "Failed to parse generated plan",
        details: parseError.message,
      });
    }

    // Validate plan structure
    if (
      !plan.exerciseTemplate ||
      !plan.cravingTriggers ||
      !plan.nutritionByPhase
    ) {
      console.error("Generated plan missing required fields:", plan);
      return res
        .status(500)
        .json({ error: "Generated plan is missing required fields" });
    }

    res.status(200).json({ plan });
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
}
