import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { Flame, Award, Target, Calendar, TrendingDown, RotateCcw } from "lucide-react";
import { generateMilestones, formatDate } from "../helpers";

export default function Progress(props) {
  const { userData, setUserData, latestW, lost, pct, weekNum, A, styles } = props;
  const { card, cardG, lbl } = styles;

  // Chart data
  const chartData = userData.weightLog.map(e => ({
    date: formatDate(e.date),
    weight: e.weight,
    target: userData.targetWeight,
  }));

  // Stats
  const perfectDays = Object.values(userData.checkins || {})
    .filter(c => c && c.exercise && c.nutrition && c.water).length;

  // Milestones
  const milestones = generateMilestones(userData.startWeight, userData.targetWeight);
  const nextMilestone = milestones.find(m => m.kg > latestW) || milestones[milestones.length - 1];
  const progressToNext = nextMilestone
    ? Math.min(100, Math.max(0, ((userData.startWeight - latestW) / (userData.startWeight - nextMilestone.kg)) * 100))
    : 100;

  // Reset function
  const handleReset = () => {
    if (confirm("Reset all tracking data? Name, gender, plan, and theme will be preserved.")) {
      setUserData(prev => ({
        ...prev,
        weightLog: [],
        checkins: {},
        streak: 0,
        bestStreak: 0,
      }));
    }
  };

  return (
    <>
      {/* Overall Progress */}
      <div style={{ marginTop: 20 }}>
        <div style={lbl}>OVERALL PROGRESS</div>
        <div style={cardG}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 12 }}>
            <div>
              <p style={{ fontSize: 12, color: "#777", margin: 0 }}>Progress to goal</p>
              <p style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Outfit',sans-serif", color: "#fff", margin: "4px 0 0" }}>
                {pct}%
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 12, color: "#777", margin: 0 }}>
                {userData.startWeight || "?"} → {userData.targetWeight || "?"} kg
              </p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#10b981", margin: "4px 0 0" }}>
                {lost > 0 ? `${lost} kg lost` : "Starting..."}
              </p>
            </div>
          </div>
          <div style={{ width: "100%", height: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", background: A.gr, borderRadius: 6, transition: "width 0.6s" }} />
          </div>
        </div>
      </div>

      {/* Weight Trend */}
      <div style={{ marginTop: 20 }}>
        <div style={lbl}>WEIGHT TREND</div>
        <div style={{ ...card, padding: chartData.length > 1 ? "20px 10px 10px 0" : 20 }}>
          {chartData.length > 1 ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={A.p} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={A.p} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#444" }} axisLine={false} tickLine={false} />
                <YAxis domain={["dataMin-2", "dataMax+2"]} tick={{ fontSize: 11, fill: "#444" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 13 }} />
                <Area type="monotone" dataKey="weight" stroke={A.p} strokeWidth={2.5} fill="url(#wg)" dot={{ fill: A.p, r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
                {userData.targetWeight && <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={1.5} strokeDasharray="6 4" dot={false} />}
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <TrendingDown size={32} color="#2a2a2a" />
              <p style={{ fontSize: 13, color: "#777", marginTop: 12 }}>
                {chartData.length === 1 ? "Log a few more to see the trend" : "Start logging weight"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
        {[
          { i: <Flame size={18} color={A.p} />, v: userData.streak, l: "Current Streak" },
          { i: <Award size={18} color="#f59e0b" />, v: userData.bestStreak, l: "Best Streak" },
          { i: <Target size={18} color="#10b981" />, v: perfectDays, l: "Perfect Days" },
          { i: <Calendar size={18} color="#8b5cf6" />, v: weekNum, l: "Weeks In" },
        ].map((s, i) => (
          <div key={i} style={card}>
            {s.i}
            <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", marginTop: 8, letterSpacing: "-1px" }}>
              {s.v}
            </p>
            <p style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Weight Log */}
      {userData.weightLog && userData.weightLog.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={lbl}>WEIGHT LOG</div>
          <div style={card}>
            {[...userData.weightLog].reverse().slice(0, 10).map((e, i, a) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: i < a.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "#777" }}>{formatDate(e.date)}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: "#ddd" }}>{e.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Milestones */}
      {nextMilestone && (
        <div style={{ marginTop: 20 }}>
          <div style={lbl}>NEXT MILESTONE</div>
          <div style={card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div>
                <p style={{ fontSize: 28, fontWeight: 700, color: "#fff", margin: 0 }}>
                  {nextMilestone.emoji} {nextMilestone.kg} kg
                </p>
                <p style={{ fontSize: 13, color: "#777", margin: "4px 0 0" }}>{nextMilestone.label}</p>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: A.p, margin: 0 }}>
                {Math.round(progressToNext)}%
              </p>
            </div>
            <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
              <div
                style={{
                  width: `${progressToNext}%`,
                  height: "100%",
                  background: A.p,
                  borderRadius: 4,
                  transition: "width 0.6s",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button
          style={{
            background: "rgba(255,255,255,0.04)",
            color: "#444",
            border: "none",
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 12,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
          onClick={handleReset}
        >
          <RotateCcw size={12} style={{ marginRight: 4, verticalAlign: "middle" }} />
          Reset Progress
        </button>
      </div>
    </>
  );
}
