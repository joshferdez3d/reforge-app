import React, { useState, useEffect } from "react";
import { Flame, Calendar, TrendingDown, MessageCircle, Sprout, ArrowRight, X, User, ChevronRight, Droplets, Footprints, Heart } from "lucide-react";
import { EXERCISE_TEMPLATES, THEME_COLORS, TYPE_COLORS, NISHANT_CRAVING_TRIGGERS, PHASES_AGGRESSIVE, PHASES_GENTLE, FIZZY_DRINKS, FIZZY_ALLOWANCE, MATCH_CACHE_KEY, fetchArsenalMatches, getNextMatchSoon, getUpcomingMatch, formatMatchTimeIST, CYCLE_PHASES, QUOTES } from "./constants";
import { getToday, getDayName, getWeekNumber, getPhaseIdx, getCycleDay, getCyclePhaseIdx, getWeekStart } from "./helpers";
import Questionnaire from "./Questionnaire";
import Today from "./tabs/Today";
import PlanView from "./tabs/PlanView";
import Progress from "./tabs/Progress";
import Ask from "./tabs/Ask";
import Grow from "./tabs/Grow";

export default function Reforge() {
  // ─── STATE ────────────────────────────────────────────────────────────────
  const [loaded, setLoaded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [migrationNeeded, setMigrationNeeded] = useState(false);
  const [migrationNames, setMigrationNames] = useState({ n: "Nishant", p: "Partner" });
  const [planLoading, setPlanLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showCycleModal, setShowCycleModal] = useState(false);
  const [showGuiltyModal, setShowGuiltyModal] = useState(false);
  const [showPhaseDetail, setShowPhaseDetail] = useState(null);
  const [weightInput, setWeightInput] = useState("");
  const [cycleDate, setCycleDate] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [setupStartWeight, setSetupStartWeight] = useState("");
  const [setupTargetWeight, setSetupTargetWeight] = useState("");
  const [celebration, setCelebration] = useState(null);
  const [arsenalMatches, setArsenalMatches] = useState(() => {
    try { const c = localStorage.getItem(MATCH_CACHE_KEY); if (c) return JSON.parse(c).data; } catch (_) {}
    return null;
  });

  // ─── PERSISTENCE: LOAD ────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem("rf2-user");
      if (saved) {
        setUserData(JSON.parse(saved));
        setLoaded(true);
        return;
      }
      // Check for migration from old format
      const oldN = localStorage.getItem("rf2-n");
      const oldP = localStorage.getItem("rf2-p");
      if (oldN || oldP) {
        const pName = localStorage.getItem("rf2-pn") || "Partner";
        setMigrationNames({ n: "Nishant", p: pName });
        if (oldN && oldP) {
          setMigrationNeeded(true);
        } else if (oldN) {
          migrateNishant(JSON.parse(oldN));
        } else {
          migratePartner(JSON.parse(oldP), pName);
        }
      }
      setLoaded(true);
    } catch (e) {
      setLoaded(true);
    }
  }, []);

  // ─── PERSISTENCE: SAVE ────────────────────────────────────────────────────
  useEffect(() => {
    if (loaded && userData) {
      try { localStorage.setItem("rf2-user", JSON.stringify(userData)); } catch (_) {}
    }
  }, [userData, loaded]);

  // ─── ARSENAL MATCHES ──────────────────────────────────────────────────────
  useEffect(() => {
    if (loaded && userData?.arsenalTracking) {
      fetchArsenalMatches().then(m => { if (m) setArsenalMatches(m); });
    }
  }, [loaded, userData?.arsenalTracking]);

  // ─── MIGRATION FUNCTIONS ──────────────────────────────────────────────────
  const migrateNishant = (nData) => {
    const migrated = {
      name: "Nishant", gender: "male", dietPref: "non-veg", themeColor: "orange",
      enableCycleTracking: false, arsenalTracking: true,
      plan: {
        exerciseTemplate: "aggressive",
        cravingTriggers: NISHANT_CRAVING_TRIGGERS,
        nutritionByPhase: PHASES_AGGRESSIVE.map(p => p.nutrition),
        guiltyPleasure: null, lateNightEvent: null,
      },
      startDate: nData.startDate, startWeight: nData.startWeight || 103.2,
      targetWeight: nData.targetWeight || 78, weightLog: nData.weightLog || [],
      checkins: nData.checkins || {}, streak: nData.streak || 0,
      bestStreak: nData.bestStreak || 0, cravingsHandled: nData.cravingsHandled || {},
      lateNightPrepped: nData.matchNightPrepped || {}, guiltyPleasureLog: [],
      lastPeriod: null,
      grow: { avoidanceLog: [], microCompletions: {}, visibilityLevel: 0, visibilityLog: [], screenTimeLog: {}, screenTimeDailyGoal: 60, weeklyPlan: { create: 2, finish: 1, share: 1, movement: 3 } },
    };
    setUserData(migrated);
    localStorage.removeItem("rf2-n"); localStorage.removeItem("rf2-p"); localStorage.removeItem("rf2-pn");
    setMigrationNeeded(false);
  };

  const migratePartner = (pData, pName) => {
    const migrated = {
      name: pName || "Partner", gender: "female", dietPref: "non-veg", themeColor: "pink",
      enableCycleTracking: true, arsenalTracking: false,
      plan: {
        exerciseTemplate: "gentle",
        cravingTriggers: [],
        nutritionByPhase: PHASES_GENTLE.map(p => p.nutrition),
        guiltyPleasure: { name: "Fizzy Drinks", items: FIZZY_DRINKS, weeklyAllowance: FIZZY_ALLOWANCE },
        lateNightEvent: null,
      },
      startDate: pData.startDate, startWeight: pData.startWeight,
      targetWeight: pData.targetWeight, weightLog: pData.weightLog || [],
      checkins: pData.checkins || {}, streak: pData.streak || 0,
      bestStreak: pData.bestStreak || 0, cravingsHandled: {},
      lateNightPrepped: {}, guiltyPleasureLog: pData.fizzyLog || [],
      lastPeriod: pData.lastPeriod || null,
      grow: { avoidanceLog: [], microCompletions: {}, visibilityLevel: 0, visibilityLog: [], screenTimeLog: {}, screenTimeDailyGoal: 60, weeklyPlan: { create: 2, finish: 1, share: 1, movement: 3 } },
    };
    setUserData(migrated);
    localStorage.removeItem("rf2-n"); localStorage.removeItem("rf2-p"); localStorage.removeItem("rf2-pn");
    setMigrationNeeded(false);
  };

  // ─── QUESTIONNAIRE COMPLETION ─────────────────────────────────────────────
  const onQuestionnaireComplete = async (qData) => {
    setPlanLoading(true);
    const initial = {
      name: qData.name, gender: qData.gender, dietPref: qData.dietPref,
      themeColor: qData.themeColor, enableCycleTracking: qData.enableCycleTracking || false,
      arsenalTracking: false, plan: null,
      startDate: null, startWeight: null, targetWeight: null,
      weightLog: [], checkins: {}, streak: 0, bestStreak: 0,
      cravingsHandled: {}, lateNightPrepped: {}, guiltyPleasureLog: [], lastPeriod: null,
      grow: { avoidanceLog: [], microCompletions: {}, visibilityLevel: 0, visibilityLog: [], screenTimeLog: {}, screenTimeDailyGoal: 60, weeklyPlan: { create: 2, finish: 1, share: 1, movement: 3 } },
    };
    try {
      const res = await fetch("/api/generate-plan", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionnaire: qData }),
      });
      const data = await res.json();
      if (data.plan) { initial.plan = data.plan; }
      else {
        initial.plan = { exerciseTemplate: "moderate", cravingTriggers: [], nutritionByPhase: EXERCISE_TEMPLATES.moderate.map(p => p.nutrition), guiltyPleasure: null, lateNightEvent: null };
      }
    } catch (e) {
      initial.plan = { exerciseTemplate: "moderate", cravingTriggers: [], nutritionByPhase: EXERCISE_TEMPLATES.moderate.map(p => p.nutrition), guiltyPleasure: null, lateNightEvent: null };
    }
    setUserData(initial);
    setPlanLoading(false);
  };

  // ─── DERIVED VALUES ───────────────────────────────────────────────────────
  const today = getToday();
  const dayName = getDayName();
  const A = userData ? (THEME_COLORS[userData.themeColor] || THEME_COLORS.orange) : THEME_COLORS.orange;
  const TC = TYPE_COLORS;
  const phases = userData?.plan ? (EXERCISE_TEMPLATES[userData.plan.exerciseTemplate] || EXERCISE_TEMPLATES.moderate) : [];
  const phIdx = userData ? getPhaseIdx(userData.startDate) : 0;
  const phase = phases[phIdx];
  const todayPlan = phase?.weeklyPlan?.find(d => d.day === dayName);
  const weekNum = userData ? getWeekNumber(userData.startDate) : 1;
  const ci = userData ? (userData.checkins?.[today] || { exercise: false, nutrition: false, water: false, steps: false }) : {};
  const latestW = userData?.weightLog?.length > 0 ? userData.weightLog[userData.weightLog.length - 1].weight : userData?.startWeight;
  const lost = userData?.startWeight ? Math.max(0, userData.startWeight - (latestW || userData.startWeight)).toFixed(1) : 0;
  const pct = (userData?.startWeight && userData?.targetWeight) ? Math.min(100, Math.max(0, ((userData.startWeight - latestW) / (userData.startWeight - userData.targetWeight)) * 100)).toFixed(0) : 0;
  const quote = QUOTES[Math.floor((new Date().getDate() + new Date().getMonth()) % QUOTES.length)];
  const cDay = userData?.enableCycleTracking ? getCycleDay(userData.lastPeriod) : null;
  const cPhIdx = getCyclePhaseIdx(cDay);
  const cPh = CYCLE_PHASES[cPhIdx];
  const arsenalSoon = userData?.arsenalTracking ? getNextMatchSoon(arsenalMatches) : null;
  const arsenalNext = userData?.arsenalTracking ? getUpcomingMatch(arsenalMatches) : null;
  const showMatchNightCard = userData?.arsenalTracking && (arsenalSoon !== null || (userData.lateNightPrepped?.[today]));
  const notStartedYet = userData?.startDate ? new Date(today) < new Date(userData.startDate) : false;
  const daysUntilStart = notStartedYet ? Math.ceil((new Date(userData.startDate) - new Date(today)) / (24*60*60*1000)) : 0;

  // ─── STYLES ───────────────────────────────────────────────────────────────
  const card = { background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)", borderRadius: 16, padding: 20, marginTop: 16, border: "1px solid rgba(255,255,255,0.05)" };
  const cardG = { ...card, background: `linear-gradient(135deg,rgba(255,255,255,0.03),${A.g})`, border: `1px solid ${A.p}20` };
  const lbl = { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.2px", color: "#555", marginBottom: 8 };
  const tag = (c) => ({ display: "inline-block", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 600, background: `${c}18`, color: c, letterSpacing: "0.3px" });
  const inp = { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 16px", fontSize: 16, color: "#fff", width: "100%", fontFamily: "inherit", outline: "none", boxSizing: "border-box" };
  const btn = { background: A.gr, color: "#0a0c13", border: "none", borderRadius: 12, padding: "14px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", width: "100%", fontFamily: "inherit" };
  const btnO = { background: "transparent", color: A.p, border: `1.5px solid ${A.p}33`, borderRadius: 12, padding: "12px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" };

  // ─── ACTIONS ──────────────────────────────────────────────────────────────
  const logW = () => {
    const w = parseFloat(weightInput);
    if (isNaN(w) || w < 30 || w > 250) return;
    setUserData(p => {
      const ex = p.weightLog.findIndex(e => e.date === today);
      let nl;
      if (ex >= 0) { nl = [...p.weightLog]; nl[ex] = { date: today, weight: w }; }
      else nl = [...p.weightLog, { date: today, weight: w }];
      return { ...p, weightLog: nl };
    });
    setWeightInput(""); setShowWeightModal(false);
  };

  const logPeriod = (d) => { setUserData(p => ({ ...p, lastPeriod: d || today })); setShowCycleModal(false); setCycleDate(""); };

  // ─── MIGRATION SCREEN ─────────────────────────────────────────────────────
  if (migrationNeeded) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0c13", color: "#e2e4ea", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
        <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.1) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "3px", color: "#f59e0b", marginBottom: 20 }}>REFORGE</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", marginBottom: 12, lineHeight: 1.2, letterSpacing: "-1px" }}>Who uses this device?</h1>
          <p style={{ fontSize: 15, color: "#777", lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>Select your profile to continue.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <button style={{ ...card, textAlign: "left", cursor: "pointer", border: "1.5px solid #f59e0b33", transition: "all 0.2s" }} onClick={() => migrateNishant(JSON.parse(localStorage.getItem("rf2-n")))}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>👊</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{migrationNames.n}</div>
              <div style={{ fontSize: 12, color: "#777" }}>Aggressive fitness plan</div>
            </button>
            <button style={{ ...card, textAlign: "left", cursor: "pointer", border: "1.5px solid #e879a833", transition: "all 0.2s" }} onClick={() => migratePartner(JSON.parse(localStorage.getItem("rf2-p")), migrationNames.p)}>
              <div style={{ fontSize: 20, marginBottom: 8 }}>✨</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{migrationNames.p}</div>
              <div style={{ fontSize: 12, color: "#777" }}>Gentle steps & strength plan</div>
            </button>
          </div>
        </div>
        <style>{`body{margin:0;background:#0a0c13}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}`}</style>
      </div>
    );
  }

  // ─── LOADING SCREEN ───────────────────────────────────────────────────────
  if (planLoading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0c13", color: "#e2e4ea", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
        <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,0.1) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "3px", color: "#f59e0b", marginBottom: 20 }}>REFORGE</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", marginBottom: 20, lineHeight: 1.2 }}>Building your personalized plan...</h1>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", animation: "dotPulse 1.2s infinite", animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
        <style>{`body{margin:0;background:#0a0c13}@keyframes dotPulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}`}</style>
      </div>
    );
  }

  // ─── QUESTIONNAIRE ────────────────────────────────────────────────────────
  if (!userData) {
    return <Questionnaire onComplete={onQuestionnaireComplete} />;
  }

  // ─── ONBOARDING ───────────────────────────────────────────────────────────
  if (!userData.startDate) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0c13", color: "#e2e4ea", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" }}>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
        <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle,${A.g} 0%,transparent 70%)`, pointerEvents: "none", zIndex: 0 }} />
        <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "3px", color: A.p, marginBottom: 20 }}>REFORGE</div>
          <h1 style={{ fontSize: 34, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", marginBottom: 12, lineHeight: 1.2, letterSpacing: "-1px" }}>{userData.name}'s journey starts here.</h1>
          <p style={{ fontSize: 15, color: "#777", lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>
            Set your starting weight, goal, and when you want to begin.
          </p>
          <div style={{ width: "100%", maxWidth: 320, marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ ...lbl, textAlign: "left" }}>Current kg</div>
              <input style={inp} type="number" step="0.1" placeholder="e.g. 75" value={setupStartWeight} onChange={e => setSetupStartWeight(e.target.value)} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ ...lbl, textAlign: "left" }}>Target kg</div>
              <input style={inp} type="number" step="0.1" placeholder="e.g. 65" value={setupTargetWeight} onChange={e => setSetupTargetWeight(e.target.value)} />
            </div>
          </div>
          <div style={{ width: "100%", maxWidth: 320, marginBottom: 20 }}>
            <div style={{ ...lbl, textAlign: "left" }}>Start Date</div>
            <input style={{ ...inp, colorScheme: "dark" }} type="date" value={startDateInput || today} onChange={e => setStartDateInput(e.target.value)} />
            <p style={{ fontSize: 11, color: "#555", marginTop: 6, textAlign: "left" }}>Set to tomorrow if you want to start fresh</p>
          </div>
          <button style={{ ...btn, maxWidth: 320 }} onClick={() => {
            const sw = parseFloat(setupStartWeight) || null;
            const tw = parseFloat(setupTargetWeight) || null;
            if (!sw || !tw) return;
            setUserData(p => ({ ...p, startWeight: sw, targetWeight: tw, startDate: startDateInput || today }));
            setSetupStartWeight(""); setSetupTargetWeight(""); setStartDateInput("");
          }}>
            Begin the Journey <ArrowRight size={16} style={{ marginLeft: 6, verticalAlign: "middle" }} />
          </button>
        </div>
        <style>{`body{margin:0;background:#0a0c13}*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}@keyframes cp{0%{transform:translate(-50%,-50%) scale(.7);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}`}</style>
      </div>
    );
  }

  // ─── MAIN APP ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#0a0c13", color: "#e2e4ea", fontFamily: "'DM Sans',sans-serif", position: "relative", overflow: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet" />
      <div style={{ position: "fixed", top: "-30%", right: "-20%", width: "60%", height: "60%", borderRadius: "50%", background: `radial-gradient(circle,${A.g} 0%,transparent 70%)`, pointerEvents: "none", transition: "all 1s", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "-20%", left: "-15%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 1, paddingBottom: 100 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", background: A.gr, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>REFORGE</div>
          <User size={20} color={A.p} />
        </div>

        {/* Tab Content */}
        {activeTab === "today" && <Today {...{ userData, setUserData, today, dayName, phases, phIdx, phase, todayPlan, weekNum, ci, latestW, lost, pct, quote, cDay, cPhIdx, cPh, notStartedYet, daysUntilStart, showMatchNightCard, arsenalSoon, arsenalNext, showWeightModal, setShowWeightModal, showCycleModal, setShowCycleModal, weightInput, setWeightInput, cycleDate, setCycleDate, card, cardG, lbl, tag, inp, btn, btnO, A, TC, logW, logPeriod, celebration, setCelebration }} />}
        {activeTab === "plan" && <PlanView {...{ userData, setUserData, phases, phIdx, phase, dayName, weekNum, showPhaseDetail, setShowPhaseDetail, card, cardG, lbl, tag, inp, btn, btnO, A, TC }} />}
        {activeTab === "grow" && <Grow {...{ userData, setUserData, card, cardG, lbl, tag, inp, btn, btnO, A, TC }} />}
        {activeTab === "ask" && Ask({ userData, A, TC })}
        {activeTab === "progress" && <Progress {...{ userData, setUserData, today, latestW, lost, pct, weekNum, card, cardG, lbl, tag, inp, btn, btnO, A, TC }} />}
      </div>

      {/* Navigation */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,12,19,0.94)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "center", gap: 8, padding: "10px 20px", paddingBottom: "max(10px,env(safe-area-inset-bottom))", zIndex: 100 }}>
        {[{ t: "today", i: <Flame size={20} />, l: "TODAY" }, { t: "plan", i: <Calendar size={20} />, l: "PLAN" }, { t: "grow", i: <Sprout size={20} />, l: "GROW" }, { t: "ask", i: <MessageCircle size={20} />, l: "ASK" }, { t: "progress", i: <TrendingDown size={20} />, l: "PROGRESS" }].map(n => (
          <button key={n.t} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "8px 14px", borderRadius: 12, border: "none", background: activeTab === n.t ? `${A.p}15` : "transparent", color: activeTab === n.t ? A.p : "#444", cursor: "pointer", fontSize: 10, fontWeight: 600, fontFamily: "inherit", letterSpacing: "0.3px" }} onClick={() => setActiveTab(n.t)}>{n.i}{n.l}</button>
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

      {/* Phase Detail Modal */}
      {showPhaseDetail !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", zIndex: 150, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowPhaseDetail(null)}>
          <div style={{ background: "#141620", borderRadius: 20, padding: 28, width: "90%", maxWidth: 400, maxHeight: "75vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.07)" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff", margin: 0 }}>Phase {phases[showPhaseDetail].id}: {phases[showPhaseDetail].name}</h3>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#555", padding: 4 }} onClick={() => setShowPhaseDetail(null)}><X size={20} /></button>
            </div>
            <p style={{ fontSize: 13, color: "#777", marginBottom: 16 }}>Weeks {phases[showPhaseDetail].weeks} · {phases[showPhaseDetail].subtitle}</p>
            <div style={lbl}>SCHEDULE</div>
            {phases[showPhaseDetail].weeklyPlan.map((d, i) => (
              <div key={i} style={{ padding: "10px 14px", background: `${TC[d.type] || "#666"}08`, borderRadius: 12, border: `1px solid ${TC[d.type] || "#666"}12`, marginTop: i === 0 ? 0 : 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, fontWeight: 600, color: "#ddd" }}>{d.day}</span><span style={tag(TC[d.type])}>{d.type}</span></div>
                <p style={{ fontSize: 12, color: "#777", margin: "4px 0 0" }}>{d.title} · {d.duration}</p>
              </div>
            ))}
            <div style={{ ...lbl, marginTop: 20 }}>NUTRITION</div>
            {phases[showPhaseDetail].nutrition.map((r, i) => <p key={i} style={{ fontSize: 13, color: "#999", margin: "8px 0 0", lineHeight: 1.6 }}>• {r}</p>)}
          </div>
        </div>
      )}

      {/* Celebration */}
      {celebration && <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(10,12,19,0.96)", border: `2px solid ${A.p}`, borderRadius: 20, padding: "30px 50px", zIndex: 200, textAlign: "center", animation: "cp 0.4s ease", fontSize: 20, fontWeight: 700, color: "#fff", backdropFilter: "blur(20px)" }}>{celebration}</div>}

      <style>{`
        @keyframes cp{0%{transform:translate(-50%,-50%) scale(.7);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
        @keyframes dotPulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}
        *{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
        body{margin:0;background:#0a0c13}
        input:focus{border-color:${A.p}55 !important}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:4px}
      `}</style>
    </div>
  );
}
