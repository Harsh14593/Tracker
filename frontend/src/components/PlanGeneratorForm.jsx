import { useState } from 'react';
import aiService from '../services/aiService';

// --- SVG Icons as React Components ---
const LevelIcon = () => <svg className="icon" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 18V5m0 0H9m3 0h3"/></svg>;
const GoalIcon = () => <svg className="icon" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-3-5v5m-3-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const ClockIcon = () => <svg className="icon" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const CalendarIcon = () => <svg className="icon" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>;
const FocusIcon = () => <svg className="icon" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;

function PlanGeneratorForm({ onPlanGenerated, setIsLoading }) {
  const [formData, setFormData] = useState({
    skillLevel: 'Beginner',
    timeCommitment: 10,
    primaryGoal: 'Internship Prep',
    focusAreas: 'Data Structures & Algorithms, React, Node.js',
    targetDate: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.targetDate) {
      setError('Please select a target date.');
      return;
    }
    setIsLoading(true);
    setError('');
    aiService.generatePlan(formData)
      .then(onPlanGenerated)
      .catch(err => {
        console.error(err);
        setError('Failed to generate plan. Please try again.');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="habit-card">
      <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
        <div className="auth-header" style={{ marginBottom: '32px' }}>
          <h1>Create Your Personalized Study Plan</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Fill out the details below, and our AI will craft a weekly roadmap for you.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          <div className="form-group">
            <label><LevelIcon /> Current Skill Level</label>
            <select name="skillLevel" value={formData.skillLevel} onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
            </select>
          </div>
          <div className="form-group">
            <label><GoalIcon /> Primary Goal</label>
            <select name="primaryGoal" value={formData.primaryGoal} onChange={handleChange}>
              <option>Internship Prep</option>
              <option>Full-Time Job Prep</option>
            </select>
          </div>
          <div className="form-group">
            <label><ClockIcon /> Weekly Time Commitment (Hours)</label>
            <input type="number" name="timeCommitment" value={formData.timeCommitment} onChange={handleChange} min="1" required />
          </div>
          <div className="form-group">
            <label><CalendarIcon /> Target Date</label>
            <input type="date" name="targetDate" value={formData.targetDate} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label><FocusIcon /> Key Focus Areas (comma-separated)</label>
            <input type="text" name="focusAreas" value={formData.focusAreas} onChange={handleChange} placeholder="e.g., System Design, React, AWS" required />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '16px' }} disabled={!formData.targetDate || !formData.focusAreas}>
          Generate My Plan
        </button>
        {error && <p style={{ color: 'var(--danger-color)', marginTop: '16px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default PlanGeneratorForm;