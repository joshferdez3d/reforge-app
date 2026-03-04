import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send } from "lucide-react";
import { getPhaseIdx } from "../helpers";
import { EXERCISE_TEMPLATES } from "../constants";

export default function Ask(props) {
  const { userData, A, styles } = props;
  const [chatMsgs, setChatMsgs] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatRef = useRef(null);

  // Load chat from localStorage on mount
  useEffect(() => {
    const key = `rf2-chat-${userData.name}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setChatMsgs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load chat:", e);
      }
    }
  }, [userData.name]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMsgs, chatLoading]);

  // Build system prompt from userData
  const buildSystemPrompt = () => {
    const phIdx = getPhaseIdx(userData.startDate);
    const phaseName = userData.plan?.phases?.[phIdx]?.name || "Unknown";
    const nutrition = userData.plan?.nutritionByPhase?.[phIdx] || [];
    const cravingTriggers = userData.plan?.cravingTriggers || [];

    let prompt = `You are a warm, direct fitness & nutrition coach for ${userData.name}.\n\n`;
    prompt += `Current Status:\n`;
    prompt += `- Name: ${userData.name}\n`;
    prompt += `- Current weight: ${userData.currentWeight} kg\n`;
    prompt += `- Target weight: ${userData.targetWeight} kg\n`;
    prompt += `- Start weight: ${userData.startWeight} kg\n`;
    prompt += `- Phase: ${phIdx + 1} (${phaseName})\n\n`;

    if (nutrition.length > 0) {
      prompt += `Phase ${phIdx + 1} Nutrition Rules:\n`;
      nutrition.forEach(rule => {
        prompt += `- ${rule}\n`;
      });
      prompt += "\n";
    }

    if (cravingTriggers.length > 0) {
      prompt += `Key Craving Triggers:\n`;
      cravingTriggers.slice(0, 3).forEach(trigger => {
        prompt += `- ${trigger.label}: ${trigger.tip}\n`;
      });
      prompt += "\n";
    }

    if (userData.enableCycleTracking) {
      prompt += `Note: User tracks menstrual cycle. Provide cycle-aware nutrition and exercise guidance.\n\n`;
    }

    if (userData.grow) {
      prompt += `Note: User has growth goals. Avoid avoidance patterns and excessive screen time.\n\n`;
    }

    prompt += `Style: Warm but direct. 2–4 sentences max. No guilt. Indian food context. Acknowledge the user's situation and offer practical swaps.`;

    return prompt;
  };

  const sendChat = async (msg) => {
    if (!msg.trim() || chatLoading) return;

    const userMsg = { role: "user", content: msg.trim() };
    const newMsgs = [...chatMsgs, userMsg];
    setChatMsgs(newMsgs);
    setChatInput("");
    setChatLoading(true);

    try {
      // Get last 10 messages for context
      const contextMsgs = newMsgs.slice(-10);
      const systemPrompt = buildSystemPrompt();

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          messages: contextMsgs,
        }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      const assistantMsg = { role: "assistant", content: json.response || "I didn't understand that. Try asking again!" };

      const finalMsgs = [...newMsgs, assistantMsg];
      setChatMsgs(finalMsgs);
      localStorage.setItem(`rf2-chat-${userData.name}`, JSON.stringify(finalMsgs));
    } catch (e) {
      console.error("Chat error:", e);
      const errorMsg = { role: "assistant", content: "Sorry, something went wrong. Please try again." };
      const errorMsgs = [...newMsgs, errorMsg];
      setChatMsgs(errorMsgs);
    } finally {
      setChatLoading(false);
    }
  };

  // Quick suggestion chips
  const suggestions = [
    "Can I have rice at dinner?",
    "I'm craving something sweet",
    "What should I snack on right now?",
    userData.enableCycleTracking ? "I'm on my period — what should I eat?" : "Good pre-workout snack?",
    userData.enableCycleTracking ? "Is chai with sugar okay?" : "Is it okay to skip a workout today?",
    "What can I eat late at night?",
  ];

  // Inline styles
  const inp = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "12px 16px",
    fontSize: 16,
    color: "#fff",
    width: "100%",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <>
      <style>
        {`@keyframes dotPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }`}
      </style>

      <div style={{ marginTop: 20, marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: 0 }}>
          Ask Reforge
        </h1>
        <p style={{ fontSize: 13, color: "#666", marginTop: 4, marginBottom: 0 }}>
          Nutrition & fitness guidance for {userData.name}
        </p>
      </div>

      {/* Quick suggestions when empty */}
      {chatMsgs.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {suggestions.map((q, i) => (
            <button
              key={i}
              onClick={() => sendChat(q)}
              style={{
                background: `${A.p}0a`,
                border: `1px solid ${A.p}20`,
                borderRadius: 20,
                padding: "8px 14px",
                fontSize: 12,
                color: A.p,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 80 }}>
        {chatMsgs.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "85%",
              padding: "12px 16px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? A.gr : "rgba(255,255,255,0.05)",
              color: m.role === "user" ? "#0a0c13" : "#ddd",
              fontSize: 14,
              lineHeight: 1.6,
              fontWeight: m.role === "user" ? 600 : 400,
              whiteSpace: "pre-wrap",
            }}
          >
            {m.content}
          </div>
        ))}

        {chatLoading && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "12px 20px",
              borderRadius: "16px 16px 16px 4px",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: A.p,
                    animation: `dotPulse 1.2s infinite`,
                    animationDelay: `${i * 0.15}s`,
                    opacity: 0.4,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={chatRef} />
      </div>

      {/* Clear chat */}
      {chatMsgs.length > 2 && (
        <div style={{ textAlign: "center", paddingBottom: 80 }}>
          <button
            onClick={() => {
              setChatMsgs([]);
              localStorage.removeItem(`rf2-chat-${userData.name}`);
            }}
            style={{
              background: "none",
              border: "none",
              color: "#333",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Clear chat
          </button>
        </div>
      )}

      {/* Chat input bar */}
      <div
        style={{
          position: "fixed",
          bottom: 68,
          left: 0,
          right: 0,
          padding: "10px 20px",
          background: "rgba(10,12,19,0.96)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: 480, margin: "0 auto", display: "flex", gap: 10 }}>
          <input
            style={{ ...inp, flex: 1, borderRadius: 24, padding: "12px 18px", fontSize: 14 }}
            placeholder="Ask about food, exercise, cravings..."
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendChat(chatInput)}
          />
          <button
            onClick={() => sendChat(chatInput)}
            disabled={chatLoading}
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              border: "none",
              background: chatInput.trim() && !chatLoading ? A.gr : "rgba(255,255,255,0.05)",
              cursor: chatInput.trim() && !chatLoading ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Send
              size={18}
              color={chatInput.trim() && !chatLoading ? "#0a0c13" : "#444"}
            />
          </button>
        </div>
      </div>
    </>
  );
}
