import React from "react";
import { Check, ChevronRight, Flame, Footprints, Activity, Dumbbell, Coffee, Wind, Droplets, Zap, Sun, Moon } from "lucide-react";
import { CYCLE_PHASES } from "../constants";

const TIcon = ({ type, sz = 18 }) => {
  const c = { walk: "#3b82f6", steps: "#6366f1", strength: "#f59e0b", cardio: "#ef4444", rest: "#10b981", gentle: "#a78bfa" }[type] || "#666";
  if (type === "steps") return <Footprints size={sz} color={c} />;
  if (type === "gentle") return <Wind size={sz} color={c} />;
  if (type === "walk" || type === "cardio") return <Activity size={sz} color={c} />;
  if (type === "strength") return <Dumbbell size={sz} color={c} />;
  return <Coffee size={sz} color={c} />;
};

export default function PlanView(props) {
  const { userData, phases, phase, phIdx, weekNum, dayName, cPhIdx, A, TC, styles, setPhaseDetail } = props;

  const isP = userData.enableCycleTracking && userData.lastPeriod;

  return (
    <>
      <div style={{ marginTop: 20 }}>
        <div style={styles.lbl}>CURRENT PHASE</div>
        <div style={styles.cardG}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: 0 }}>Phase {phase.id}: {phase.name}</h2>
              <p style={{ fontSize: 13, color: "#777", marginTop: 4, marginBottom: 0 }}>Weeks {phase.weeks} · {phase.subtitle}</p>
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: `${A.p}18`, fontFamily: "'Outfit',sans-serif" }}>{phase.id}/4</div>
          </div>
          {phase.stepTarget && (
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
        <div style={styles.lbl}>WEEKLY SCHEDULE</div>
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
        <div style={styles.lbl}>20-WEEK ROADMAP</div>
        {phases.map((p, i) => (
          <div key={i} style={{ ...styles.card, marginTop: i === 0 ? 0 : 10, opacity: i < phIdx ? 0.5 : 1, cursor: "pointer", border: i === phIdx ? `1px solid ${A.p}28` : "1px solid rgba(255,255,255,0.05)" }} onClick={() => setPhaseDetail(i)}>
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
        <div style={styles.lbl}>PHASE {phase.id} NUTRITION</div>
        <div style={styles.card}>
          {(userData.plan?.nutritionByPhase?.[phIdx] || phase.nutrition || []).map((r, i) => (
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
          <div style={styles.lbl}>CYCLE PHASE GUIDE</div>
          {CYCLE_PHASES.map((cp, i) => (
            <div key={i} style={{ ...styles.card, marginTop: i === 0 ? 0 : 10, borderColor: i === cPhIdx && userData.lastPeriod ? `${cp.color}30` : "rgba(255,255,255,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={styles.tag(cp.color)}>{cp.name}</span><span style={{ fontSize: 12, color: "#555" }}>{cp.days}</span>
                {i === cPhIdx && userData.lastPeriod && <span style={{ fontSize: 11, color: cp.color, fontWeight: 600 }}>← Now</span>}
              </div>
              <p style={{ fontSize: 12, color: "#888", margin: "0 0 6px", lineHeight: 1.6 }}><strong style={{ color: "#aaa" }}>Exercise:</strong> {cp.exercise}</p>
              <p style={{ fontSize: 12, color: "#888", margin: 0, lineHeight: 1.6 }}><strong style={{ color: "#aaa" }}>Nutrition:</strong> {cp.nutrition}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
