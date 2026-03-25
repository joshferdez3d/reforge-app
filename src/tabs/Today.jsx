import React, { useState } from "react";
import { Check, Clock, Footprints, TrendingDown, Droplets, Salad, Star, Flame, Zap, Sun, Moon, Calendar, Activity, Dumbbell, Coffee, Wind, ArrowRight } from "lucide-react";
import { generateMilestones } from "../helpers";
import { GROWTH_DAY_PLAN, TYPE_COLORS } from "../constants";

const TIcon = ({ type, sz = 18 }) => {
  const c = TYPE_COLORS[type] || "#666";
  if (type === "steps") return <Footprints size={sz} color={c} />;
  if (type === "gentle") return <Wind size={sz} color={c} />;
  if (type === "walk" || type === "cardio") return <Activity size={sz} color={c} />;
  if (type === "strength") return <Dumbbell size={sz} color={c} />;
  return <Coffee size={sz} color={c} />;
};

export default function Today(props) {
  const { userData, setUserData, phases, phase, phIdx, todayPlan, today, dayName, weekNum, ci, latestW, lost, pct, quote, notStartedYet, daysUntilStart, cDay, cPhIdx, cPh, A, TC, styles, setShowWeightModal, setShowCycleModal, setShowGuiltyModal } = props;

  const [celebration, setCelebration] = useState(null);
  const hasSteps = todayPlan?.stepGoal;

  const showCelebration = (msg) => {
    setCelebration(msg);
    setTimeout(() => setCelebration(null), 2500);
  };

  const toggleCi = (key) => {
    const todayCheckin = userData.checkins?.[today] || {};
    const updated = {
      ...userData,
      checkins: {
        ...userData.checkins,
        [today]: { ...todayCheckin, [key]: !todayCheckin[key] }
      }
    };
    setUserData(updated);
    showCelebration(`✨ ${key} marked!`);
  };

  const toggleCraving = (triggerId) => {
    const updated = { ...userData };
    if (!updated.cravingsHandled) updated.cravingsHandled = [];
    const idx = updated.cravingsHandled.findIndex(e => e.triggerId === triggerId && e.date === today);
    if (idx >= 0) {
      updated.cravingsHandled.splice(idx, 1);
    } else {
      updated.cravingsHandled.push({ triggerId, date: today });
    }
    setUserData(updated);
    showCelebration(`🎯 Craving handled!`);
  };

  const toggleMatchPrep = () => {
    const updated = { ...userData };
    if (!updated.matchNightPrepped) updated.matchNightPrepped = [];
    const idx = updated.matchNightPrepped.indexOf(today);
    if (idx >= 0) {
      updated.matchNightPrepped.splice(idx, 1);
    } else {
      updated.matchNightPrepped.push(today);
    }
    setUserData(updated);
    showCelebration(`⚽ Match snacks ready!`);
  };

  const toggleGuiltyPleasure = (itemId) => {
    const updated = { ...userData };
    if (!updated.guiltyPleasureLog) updated.guiltyPleasureLog = [];
    updated.guiltyPleasureLog.push({ itemId, date: today });
    setUserData(updated);
    showCelebration(`🎉 Logged!`);
  };

  const ckKeys = ["exercise", ...(hasSteps ? ["steps"] : []), "nutrition", "water"];
  const todayCravingsHandled = (userData.cravingsHandled || []).filter(e => e.date === today).map(e => e.triggerId);
  const matchNightPreppedToday = (userData.matchNightPrepped || []).includes(today);
  const milestones = generateMilestones(userData.startWeight, userData.targetWeight);
  const nextM = milestones.find(m => m.kg > latestW);
  const toM = nextM?.kg || 0;
  const cravingTriggers = userData.plan?.cravingTriggers || [];

  return (
    <>
      {celebration && (
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: 32, zIndex: 9999, pointerEvents: "none", animation: "fadeInOut 2.5s" }}>
          {celebration}
        </div>
      )}

      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: 14, color: "#555", margin: 0 }}>{notStartedYet ? `Starts ${daysUntilStart === 1 ? "tomorrow" : `in ${daysUntilStart} days`}` : `Week ${weekNum} · ${dayName}`}</p>
        <h1 style={{ fontSize: 26, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: "4px 0 0", letterSpacing: "-0.5px" }}>Hey {userData.name} 👊</h1>
      </div>

      {notStartedYet ? (
        <>
          <div style={{ ...styles.cardG, textAlign: "center", padding: 30 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔥</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", margin: "0 0 8px", fontFamily: "'Outfit',sans-serif" }}>Ready to go!</h2>
            <p style={{ fontSize: 14, color: "#999", margin: 0, lineHeight: 1.7 }}>
              Your journey begins on <strong style={{ color: A.p }}>{new Date(userData.startDate).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</strong>.
              Get a good sleep tonight. Lay out your workout clothes. You've got this.
            </p>
          </div>
          <div style={{ marginTop: 20 }}>
            <div style={styles.lbl}>YOUR FIRST WEEK PREVIEW</div>
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
          <div style={{ ...styles.card, display: "flex", gap: 8, padding: "18px 12px" }}>
            {[{ v: latestW || "—", l: "Current kg" }, { v: lost > 0 ? `-${lost}` : "0", l: "kg lost", c: lost > 0 ? "#10b981" : "#fff" }, { v: userData.streak || 0, l: "day streak", c: A.p }].map((s, i) => (
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
          {userData.enableCycleTracking && userData.lastPeriod && (
            <div style={{ ...styles.cardG, borderColor: `${cPh.color}30`, background: `${cPh.color}08` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={styles.tag(cPh.color)}>{cPh.name} Phase</span>
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

          {userData.enableCycleTracking && !userData.lastPeriod && (
            <div style={styles.card}>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#ddd", margin: "0 0 8px" }}>Track your cycle</p>
              <p style={{ fontSize: 13, color: "#777", marginBottom: 16, lineHeight: 1.6 }}>Log your last period start for phase-aware exercise and nutrition guidance.</p>
              <button style={{ ...styles.btnO, color: "#e879a8", borderColor: "#e879a833" }} onClick={() => setShowCycleModal(true)}>
                <Calendar size={14} style={{ marginRight: 6, verticalAlign: "middle" }} /> Log Period Start
              </button>
            </div>
          )}

          {/* Today's Plan */}
          <div style={{ marginTop: 20 }}>
            <div style={styles.lbl}>TODAY'S PLAN</div>
            {todayPlan ? (
              <div style={styles.cardG}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${TC[todayPlan.type]}12`, display: "flex", alignItems: "center", justifyContent: "center" }}><TIcon type={todayPlan.type} sz={20} /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{todayPlan.title}</div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={styles.tag(TC[todayPlan.type])}>{todayPlan.type}</span>
                      <span style={{ fontSize: 12, color: "#666" }}><Clock size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />{todayPlan.duration}</span>
                      {todayPlan.stepGoal && <span style={{ fontSize: 12, color: "#6366f1" }}><Footprints size={12} style={{ verticalAlign: "middle", marginRight: 3 }} />{todayPlan.stepGoal.toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#bbb", margin: 0, lineHeight: 1.7, padding: "12px 14px", background: "rgba(0,0,0,0.15)", borderRadius: 10 }}>{todayPlan.detail}</p>
              </div>
            ) : (
              <div style={styles.card}><p style={{ fontSize: 15, fontWeight: 600, color: "#10b981", margin: 0 }}>Rest Day 🧘</p><p style={{ fontSize: 13, color: "#777", lineHeight: 1.6 }}>Recovery is progress. Stretch, hydrate, rest.</p></div>
            )}
          </div>

          {/* Checklist */}
          <div style={{ marginTop: 20 }}>
            <div style={styles.lbl}>DAILY CHECKLIST · {ckKeys.filter(k => ci[k]).length}/{ckKeys.length}</div>
            {[
              { k: "exercise", t: "Exercise Done", d: "Completed today's workout" },
              ...(hasSteps ? [{ k: "steps", t: "Step Goal Hit", d: `Reached ${todayPlan?.stepGoal?.toLocaleString()} steps` }] : []),
              { k: "nutrition", t: "Nutrition on Track", d: "Followed today's guidelines" },
              { k: "water", t: "Water Goal", d: "2.5L+ of water today" },
            ].map(({ k, t, d }) => (
              <div key={k} onClick={() => toggleCi(k)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: ci[k] ? `${A.p}0d` : "rgba(255,255,255,0.015)", borderRadius: 12, cursor: "pointer", border: `1px solid ${ci[k] ? A.p + "30" : "rgba(255,255,255,0.04)"}`, marginTop: 8, transition: "all 0.2s" }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, border: `2px solid ${ci[k] ? A.p : "#3a3a3a"}`, background: ci[k] ? A.p : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {ci[k] && <Check size={14} color="#0a0c13" strokeWidth={3} />}
                </div>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{t}</div><div style={{ fontSize: 12, color: "#666" }}>{d}</div></div>
              </div>
            ))}
          </div>

          {/* Cravings Toolkit */}
          {cravingTriggers.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={styles.lbl}>CRAVINGS TOOLKIT · {todayCravingsHandled.length} handled</div>

              {cravingTriggers.map(trigger => {
                const handled = todayCravingsHandled.includes(trigger.id);
                const swaps = trigger.swaps[phIdx] || trigger.swaps[3];
                return (
                  <div key={trigger.id} style={{ ...styles.card, borderColor: handled ? `${trigger.color}25` : "rgba(255,255,255,0.05)", background: handled ? `${trigger.color}06` : "rgba(255,255,255,0.03)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 20 }}>{trigger.emoji}</span>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{trigger.label}</div>
                          <div style={{ fontSize: 11, color: "#666" }}>{trigger.time}</div>
                        </div>
                      </div>
                      {handled && <span style={styles.tag("#10b981")}>handled</span>}
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
                    <button onClick={() => toggleCraving(trigger.id)} style={{ background: handled ? `${trigger.color}10` : "rgba(255,255,255,0.05)", color: handled ? trigger.color : "#ddd", border: `1px solid ${handled ? `${trigger.color}30` : "rgba(255,255,255,0.08)"}`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit", transition: "all 0.2s" }}>
                      {handled ? "Handled — nice work!" : "Mark as handled"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Guilty Pleasure Budget */}
          {userData.plan?.guiltyPleasure && (
            <div style={{ marginTop: 20 }}>
              <div style={styles.lbl}>GUILTY PLEASURE BUDGET</div>
              <div style={styles.card}>
                <p style={{ fontSize: 13, color: "#bbb", margin: "0 0 12px", lineHeight: 1.6 }}>A little treat goes a long way. Pick your moment wisely!</p>
                <button style={{ ...styles.btnO }} onClick={() => setShowGuiltyModal(true)}>
                  Log a treat
                </button>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button style={{ ...styles.btnO, flex: 1 }} onClick={() => { setShowWeightModal(true); }}><TrendingDown size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Log Weight</button>
            {userData.enableCycleTracking && <button style={{ ...styles.btnO, flex: 1, color: "#e879a8", borderColor: "#e879a833" }} onClick={() => setShowCycleModal(true)}><Droplets size={14} style={{ marginRight: 6, verticalAlign: "middle" }} />Log Period</button>}
          </div>

          {/* Milestone */}
          {nextM && (
            <div style={{ ...styles.card, marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><p style={{ fontSize: 12, color: "#666", margin: 0 }}>Next milestone</p><p style={{ fontSize: 15, fontWeight: 700, color: "#fff", margin: "4px 0 0" }}>{nextM.emoji} {nextM.label}</p></div>
                <div style={{ fontSize: 22, fontWeight: 700, color: A.p }}>{toM} kg</div>
              </div>
              <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", marginTop: 8 }}>
                <div style={{ width: `${Math.max(5, 100 - (toM / (userData.startWeight - userData.targetWeight)) * 100)}%`, height: "100%", background: A.gr, borderRadius: 4, transition: "width 0.6s ease" }} />
              </div>
            </div>
          )}

          {/* Nutrition */}
          <div style={{ marginTop: 20 }}>
            <div style={styles.lbl}>{userData.enableCycleTracking && userData.lastPeriod ? `${cPh.name} PHASE NUTRITION` : `PHASE ${phase.id} NUTRITION`}</div>
            <div style={styles.card}>
              {userData.enableCycleTracking && userData.lastPeriod ? (
                <p style={{ fontSize: 14, color: "#bbb", margin: 0, lineHeight: 1.8 }}>{cPh.nutrition}</p>
              ) : (userData.plan?.nutritionByPhase?.[phIdx] || phase.nutrition || []).map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginTop: i > 0 ? 10 : 0 }}>
                  <Salad size={14} color={A.p} style={{ marginTop: 3, flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "#bbb", margin: 0, lineHeight: 1.6 }}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Growth Planner */}
          <div style={{ marginTop: 20 }}>
            <div style={styles.lbl}>WEEKLY GROWTH PLANNER</div>
            <div style={styles.card}>
              {GROWTH_DAY_PLAN[dayName] && (
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: 0 }}>
                    Today: {GROWTH_DAY_PLAN[dayName].focus} {GROWTH_DAY_PLAN[dayName].emoji}
                  </p>
                  <p style={{ fontSize: 13, color: "#777", margin: "6px 0 0", lineHeight: 1.5 }}>{GROWTH_DAY_PLAN[dayName].desc}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0.8); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
}
