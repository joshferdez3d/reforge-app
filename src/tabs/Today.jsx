import React, { useState } from "react";
import { Check, Clock, Footprints, TrendingDown, Droplets, Salad, Star, Flame, Zap, Sun, Moon, Calendar, Activity, Dumbbell, Coffee, Wind, ArrowRight, X } from "lucide-react";
import { generateMilestones, getWeekStart, formatDate } from "../helpers";
import { GROWTH_DAY_PLAN, TYPE_COLORS, FIZZY_DRINKS, FIZZY_ALLOWANCE, FIZZY_MSGS, FIZZY_EMPTY_MSGS, formatMatchTimeIST } from "../constants";

const TIcon = ({ type, sz = 18 }) => {
  const c = TYPE_COLORS[type] || "#666";
  if (type === "steps") return <Footprints size={sz} color={c} />;
  if (type === "gentle") return <Wind size={sz} color={c} />;
  if (type === "walk" || type === "cardio") return <Activity size={sz} color={c} />;
  if (type === "strength") return <Dumbbell size={sz} color={c} />;
  return <Coffee size={sz} color={c} />;
};

export default function Today(props) {
  const { userData, setUserData, phases, phase, phIdx, todayPlan, today, dayName, weekNum, ci, latestW, lost, pct, quote, notStartedYet, daysUntilStart, cDay, cPhIdx, cPh, showMatchNightCard, arsenalSoon, arsenalNext, A, TC, styles, setShowWeightModal, setShowCycleModal } = props;

  const [celebration, setCelebration] = useState(null);
  const [showFizzyModal, setShowFizzyModal] = useState(false);
  const [pauseRitual, setPauseRitual] = useState(null); // { triggerId, step }
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
    const cravings = [...(userData.cravingsHandled || [])];
    const idx = cravings.findIndex(e => e.triggerId === triggerId && e.date === today);
    if (idx >= 0) {
      cravings.splice(idx, 1);
    } else {
      cravings.push({ triggerId, date: today });
    }
    setUserData({ ...userData, cravingsHandled: cravings });
    showCelebration(`🎯 Craving handled!`);
    setPauseRitual(null);
  };

  const toggleMatchPrep = () => {
    const prepped = [...(userData.lateNightPrepped || [])];
    const idx = prepped.indexOf(today);
    if (idx >= 0) {
      prepped.splice(idx, 1);
    } else {
      prepped.push(today);
    }
    setUserData({ ...userData, lateNightPrepped: prepped });
    showCelebration(`⚽ Match snacks ready!`);
  };

  const logFizzy = (drinkId) => {
    if (fizzyRemaining <= 0) return;
    const drink = FIZZY_DRINKS.find(d => d.id === drinkId);
    const log = [...(userData.guiltyPleasureLog || []), { date: today, drink: drinkId, name: drink?.name }];
    setUserData({ ...userData, guiltyPleasureLog: log });
    setShowFizzyModal(false);
    showCelebration(`🫧 ${drink?.name} logged!`);
  };

  // Derived data
  const ckKeys = ["exercise", ...(hasSteps ? ["steps"] : []), "nutrition", "water"];
  const todayCravingsHandled = (userData.cravingsHandled || []).filter(e => e.date === today).map(e => e.triggerId);
  const lateNightPreppedToday = (userData.lateNightPrepped || []).includes(today);
  const milestones = generateMilestones(userData.startWeight, userData.targetWeight);
  const nextM = milestones.find(m => m.kg > latestW);
  const toM = nextM?.kg || 0;
  const cravingTriggers = userData.plan?.cravingTriggers || [];

  // Fizzy drink budget (Mrunali's feature)
  const gp = userData.plan?.guiltyPleasure;
  const fizzyMax = gp ? (FIZZY_ALLOWANCE[phIdx] || 1) : 0;
  const weekStart = getWeekStart();
  const fizzyThisWeek = gp ? (userData.guiltyPleasureLog || []).filter(e => new Date(e.date) >= weekStart) : [];
  const fizzyRemaining = Math.max(0, fizzyMax - fizzyThisWeek.length);
  const fizzyMsg = fizzyRemaining > 0 ? (FIZZY_MSGS.find(m => m.max === fizzyMax)?.msg || FIZZY_MSGS[0].msg) : FIZZY_EMPTY_MSGS[Math.floor(Math.random() * FIZZY_EMPTY_MSGS.length)];

  // Pause ritual steps
  const PAUSE_STEPS = [
    { emoji: "💧", text: "Drink a glass of water first", action: "Done — had water" },
    { emoji: "⏳", text: "Wait 2 minutes. Set a timer.", action: "OK, I waited" },
    { emoji: "🤔", text: "Ask yourself: am I actually hungry, or bored/stressed/tired?", action: "I've thought about it" },
    { emoji: "✅", text: "Now decide: swap, skip, or have it mindfully", action: null },
  ];

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

          {/* Cycle Phase (Mrunali) */}
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

          {/* Arsenal Match Night Prep Card (Nishant) */}
          {showMatchNightCard && !lateNightPreppedToday && (
            <div style={{ ...styles.card, marginTop: 16, borderColor: "#ef444425", background: "linear-gradient(135deg,rgba(239,68,68,0.06),rgba(239,68,68,0.02))" }}>
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
                  Before dinner, get these ready: {(cravingTriggers.find(t => t.id === "match-night")?.swaps?.[phIdx] || cravingTriggers.find(t => t.id === "match-night")?.swaps?.[3] || ["Air-fried chicken strips", "Roasted chana", "Nuts + cucumber chaat masala"]).join(", ")}
                </p>
              </div>
              <button onClick={toggleMatchPrep} style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" }}>
                I've prepped my match snacks
              </button>
            </div>
          )}
          {showMatchNightCard && lateNightPreppedToday && (
            <div style={{ ...styles.card, marginTop: 16, borderColor: "#10b98125", background: "rgba(16,185,129,0.04)" }}>
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

          {/* Cravings Toolkit with Pause Ritual (Nishant) */}
          {cravingTriggers.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={styles.lbl}>CRAVINGS TOOLKIT · {todayCravingsHandled.length} handled</div>

              {cravingTriggers.map(trigger => {
                const handled = todayCravingsHandled.includes(trigger.id);
                const swaps = trigger.swaps[phIdx] || trigger.swaps[3];
                const inPause = pauseRitual?.triggerId === trigger.id;
                const pauseStep = pauseRitual?.step || 0;
                return (
                  <div key={trigger.id} style={{ ...styles.card, borderColor: handled ? `${trigger.color}25` : "rgba(255,255,255,0.05)", background: handled ? `${trigger.color}06` : "rgba(255,255,255,0.03)" }}>
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

                    {/* Pause Ritual */}
                    {inPause && !handled && (
                      <div style={{ padding: "14px", background: "rgba(0,0,0,0.2)", borderRadius: 12, marginBottom: 10, border: `1px solid ${trigger.color}15` }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: trigger.color, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Pause Ritual · Step {pauseStep + 1}/4</div>
                        {PAUSE_STEPS.map((step, i) => (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", opacity: i <= pauseStep ? 1 : 0.3 }}>
                            <span style={{ fontSize: 16 }}>{i < pauseStep ? "✅" : step.emoji}</span>
                            <span style={{ fontSize: 13, color: i <= pauseStep ? "#ddd" : "#555", flex: 1 }}>{step.text}</span>
                          </div>
                        ))}
                        {pauseStep < 3 && (
                          <button onClick={() => setPauseRitual({ triggerId: trigger.id, step: pauseStep + 1 })} style={{ background: `${trigger.color}15`, color: trigger.color, border: `1px solid ${trigger.color}25`, borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit", marginTop: 8 }}>
                            {PAUSE_STEPS[pauseStep].action}
                          </button>
                        )}
                        {pauseStep === 3 && (
                          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                            <button onClick={() => toggleCraving(trigger.id)} style={{ flex: 1, background: `${trigger.color}15`, color: trigger.color, border: `1px solid ${trigger.color}25`, borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                              Had a swap ✅
                            </button>
                            <button onClick={() => { toggleCraving(trigger.id); }} style={{ flex: 1, background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                              Skipped it 💪
                            </button>
                            <button onClick={() => setPauseRitual(null)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "#888", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                              Had it
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {!handled && !inPause && (
                      <button onClick={() => setPauseRitual({ triggerId: trigger.id, step: 0 })} style={{ background: "rgba(255,255,255,0.05)", color: "#ddd", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit", transition: "all 0.2s" }}>
                        Feeling this craving? Start pause ritual
                      </button>
                    )}
                    {handled && (
                      <div style={{ textAlign: "center", fontSize: 13, fontWeight: 600, color: trigger.color, padding: "8px 0" }}>
                        Handled — nice work! 🎯
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Fizzy Drink Budget (Mrunali) */}
          {gp && userData.startDate && (
            <div style={{ marginTop: 20 }}>
              <div style={styles.lbl}>FIZZY DRINK BUDGET · {fizzyRemaining}/{fizzyMax} left</div>
              <div style={{ ...styles.card, border: `1px solid ${fizzyRemaining > 0 ? "rgba(255,255,255,0.05)" : "#ef444422"}` }}>
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
          </div>
        </div>
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
