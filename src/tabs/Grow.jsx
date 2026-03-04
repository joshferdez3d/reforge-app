import React, { useState } from 'react';
import { VISIBILITY_LADDER } from '../constants';
import { getToday, getWeekId } from '../helpers';
import { Eye, PenLine, CheckSquare, Monitor, ChevronDown, ChevronUp, Plus, X } from 'lucide-react';

export default function Grow(props) {
  const { userData, setUserData, A, styles } = props;
  const grow = userData.grow || {};

  const [expandedAvoid, setExpandedAvoid] = useState(false);
  const [avoidForm, setAvoidForm] = useState({
    avoidedWhat: '', thought: '', bodyFeel: '', didInstead: '', cost: ''
  });
  const [visibilityForm, setVisibilityForm] = useState('');
  const [screenTimeMinutes, setScreenTimeMinutes] = useState(null);
  const [screenTimeSwaps, setScreenTimeSwaps] = useState([]);

  const avoidanceLog = grow.avoidanceLog || [];
  const microCompletions = grow.microCompletions || {};
  const visibilityLevel = grow.visibilityLevel || 0;
  const visibilityLog = grow.visibilityLog || [];
  const screenTimeLog = grow.screenTimeLog || {};

  const today = getToday();
  const weekId = getWeekId();

  // Avoidance Loops
  const logAvoidance = () => {
    const newEntry = {
      date: today,
      avoidedWhat: avoidForm.avoidedWhat,
      thought: avoidForm.thought,
      bodyFeel: avoidForm.bodyFeel,
      didInstead: avoidForm.didInstead,
      cost: avoidForm.cost
    };
    setUserData({
      ...userData,
      grow: { ...grow, avoidanceLog: [...avoidanceLog, newEntry] }
    });
    setAvoidForm({ avoidedWhat: '', thought: '', bodyFeel: '', didInstead: '', cost: '' });
    setExpandedAvoid(false);
  };

  const recentAvoidance = avoidanceLog.slice(-3).reverse();

  // Micro Completions
  const weekCompletions = microCompletions[weekId] || { items: [false, false, false, false] };
  const toggleMicro = (idx) => {
    const updated = [...weekCompletions.items];
    updated[idx] = !updated[idx];
    setUserData({
      ...userData,
      grow: {
        ...grow,
        microCompletions: { ...microCompletions, [weekId]: { items: updated } }
      }
    });
  };
  const microCount = weekCompletions.items.filter(Boolean).length;

  // Visibility Ladder
  const currentLevelData = VISIBILITY_LADDER[visibilityLevel] || VISIBILITY_LADDER[0];
  const logVisibility = () => {
    setUserData({
      ...userData,
      grow: {
        ...grow,
        visibilityLog: [...visibilityLog, { date: today, level: visibilityLevel, what: visibilityForm }]
      }
    });
    setVisibilityForm('');
  };
  const visibilityAttempts = visibilityLog.filter(v => v.level === visibilityLevel).length;

  // Screen Time
  const todayScreenTime = screenTimeLog[today] || { minutes: 0, swaps: [] };
  const logScreenTime = (mins) => {
    setScreenTimeMinutes(mins);
    setScreenTimeSwaps([]);
  };
  const saveScreenTime = () => {
    setUserData({
      ...userData,
      grow: {
        ...grow,
        screenTimeLog: {
          ...screenTimeLog,
          [today]: { minutes: screenTimeMinutes, swaps: screenTimeSwaps }
        }
      }
    });
    setScreenTimeMinutes(null);
    setScreenTimeSwaps([]);
  };
  const toggleSwap = (swap) => {
    setScreenTimeSwaps(screenTimeSwaps.includes(swap)
      ? screenTimeSwaps.filter(s => s !== swap)
      : [...screenTimeSwaps, swap]
    );
  };

  const quickChip = (label, selected, onClick) => (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        borderRadius: '16px',
        border: `1.5px solid ${selected ? A.p : 'rgba(255,255,255,0.2)'}`,
        background: selected ? `rgba(${A.p.slice(1).match(/.{1,2}/g).join(',')}, 0.15)` : 'transparent',
        color: selected ? A.p : 'rgba(255,255,255,0.7)',
        fontSize: '12px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Avoidance Loop Journal */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={styles.lbl}>Avoidance Loops · {avoidanceLog.length} tracked</h3>
          <button
            onClick={() => setExpandedAvoid(!expandedAvoid)}
            style={{ background: 'none', border: 'none', color: A.p, cursor: 'pointer' }}
          >
            {expandedAvoid ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        {!expandedAvoid && (
          <button
            onClick={() => setExpandedAvoid(true)}
            style={{
              ...styles.btn,
              background: `rgba(${A.p.slice(1).match(/.{1,2}/g).join(',')}, 0.1)`,
              color: A.p,
              width: '100%'
            }}
          >
            Noticed yourself avoiding something?
          </button>
        )}

        {expandedAvoid && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              placeholder="What were you about to do?"
              value={avoidForm.avoidedWhat}
              onChange={(e) => setAvoidForm({ ...avoidForm, avoidedWhat: e.target.value })}
              style={styles.inp}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['People will judge', "It won't be good enough", "What's the point", "I'll do it later"].map(t => (
                <div key={t}>{quickChip(t, avoidForm.thought === t, () => setAvoidForm({ ...avoidForm, thought: t }))}</div>
              ))}
            </div>
            <input
              placeholder="Custom thought..."
              value={avoidForm.thought === 'People will judge' || avoidForm.thought === "It won't be good enough" || avoidForm.thought === "What's the point" || avoidForm.thought === "I'll do it later" ? '' : avoidForm.thought}
              onChange={(e) => setAvoidForm({ ...avoidForm, thought: e.target.value })}
              style={{ ...styles.inp, fontSize: '11px' }}
            />
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['Racing heart', 'Tight chest', 'Dread', 'Numbness', 'Restless'].map(f => (
                <div key={f}>{quickChip(f, avoidForm.bodyFeel === f, () => setAvoidForm({ ...avoidForm, bodyFeel: f }))}</div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['Scrolled phone', 'Ate something', 'Opened YouTube', 'Switched tasks'].map(d => (
                <div key={d}>{quickChip(d, avoidForm.didInstead === d, () => setAvoidForm({ ...avoidForm, didInstead: d }))}</div>
              ))}
            </div>
            <input
              placeholder="Custom behavior..."
              value={avoidForm.didInstead === 'Scrolled phone' || avoidForm.didInstead === 'Ate something' || avoidForm.didInstead === 'Opened YouTube' || avoidForm.didInstead === 'Switched tasks' ? '' : avoidForm.didInstead}
              onChange={(e) => setAvoidForm({ ...avoidForm, didInstead: e.target.value })}
              style={{ ...styles.inp, fontSize: '11px' }}
            />
            <textarea
              placeholder="What did it cost you?"
              value={avoidForm.cost}
              onChange={(e) => setAvoidForm({ ...avoidForm, cost: e.target.value })}
              style={{ ...styles.inp, minHeight: '60px', resize: 'none' }}
            />
            <button onClick={logAvoidance} style={styles.btn}>Log it</button>
          </div>
        )}

        <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {recentAvoidance.map((entry, i) => (
            <div key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', borderLeft: `2px solid ${A.p}`, paddingLeft: '8px' }}>
              <div style={{ fontWeight: '500', color: 'rgba(255,255,255,0.8)' }}>{entry.date}</div>
              <div>Avoided: {entry.avoidedWhat} → {entry.didInstead}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Micro Completions */}
      <div style={styles.card}>
        <h3 style={styles.lbl}>Weekly Wins · {microCount}/4 this week</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {['Created something (session 1)', 'Created something (session 2)', 'Finished one small thing', 'Shared something (any size)'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => toggleMicro(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                background: weekCompletions.items[idx] ? `rgba(${A.p.slice(1).match(/.{1,2}/g).join(',')}, 0.15)` : 'transparent',
                border: `1px solid ${weekCompletions.items[idx] ? A.p : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '8px',
                color: 'rgba(255,255,255,0.9)',
                cursor: 'pointer',
                textAlign: 'left',
                fontSize: '13px'
              }}
            >
              <CheckSquare size={16} color={weekCompletions.items[idx] ? A.p : 'rgba(255,255,255,0.4)'} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Visibility Ladder */}
      <div style={styles.card}>
        <h3 style={styles.lbl}>Visibility · Level {visibilityLevel + 1}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
          {VISIBILITY_LADDER.map((level, idx) => (
            <div
              key={idx}
              style={{
                padding: '10px',
                borderRadius: '8px',
                border: `1.5px solid ${idx === visibilityLevel ? A.p : 'rgba(255,255,255,0.1)'}`,
                background: idx < visibilityLevel ? 'rgba(0,255,0,0.05)' : idx === visibilityLevel ? `rgba(${A.p.slice(1).match(/.{1,2}/g).join(',')}, 0.1)` : 'transparent',
                opacity: idx < visibilityLevel ? 0.6 : 1,
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}
            >
              <span style={{ fontSize: '16px' }}>{level.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.9)' }}>{level.label}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{level.description}</div>
              </div>
              {idx < visibilityLevel && <span style={{ color: 'rgba(0,255,0,0.7)' }}>✓</span>}
            </div>
          ))}
        </div>
        <button
          onClick={() => setVisibilityForm(visibilityForm ? '' : '1')}
          style={{ ...styles.btn, width: '100%', marginBottom: '8px' }}
        >
          Log an attempt
        </button>
        {visibilityForm && (
          <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
            <textarea
              placeholder="What did you do?"
              value={visibilityForm === '1' ? '' : visibilityForm}
              onChange={(e) => setVisibilityForm(e.target.value)}
              style={{ ...styles.inp, flex: 1, minHeight: '50px', resize: 'none' }}
            />
            <button
              onClick={logVisibility}
              style={{ ...styles.btn, padding: '6px 10px', height: 'fit-content' }}
            >
              <Plus size={14} />
            </button>
          </div>
        )}
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          {visibilityAttempts} attempts at this level
        </div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic' }}>
          Stay at each level until it feels boring, not just bearable.
        </div>
      </div>

      {/* Screen Time Swap */}
      <div style={styles.card}>
        <h3 style={styles.lbl}>Screen Time · Today: {todayScreenTime.minutes}min / {grow.screenTimeDailyGoal || 120}min</h3>
        {screenTimeMinutes === null ? (
          <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
            {[15, 30, 60, 120].map(min => (
              <button
                key={min}
                onClick={() => logScreenTime(min)}
                style={{
                  flex: 1,
                  padding: '8px',
                  borderRadius: '8px',
                  border: `1px solid ${A.p}`,
                  background: `rgba(${A.p.slice(1).match(/.{1,2}/g).join(',')}, 0.1)`,
                  color: A.p,
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                {min}m
              </button>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>What did you swap it for?</p>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['Read', 'Walked', 'Created', 'Cooked', 'Called someone', 'Stretched', 'Worked on project'].map(swap => (
                <div key={swap}>{quickChip(swap, screenTimeSwaps.includes(swap), () => toggleSwap(swap))}</div>
              ))}
            </div>
            <button onClick={saveScreenTime} style={styles.btn}>Save</button>
          </div>
        )}
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
          Logged: {todayScreenTime.minutes}min {todayScreenTime.swaps.length > 0 && `· ${todayScreenTime.swaps.join(', ')}`}
        </div>
      </div>
    </div>
  );
}
