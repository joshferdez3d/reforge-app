// Vercel serverless function — proxies chat to Gemini 2.0 Flash (free tier)
// Get your key at https://aistudio.google.com/apikey
const GEMINI_API_KEY = "AIzaSyDJzG9Icr1zLH0pZTirkzpS-VzSTb7o0zk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { systemPrompt, messages } = req.body;

  if (!messages || !messages.length) {
    return res.status(400).json({ error: "No messages provided" });
  }

  // Convert to Gemini format (roles: user/model, not user/assistant)
  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: {
            maxOutputTokens: 400,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't generate a response.";

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ reply });
  } catch (e) {
    res.status(500).json({ error: "Failed to get response from AI" });
  }
}
