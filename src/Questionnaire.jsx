import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { THEME_COLORS } from './constants.js';

export default function Questionnaire({ onComplete, themeColor = 'orange' }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    gender: null,
    activityLevel: null,
    exerciseTime: null,
    struggleTimes: [],
    foodWeaknesses: [],
    dietPref: null,
    themeColor: themeColor,
    enableCycleTracking: false,
  });

  const accentColor = THEME_COLORS[formData.themeColor]?.p || THEME_COLORS.orange.p;

  const handleNext = () => {
    if (canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== '' && formData.gender !== null;
      case 2:
        return formData.activityLevel !== null && formData.exerciseTime !== null;
      case 3:
        return formData.struggleTimes.length > 0;
      case 4:
        return formData.foodWeaknesses.length > 0 && formData.dietPref !== null;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleComplete = () => {
    onComplete(formData);
  };

  const toggleMultiSelect = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0a0c13',
      padding: '40px 20px',
      fontFamily: '"DM Sans", "Outfit", sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
    },
    content: {
      width: '100%',
      maxWidth: '500px',
    },
    stepIndicator: {
      display: 'flex',
      gap: '8px',
      justifyContent: 'center',
      marginBottom: '40px',
    },
    dot: (isActive) => ({
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: isActive ? accentColor : 'rgba(255,255,255,0.2)',
      transition: 'background-color 0.3s ease',
    }),
    stepContent: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      marginBottom: '32px',
      color: '#fff',
    },
    label: {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '16px',
      color: 'rgba(255,255,255,0.7)',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    input: {
      background: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '12px 16px',
      fontSize: '16px',
      color: '#fff',
      width: '100%',
      boxSizing: 'border-box',
      marginBottom: '24px',
      fontFamily: '"DM Sans", "Outfit", sans-serif',
      outline: 'none',
      transition: 'all 0.2s ease',
    },
    inputFocus: {
      background: 'rgba(255,255,255,0.08)',
      border: `1px solid ${accentColor}4d`,
    },
    cardContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
      gap: '12px',
      marginBottom: '32px',
    },
    card: (isSelected) => ({
      padding: '16px',
      borderRadius: '12px',
      border: isSelected ? `2px solid ${accentColor}` : '1px solid rgba(255,255,255,0.1)',
      backgroundColor: isSelected ? `${accentColor}0d` : 'transparent',
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      color: isSelected ? accentColor : '#fff',
      transition: 'all 0.2s ease',
      fontFamily: '"DM Sans", "Outfit", sans-serif',
    }),
    chipContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      marginBottom: '32px',
    },
    chip: (isSelected) => ({
      padding: '10px 16px',
      borderRadius: '20px',
      border: isSelected ? `2px solid ${accentColor}` : '1px solid rgba(255,255,255,0.2)',
      backgroundColor: isSelected ? `${accentColor}1a` : 'transparent',
      cursor: 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      color: isSelected ? accentColor : 'rgba(255,255,255,0.7)',
      transition: 'all 0.2s ease',
      fontFamily: '"DM Sans", "Outfit", sans-serif',
      whiteSpace: 'nowrap',
    }),
    colorGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gap: '16px',
      marginBottom: '32px',
      marginTop: '16px',
    },
    colorCircle: (color, isSelected) => ({
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: color,
      cursor: 'pointer',
      border: isSelected ? `3px solid ${color}` : 'none',
      boxShadow: isSelected ? `0 0 16px ${color}4d` : 'none',
      transition: 'all 0.2s ease',
      margin: '0 auto',
    }),
    toggleContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px',
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: 'rgba(255,255,255,0.05)',
      border: '1px solid rgba(255,255,255,0.08)',
    },
    toggleSwitch: (isEnabled) => ({
      width: '44px',
      height: '24px',
      borderRadius: '12px',
      backgroundColor: isEnabled ? accentColor : 'rgba(255,255,255,0.2)',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background-color 0.3s ease',
    }),
    toggleThumb: (isEnabled) => ({
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      backgroundColor: '#fff',
      position: 'absolute',
      top: '2px',
      left: isEnabled ? '22px' : '2px',
      transition: 'left 0.3s ease',
    }),
    toggleLabel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    toggleLabelText: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#fff',
    },
    toggleDescription: {
      fontSize: '12px',
      color: 'rgba(255,255,255,0.6)',
    },
    buttonContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: 'auto',
      paddingTop: '32px',
    },
    backButton: {
      flex: 1,
      padding: '14px 20px',
      borderRadius: '12px',
      border: `2px solid ${accentColor}`,
      backgroundColor: 'transparent',
      color: accentColor,
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: '"DM Sans", "Outfit", sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    nextButton: (isDisabled) => ({
      flex: 1,
      padding: '14px 20px',
      borderRadius: '12px',
      border: 'none',
      background: isDisabled
        ? 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))'
        : `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)`,
      color: isDisabled ? 'rgba(255,255,255,0.4)' : '#fff',
      fontSize: '14px',
      fontWeight: '600',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.2s ease',
      fontFamily: '"DM Sans", "Outfit", sans-serif',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.title}>What should we call you?</h2>
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              style={{
                ...styles.input,
                ...(formData.name && styles.inputFocus),
              }}
              onFocus={(e) => {
                e.target.style.background = styles.inputFocus.background;
                e.target.style.border = styles.inputFocus.border;
              }}
              onBlur={(e) => {
                e.target.style.background = styles.input.background;
                e.target.style.border = styles.input.border;
              }}
            />

            <label style={styles.label}>Gender</label>
            <div style={styles.cardContainer}>
              {['Male', 'Female', 'Other'].map((gender) => (
                <div
                  key={gender}
                  style={styles.card(formData.gender === gender)}
                  onClick={() =>
                    setFormData({ ...formData, gender })
                  }
                >
                  {gender}
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.title}>How active are you right now?</h2>
            <div style={styles.cardContainer}>
              {[
                { label: 'Barely move', value: 'barely_move' },
                { label: 'Walk sometimes', value: 'walk_sometimes' },
                {
                  label: 'Exercise occasionally',
                  value: 'exercise_occasionally',
                },
                { label: 'Regular exercise', value: 'regular_exercise' },
              ].map(({ label, value }) => (
                <div
                  key={value}
                  style={styles.card(formData.activityLevel === value)}
                  onClick={() =>
                    setFormData({ ...formData, activityLevel: value })
                  }
                >
                  {label}
                </div>
              ))}
            </div>

            <label style={styles.label}>How much time can you give per day?</label>
            <div style={styles.cardContainer}>
              {[
                { label: '10-15 min', value: '10-15' },
                { label: '20-30 min', value: '20-30' },
                { label: '30+ min', value: '30+' },
              ].map(({ label, value }) => (
                <div
                  key={value}
                  style={styles.card(formData.exerciseTime === value)}
                  onClick={() =>
                    setFormData({ ...formData, exerciseTime: value })
                  }
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.title}>
              When do you struggle most with food?
            </h2>
            <div style={styles.chipContainer}>
              {[
                'After meals',
                'Mid-afternoon (3-5pm)',
                'Late night (after 10pm)',
                'Weekends',
                'Social events',
              ].map((time) => (
                <div
                  key={time}
                  style={styles.chip(
                    formData.struggleTimes.includes(time)
                  )}
                  onClick={() =>
                    toggleMultiSelect('struggleTimes', time)
                  }
                >
                  {time}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.title}>
              What are your food/drink weaknesses?
            </h2>
            <div style={styles.chipContainer}>
              {[
                'Sweets & desserts',
                'Fried food',
                'Fizzy drinks/soda',
                'Late-night ordering',
                'Chai/coffee with sugar',
                'Mindless snacking',
              ].map((weakness) => (
                <div
                  key={weakness}
                  style={styles.chip(
                    formData.foodWeaknesses.includes(weakness)
                  )}
                  onClick={() =>
                    toggleMultiSelect('foodWeaknesses', weakness)
                  }
                >
                  {weakness}
                </div>
              ))}
            </div>

            <label style={styles.label}>Diet preference?</label>
            <div style={styles.cardContainer}>
              {[
                { label: 'Vegetarian', value: 'vegetarian' },
                { label: 'Eggetarian', value: 'eggetarian' },
                { label: 'Non-veg', value: 'non_veg' },
              ].map(({ label, value }) => (
                <div
                  key={value}
                  style={styles.card(formData.dietPref === value)}
                  onClick={() =>
                    setFormData({ ...formData, dietPref: value })
                  }
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div style={styles.stepContent}>
            <h2 style={styles.title}>Pick your vibe</h2>
            <div style={styles.colorGrid}>
              {Object.entries(THEME_COLORS).map(([colorKey, colorObj]) => (
                <div
                  key={colorKey}
                  style={styles.colorCircle(
                    colorObj.p,
                    formData.themeColor === colorKey
                  )}
                  onClick={() =>
                    setFormData({ ...formData, themeColor: colorKey })
                  }
                />
              ))}
            </div>

            {formData.gender === 'Female' && (
              <div style={styles.toggleContainer}>
                <div
                  style={styles.toggleSwitch(
                    formData.enableCycleTracking
                  )}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      enableCycleTracking:
                        !formData.enableCycleTracking,
                    })
                  }
                >
                  <div
                    style={styles.toggleThumb(
                      formData.enableCycleTracking
                    )}
                  />
                </div>
                <div style={styles.toggleLabel}>
                  <div style={styles.toggleLabelText}>
                    Enable cycle tracking?
                  </div>
                  <div style={styles.toggleDescription}>
                    Get phase-aware exercise and nutrition guidance
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.stepIndicator}>
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              style={styles.dot(step === currentStep)}
            />
          ))}
        </div>

        {renderStep()}

        <div style={styles.buttonContainer}>
          {currentStep > 1 && (
            <button
              style={styles.backButton}
              onClick={handleBack}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = `${accentColor}15`;
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Back
            </button>
          )}
          {currentStep < 5 && (
            <button
              style={styles.nextButton(!canProceed())}
              onClick={handleNext}
              disabled={!canProceed()}
              onMouseOver={(e) => {
                if (canProceed()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 8px 16px ${accentColor}4d`;
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Next <ChevronRight size={16} />
            </button>
          )}
          {currentStep === 5 && (
            <button
              style={styles.nextButton(!canProceed())}
              onClick={handleComplete}
              disabled={!canProceed()}
              onMouseOver={(e) => {
                if (canProceed()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = `0 8px 16px ${accentColor}4d`;
                }
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Get My Plan <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
