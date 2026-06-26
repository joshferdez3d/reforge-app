import React, { useState } from "react";
import { Check, ChevronRight, ChevronDown, Flame, Footprints, Activity, Dumbbell, Coffee, Wind, Droplets, Zap, Sun, Moon, Play, AlertTriangle } from "lucide-react";
import { CYCLE_PHASES } from "../constants";
import { COACH_WORKOUT, DAILY_JOINT_ROUTINE, COACH_GUIDELINES, COACH_SUPPLEMENTS } from "../workoutPlan";

const TC_MAP = { walk: "#3b82f6", steps: "#6366f1", strength: "#f59e0b", cardio: "#ef4444", rest: "#10b981", gentle: "#a78bfa", mobility: "#8b5cf6" };

const TIcon = ({ type, sz = 18 }) => {
  const c = TC_MAP[type] || "#666";
  if (type === "steps") return <Footprints size={sz} color={c} />;
  if (type === "gentle" || type === "mobility") return <Wind size={sz} color={c} />;
  if (type === "walk" || type === "cardio") return <Activity size={sz} color={c} />;
  if (type === "strength") return <Dumbbell size={sz} color={c} />;
  return <Coffee size={sz} color={c} />;
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function PlanView(props) {
  const { userData, phases, phase, phIdx, weekNum, dayName, cPhIdx, A, TC, styles, setPhaseDetail } = props;

  const [expandedDay, setExpandedDay] = useState(dayName);
  const [showJointRoutine, setShowJointRoutine] = useState(false);
  const isP = userData.enableCycleTracking && userData.lastPeriod;

  // ─── COACH PLAN VIEW (Nishant) ───────────────────────────────────────────
  if (userData.coachPlan) {
    return (
      <>
        {/* Header */}
        <div style={{ marginTop: 20 }}>
          <div style={styles.lbl}>YOUR TRAINING PLAN</div>
          <div style={styles.cardG}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: 0 }}>Coach Amit Kumar</h2>
                <p style={{ fontSize: 13, color: "#777", marginTop: 4, marginBottom: 0 }}>Foundation Phase · Strength & Joint Health</p>
              </div>
              <div style={{ fontSize: 28 }}>🏋️</div>
            </div>
          </div>
        </div>

        {/* Weekly Schedule */}
        <div style={{ marginTop: 24 }}>
          <div style={styles.lbl}>WEEKLY SCHEDULE</div>
          {DAYS.map((day) => {
            const workout = COACH_WORKOUT[day];
            if (!workout) return null;
            const isToday = day === dayName;
            const isExpanded = expandedDay === day;
            const typeColor = TC_MAP[workout.type] || "#666";

            return (
              <div key={day} style={{ marginTop: 8 }}>
                {/* Day Header */}
                <button
                  onClick={() => setExpandedDay(isExpanded ? null : day)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12, width: "100%",
                    padding: "14px 16px",
                    background: isToday ? `${A.p}0a` : `${typeColor}08`,
                    borderRadius: isExpanded ? "14px 14px 0 0" : 14,
                    border: isToday ? `1.5px solid ${A.p}30` : `1px solid ${typeColor}12`,
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                  }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${typeColor}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <TIcon type={workout.type} sz={16} />
                  </div>
                  <div style={{ flex: 1, textAlign: "left", minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: isToday ? A.p : "#ddd" }}>
                        {day}{isToday ? " ← today" : ""}
                      </span>
                      <span style={{ fontSize: 11, color: "#555" }}>{workout.duration}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{workout.title}</div>
                  </div>
                  <ChevronDown size={16} color="#444" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }} />
                </button>

                {/* Expanded Day Content */}
                {isExpanded && workout.sections.length > 0 && (
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "0 0 14px 14px",
                    border: isToday ? `1.5px solid ${A.p}30` : `1px solid ${typeColor}12`,
                    borderTop: "none",
                    padding: "8px 0 12px",
                    overflow: "hidden"
                  }}>
                    {workout.sections.map((section, si) => (
                      <div key={si} style={{ padding: "0 14px", marginTop: si > 0 ? 12 : 4 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#888", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                          {section.icon} {section.title}
                          {section.duration && <span style={{ color: "#555", fontWeight: 400 }}> · {section.duration}</span>}
                        </div>
                        {section.note && (
                          <p style={{ fontSize: 11, color: A.p, fontWeight: 600, margin: "0 0 6px", letterSpacing: "0.3px" }}>{section.note}</p>
                        )}
                        {section.exercises.map((ex, ei) => (
                          <div key={ei} style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "7px 0",
                            borderBottom: ei < section.exercises.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none"
                          }}>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontSize: 13, fontWeight: 500, color: "#bbb" }}>
                                {ex.name}
                                {ex.note && <span style={{ fontSize: 11, color: "#555" }}> ({ex.note})</span>}
                              </span>
                              <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>
                                {ex.sets ? `${ex.sets} × ${ex.reps}` : ex.reps}
                              </div>
                            </div>
                            {ex.video && (
                              <a href={ex.video} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} style={{
                                display: "flex", alignItems: "center", gap: 3, padding: "4px 8px",
                                background: `${A.p}10`, borderRadius: 6, border: `1px solid ${A.p}18`,
                                fontSize: 10, fontWeight: 600, color: A.p, textDecoration: "none",
                                whiteSpace: "nowrap", flexShrink: 0
                              }}>
                                <Play size={9} fill={A.p} /> Form
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {/* Rest day expanded */}
                {isExpanded && workout.sections.length === 0 && (
                  <div style={{
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "0 0 14px 14px",
                    border: `1px solid ${typeColor}12`, borderTop: "none",
                    padding: "14px 16px"
                  }}>
                    <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Rest completely. Do your daily 10-min joint routine and recharge.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Daily Joint Routine */}
        <div style={{ marginTop: 24 }}>
          <div style={styles.lbl}>DAILY JOINT ROUTINE</div>
          <div style={styles.card}>
            <button onClick={() => setShowJointRoutine(!showJointRoutine)} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
              background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit"
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#ddd", textAlign: "left" }}>🦴 Bulletproof Joint Routine</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2, textAlign: "left" }}>10 min · Every day including rest days</div>
              </div>
              <ChevronDown size={16} color="#555" style={{ transform: showJointRoutine ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }} />
            </button>

            {showJointRoutine && (
              <div style={{ marginTop: 12 }}>
                {DAILY_JOINT_ROUTINE.map((ex, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "7px 0",
                    borderBottom: i < DAILY_JOINT_ROUTINE.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none"
                  }}>
                    <div style={{ flex: 1 }}>
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#bbb" }}>
                        {ex.name}
                        {ex.note && <span style={{ fontSize: 11, color: "#555" }}> ({ex.note})</span>}
                      </span>
                      <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>{ex.reps}</div>
                    </div>
                    {ex.video && (
                      <a href={ex.video} target="_blank" rel="noopener noreferrer" style={{
                        display: "flex", alignItems: "center", gap: 3, padding: "4px 8px",
                        background: `${A.p}10`, borderRadius: 6, border: `1px solid ${A.p}18`,
                        fontSize: 10, fontWeight: 600, color: A.p, textDecoration: "none",
                        whiteSpace: "nowrap", flexShrink: 0
                      }}>
                        <Play size={9} fill={A.p} /> Form
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Coach Guidelines */}
        <div style={{ marginTop: 24 }}>
          <div style={styles.lbl}>COACH GUIDELINES</div>
          <div style={styles.card}>
            {COACH_GUIDELINES.map((g, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 10 : 0 }}>
                <AlertTriangle size={13} color={A.p} style={{ marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.5 }}>{g}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Supplements */}
        <div style={{ marginTop: 24 }}>
          <div style={styles.lbl}>JOINT HEALTH SUPPLEMENTS</div>
          <div style={styles.card}>
            {COACH_SUPPLEMENTS.map((s, i) => (
              <div key={i} style={{ marginTop: i > 0 ? 14 : 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{s.name}</div>
                <div style={{ fontSize: 12, color: "#888", marginTop: 3, lineHeight: 1.5 }}>
                  <span style={{ color: A.p, fontWeight: 600 }}>{s.dose}</span> · {s.when}
                </div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{s.benefit}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition */}
        <div style={{ marginTop: 24 }}>
          <div style={styles.lbl}>NUTRITION GUIDELINES</div>
          <div style={styles.card}>
            {(userData.plan?.nutritionByPhase?.[phIdx] || phase?.nutrition || []).map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 12 : 0 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: `${A.p}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: A.p }}>{i + 1}</span>
                </div>
                <p style={{ fontSize: 14, color: "#ccc", margin: 0, lineHeight: 1.6 }}>{r}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // ─── ORIGINAL PHASE VIEW (Mrunali) ─────────────────────────────────────────
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
